const FMP_BASE = 'https://financialmodelingprep.com/stable';

export async function fmpGet(endpoint, params, apiKey) {
  const url = new URL(`${FMP_BASE}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set('apikey', apiKey);

  const resp = await fetch(url.toString());
  if (!resp.ok) throw new Error(`FMP request failed (${resp.status})`);
  const data = await resp.json();
  if (data && !Array.isArray(data) && data['Error Message']) {
    throw new Error(data['Error Message']);
  }
  return data;
}

export async function fetchCompanyData(ticker, apiKey) {
  const profileList = await fmpGet('profile', { symbol: ticker }, apiKey);
  if (!profileList || !profileList.length) throw new Error(`No company found for ticker '${ticker}'.`);
  const profile = profileList[0];

  const income = await fmpGet('income-statement', { symbol: ticker, period: 'annual', limit: 2 }, apiKey);
  if (!income || !income.length) throw new Error(`No income statement data for '${ticker}'.`);
  const latestIncome = income[0];
  const priorIncome = income.length > 1 ? income[1] : null;

  const balance = await fmpGet('balance-sheet-statement', { symbol: ticker, period: 'annual', limit: 1 }, apiKey);
  if (!balance || !balance.length) throw new Error(`No balance sheet data for '${ticker}'.`);
  const latestBalance = balance[0];

  let growthEstimate = null;
  try {
    const estimates = await fmpGet('analyst-estimates', { symbol: ticker, period: 'annual', limit: 5 }, apiKey);
    if (estimates && estimates.length >= 2) {
      const estimatesSorted = [...estimates].sort((a, b) => (a.date > b.date ? 1 : -1));
      const revStart = latestIncome.revenue;
      const revEnd = estimatesSorted[estimatesSorted.length - 1].revenueAvg;
      const years = estimatesSorted.length;
      if (revStart > 0 && years > 0) {
        growthEstimate = (Math.pow(revEnd / revStart, 1 / years) - 1) * 100;
      }
    }
  } catch {
    growthEstimate = null;
  }

  const revenue = latestIncome.revenue;
  const ebitda = latestIncome.ebitda || 0;
  const ebitdaMargin = revenue ? (ebitda / revenue) * 100 : 0;

  if (growthEstimate === null && priorIncome && priorIncome.revenue) {
    growthEstimate = (revenue / priorIncome.revenue - 1) * 100;
  }

  let priceHistory = [];
  try {
    const hist = await fmpGet('historical-price-eod/light', { symbol: ticker, limit: 130 }, apiKey);
    if (hist) priceHistory = [...hist].sort((a, b) => (a.date > b.date ? 1 : -1));
  } catch {
    priceHistory = [];
  }

  return {
    companyName: profile.companyName || ticker,
    ticker: ticker.toUpperCase(),
    sector: profile.sector || '',
    industry: profile.industry || '',
    price: profile.price || 0,
    revenue: revenue / 1e6,
    ebitdaMargin: Math.round(ebitdaMargin * 10) / 10,
    netIncome: (latestIncome.netIncome || 0) / 1e6,
    shares: (latestIncome.weightedAverageShsOutDil || 0) / 1e6,
    debt: (latestBalance.totalDebt || 0) / 1e6,
    cash: (latestBalance.cashAndCashEquivalents || 0) / 1e6,
    growthEstimate: growthEstimate ? Math.round(growthEstimate * 10) / 10 : 5.0,
    priceHistory,
  };
}

// A lighter version of fetchCompanyData — just enough real data to ground
// the stock-pitch practice tool's interviewer questions and feedback.
export async function fetchCompanySnapshot(ticker, apiKey) {
  const profileList = await fmpGet('profile', { symbol: ticker }, apiKey);
  if (!profileList || !profileList.length) throw new Error(`No company found for ticker '${ticker}'.`);
  const profile = profileList[0];

  const income = await fmpGet('income-statement', { symbol: ticker, period: 'annual', limit: 1 }, apiKey);
  const latestIncome = income && income.length ? income[0] : {};

  return {
    ticker: ticker.toUpperCase(),
    companyName: profile.companyName || ticker,
    price: profile.price || 0,
    sector: profile.sector || '',
    industry: profile.industry || '',
    revenue: (latestIncome.revenue || 0) / 1e6,
    ebitda: (latestIncome.ebitda || 0) / 1e6,
    netIncome: (latestIncome.netIncome || 0) / 1e6,
  };
}
