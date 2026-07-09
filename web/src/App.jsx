import { HashRouter, Routes, Route } from 'react-router-dom';
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
import './theme.css';

export default function App() {
  return (
    <HashRouter>
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
      </Routes>
    </HashRouter>
  );
}
