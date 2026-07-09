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
    tint: 'rgba(28,59,56,0.6)',
    accent: '#6b9b94',
  },
  {
    code: 'Private Equity / Hedge Funds',
    title: 'Private Equity / Hedge Funds',
    description: 'Stock pitches, LBO modeling, comps analysis, and buy-side thinking.',
    path: '/pe-hf',
    image: tradingScreen,
    tint: 'rgba(36,26,61,0.6)',
    accent: '#9ed8f0',
  },
  {
    code: 'Wealth & Asset Management',
    title: 'Wealth & Asset Management',
    description: 'Portfolio construction, client communication, and investment philosophy.',
    path: '/wam',
    image: tickerBoard,
    tint: 'rgba(58,42,18,0.6)',
    accent: '#d6ab7b',
  },
  {
    code: 'Consulting',
    title: 'Consulting',
    description: 'Case interviews, frameworks, market sizing, and slide storytelling.',
    path: '/consulting',
    image: arrowChart,
    tint: 'rgba(22,50,31,0.6)',
    accent: '#8fc4bf',
  },
  {
    code: 'General Business / Corporate Finance',
    title: 'General Business / Corporate Finance',
    description: 'Financial statements, key metrics, Excel modeling, and capital structure.',
    path: '/corp-finance',
    image: barChart,
    tint: 'rgba(42,42,61,0.6)',
    accent: '#a8b8c8',
  },
  {
    code: 'Universal — every interview',
    title: 'Universal — every interview',
    description: 'Behavioral stories, "why this firm," current events, and networking.',
    path: '/universal',
    image: conversation,
    tint: 'rgba(61,42,28,0.6)',
    accent: '#e0a868',
  },
];

export function getCategoryByPath(path) {
  return CATEGORIES.find((c) => c.path === path);
}
