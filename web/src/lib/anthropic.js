export async function callClaude(prompt, anthropicKey, maxTokens = 500) {
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Couldn't reach the AI (${resp.status}): ${errBody}`);
  }
  const data = await resp.json();
  return data.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n\n');
}

export async function getAiWriteup(inputs, dcfResult, compsResult, wacc, anthropicKey) {
  const prompt = `You are a buyside equity analyst writing a concise valuation summary for a finance student's learning tool. The reader is a beginner — write clearly, explain reasoning in plain English, no excessive hedging or disclaimers.

Company: ${inputs.companyName} (${inputs.ticker})
Industry: ${inputs.industry}
Revenue: $${inputs.revenue.toFixed(0)}M
EBITDA margin: ${inputs.ebitdaMargin.toFixed(1)}%
Net income: $${inputs.netIncome.toFixed(0)}M
Diluted shares: ${inputs.shares.toFixed(0)}M
Total debt: $${inputs.debt.toFixed(0)}M
Cash: $${inputs.cash.toFixed(0)}M
Current share price: $${inputs.price.toFixed(2)}
Assumed 5yr revenue growth: ${inputs.growth.toFixed(1)}%
WACC used: ${wacc}%

DCF implied share price: $${dcfResult.impliedPrice.toFixed(2)}
DCF implied enterprise value: $${dcfResult.enterpriseValue.toFixed(0)}M
Comps implied share price: $${compsResult.impliedPrice.toFixed(2)} (using ${compsResult.evEbitdaMult}x EV/EBITDA and ${compsResult.peMult}x P/E typical for ${compsResult.label})

Write a 4-paragraph analyst writeup: (1) one-line valuation verdict and rough magnitude vs current price, (2) what's driving the DCF and the key sensitivity (briefly explain WACC and terminal growth), (3) how comps compares and why DCF vs comps might differ, (4) 2-3 risks or assumptions worth questioning. Plain text only, no markdown, flowing paragraphs separated by blank lines.`;

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Anthropic request failed (${resp.status}): ${errBody}`);
  }
  const data = await resp.json();
  return data.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n\n');
}
