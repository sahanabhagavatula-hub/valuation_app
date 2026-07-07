import arrowChart from '../assets/arrow_chart.png';

export default function PageBg() {
  return <div className="valufin-page-bg" style={{ '--arrow-bg-image': `url(${arrowChart})` }} />;
}
