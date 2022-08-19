import './AnodiamHeader.css';
import AnodiamNavbar from "./AnodiamNavbar/AnodiamNavbar";

const AnodiamHeader = () => {
  return (
    <div>
      <div className="App anodiam-gradiant-background">
        <div className="anodiam-container">
          <div className="punch-line">Foundation for Genuine Education</div>
          <AnodiamNavbar />
        </div>
      </div>
    </div>
  );
}
 
export default AnodiamHeader;