import heroSkyscrapers from '../assets/hero_skyscrapers.png';
import tradingScreen from '../assets/trading_screen.png';
import tickerBoard from '../assets/ticker_board.png';
import arrowChart from '../assets/arrow_chart.png';
import barChart from '../assets/bar_chart.svg';
import conversation from '../assets/conversation.svg';

export const CATEGORIES = [
  {
    code: 'Investment Banking',
    title: 'Investment Banking',
    description: 'M&A process, pitch books, live deal modeling, DCF, and comps.',
    path: '/ib',
    image: heroSkyscrapers,
    tint: 'rgba(22,48,42,0.6)',
    accent: '#7FA896',
    bgMotif: 'candlesticks',
  },
  {
    code: 'Private Equity / Hedge Funds',
    title: 'Private Equity / Hedge Funds',
    description: 'Stock pitches, LBO modeling, comps analysis, and buy-side thinking.',
    path: '/pe-hf',
    image: tradingScreen,
    tint: 'rgba(18,32,50,0.6)',
    accent: '#7ec8e3',
    bgMotif: 'depth-chart',
  },
  {
    code: 'Wealth & Asset Management',
    title: 'Wealth & Asset Management',
    description: 'Portfolio construction, client communication, and investment philosophy.',
    path: '/wam',
    image: tickerBoard,
    tint: 'rgba(30,38,44,0.6)',
    accent: '#9fb4bd',
    bgMotif: 'constellation',
  },
  {
    code: 'Consulting',
    title: 'Consulting',
    description: 'Case interviews, frameworks, market sizing, and slide storytelling.',
    path: '/consulting',
    image: arrowChart,
    tint: 'rgba(18,42,38,0.6)',
    accent: '#8fc4bf',
    bgMotif: 'hypothesis-tree',
  },
  {
    code: 'General Business / Corporate Finance',
    title: 'General Business / Corporate Finance',
    description: 'Financial statements, key metrics, Excel modeling, and capital structure.',
    path: '/corp-finance',
    image: barChart,
    tint: 'rgba(34,37,39,0.6)',
    accent: '#a8b0b4',
    bgMotif: 'balance-grid',
  },
  {
    code: 'Universal — every interview',
    title: 'Universal — every interview',
    description: 'Behavioral stories, "why this firm," current events, and networking.',
    path: '/universal',
    image: conversation,
    tint: 'rgba(16,38,44,0.6)',
    accent: '#6bc2b0',
    bgMotif: 'signal-grid',
  },
];

export function getCategoryByPath(path) {
  return CATEGORIES.find((c) => c.path === path);
}
