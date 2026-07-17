import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Basics from './pages/Basics';
import Tool from './pages/Tool';
import InvestmentBanking from './pages/InvestmentBanking';
import PeHf from './pages/PeHf';
import WealthAssetManagement from './pages/WealthAssetManagement';
import Consulting from './pages/Consulting';
import CorporateFinance from './pages/CorporateFinance';
import Universal from './pages/Universal';
import MentalMath from './pages/MentalMath';
import MarketSizing from './pages/MarketSizing';
import Frameworks from './pages/Frameworks';
import FrameworkDetail from './pages/FrameworkDetail';
import MAProcess from './pages/MAProcess';
import StockPitch from './pages/StockPitch';
import CompsAnalysis from './pages/CompsAnalysis';
import PitchBooks from './pages/PitchBooks';
import TickerTape from './components/TickerTape';
import './theme.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function GlobalTicker() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return <TickerTape className="valufin-global-ticker" />;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <GlobalTicker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basics" element={<Basics />} />
        <Route path="/tool" element={<Tool />} />
        <Route path="/ib" element={<InvestmentBanking />} />
        <Route path="/pe-hf" element={<PeHf />} />
        <Route path="/wam" element={<WealthAssetManagement />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/corp-finance" element={<CorporateFinance />} />
        <Route path="/universal" element={<Universal />} />
        <Route path="/mental-math" element={<MentalMath />} />
        <Route path="/market-sizing" element={<MarketSizing />} />
        <Route path="/frameworks" element={<Frameworks />} />
        <Route path="/frameworks/:slug" element={<FrameworkDetail />} />
        <Route path="/ma-process" element={<MAProcess />} />
        <Route path="/stock-pitch" element={<StockPitch />} />
        <Route path="/comps" element={<CompsAnalysis />} />
        <Route path="/pitch-books" element={<PitchBooks />} />
      </Routes>
    </HashRouter>
  );
}
