import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
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
import ThreeStatementModel from './pages/ThreeStatementModel';
import GeneralistOlympics from './pages/GeneralistOlympics';
import PrecedentTransactions from './pages/PrecedentTransactions';
import LboModeling from './pages/LboModeling';
import PortfolioConstruction from './pages/PortfolioConstruction';
import ClientCommunication from './pages/ClientCommunication';
import InvestmentPhilosophy from './pages/InvestmentPhilosophy';
import RiskManagement from './pages/RiskManagement';
import FinancialPlanning from './pages/FinancialPlanning';
import AlternativeInvestments from './pages/AlternativeInvestments';
import CaseInterviews from './pages/CaseInterviews';
import SlideStorytelling from './pages/SlideStorytelling';
import IndustryKnowledge from './pages/IndustryKnowledge';
import KeyMetrics from './pages/KeyMetrics';
import ExcelModeling from './pages/ExcelModeling';
import AccountingBasics from './pages/AccountingBasics';
import CapitalStructure from './pages/CapitalStructure';
import Behaviorals from './pages/Behaviorals';
import WhyThisFirm from './pages/WhyThisFirm';
import CurrentEvents from './pages/CurrentEvents';
import Networking from './pages/Networking';
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
      <SiteHeader />
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
        <Route path="/three-statement-model" element={<ThreeStatementModel />} />
        <Route path="/generalist-olympics" element={<GeneralistOlympics />} />
        <Route path="/precedent-transactions" element={<PrecedentTransactions />} />
        <Route path="/lbo-modeling" element={<LboModeling />} />
        <Route path="/portfolio-construction" element={<PortfolioConstruction />} />
        <Route path="/client-communication" element={<ClientCommunication />} />
        <Route path="/investment-philosophy" element={<InvestmentPhilosophy />} />
        <Route path="/risk-management" element={<RiskManagement />} />
        <Route path="/financial-planning" element={<FinancialPlanning />} />
        <Route path="/alternative-investments" element={<AlternativeInvestments />} />
        <Route path="/case-interviews" element={<CaseInterviews />} />
        <Route path="/slide-storytelling" element={<SlideStorytelling />} />
        <Route path="/industry-knowledge" element={<IndustryKnowledge />} />
        <Route path="/key-metrics" element={<KeyMetrics />} />
        <Route path="/excel-modeling" element={<ExcelModeling />} />
        <Route path="/accounting-basics" element={<AccountingBasics />} />
        <Route path="/capital-structure" element={<CapitalStructure />} />
        <Route path="/behaviorals" element={<Behaviorals />} />
        <Route path="/why-this-firm" element={<WhyThisFirm />} />
        <Route path="/current-events" element={<CurrentEvents />} />
        <Route path="/networking" element={<Networking />} />
      </Routes>
    </HashRouter>
  );
}
