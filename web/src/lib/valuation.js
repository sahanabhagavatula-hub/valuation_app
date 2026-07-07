export function runDcf(rev0, growth, ebitdaMargin, debt, cash, shares, wacc, termGrowth) {
  const fcfMargin = Math.max(ebitdaMargin / 100 - 0.06, 0.02);
  let rev = rev0;
  let pvSum = 0.0;
  for (let yr = 1; yr <= 5; yr++) {
    rev *= 1 + growth / 100;
    const fcf = rev * fcfMargin;
    pvSum += fcf / Math.pow(1 + wacc / 100, yr);
  }
  const finalFcf = rev * fcfMargin;
  const tv = (finalFcf * (1 + termGrowth / 100)) / (wacc / 100 - termGrowth / 100);
  const pvTv = tv / Math.pow(1 + wacc / 100, 5);
  const enterpriseValue = pvSum + pvTv;
  const equityValue = enterpriseValue - debt + cash;
  const impliedPrice = shares ? equityValue / shares : 0;
  return { enterpriseValue, equityValue, impliedPrice };
}

export const SECTOR_MULTIPLES = {
  semiconductor: [9, 16, 'semiconductors'],
  software: [18, 28, 'software'],
  internet: [16, 24, 'internet / digital advertising'],
  technology: [14, 24, 'technology'],
  retail: [8, 15, 'retail'],
  bank: [7, 10, 'financials'],
  financial: [7, 10, 'financials'],
  energy: [6, 11, 'energy'],
  health: [12, 20, 'healthcare'],
  industrial: [9, 17, 'industrials'],
  consumer: [10, 18, 'consumer'],
  auto: [7, 12, 'automotive'],
  communication: [14, 22, 'communication services'],
};

// Rough typical EBITDA margin per sector, used only to color the comparison bar
export const SECTOR_TYPICAL_MARGIN = {
  semiconductor: 35, software: 32, internet: 35, technology: 28,
  retail: 12, bank: 40, financial: 35, energy: 25, health: 22,
  industrial: 18, consumer: 16, auto: 12, communication: 30,
};

export function pickCompMultiples(industry, sector) {
  const text = `${industry} ${sector}`.toLowerCase();
  for (const [key, [evEbitda, pe, label]] of Object.entries(SECTOR_MULTIPLES)) {
    if (text.includes(key)) return { evEbitdaMult: evEbitda, peMult: pe, label };
  }
  return { evEbitdaMult: 10, peMult: 18, label: 'general market' };
}

export function pickTypicalMargin(industry, sector) {
  const text = `${industry} ${sector}`.toLowerCase();
  for (const [key, margin] of Object.entries(SECTOR_TYPICAL_MARGIN)) {
    if (text.includes(key)) return margin;
  }
  return 20;
}

export function runComps(revenue, ebitdaMargin, netIncome, debt, cash, shares, industry, sector) {
  const { evEbitdaMult, peMult, label } = pickCompMultiples(industry, sector);
  const ebitda = revenue * (ebitdaMargin / 100);
  const evFromEbitda = ebitda * evEbitdaMult;
  const equityFromEv = evFromEbitda - debt + cash;
  const priceFromEvEbitda = shares ? equityFromEv / shares : 0;
  const priceFromPe = shares ? (netIncome * peMult) / shares : 0;
  const impliedPrice = (priceFromEvEbitda + priceFromPe) / 2;
  return { impliedPrice, evEbitdaMult, peMult, label, priceFromEvEbitda, priceFromPe };
}
