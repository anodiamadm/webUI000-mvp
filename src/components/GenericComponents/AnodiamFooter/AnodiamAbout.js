import PageHeading from "../PageHeading";

const AnodiamAbout = () => {
  return (
    <div className="anodiam-container">
      <div className="anodiam-body-panel">
        <PageHeading heading='About US' />
        <div className="anodiam-body-panel-mid">
          <form className="anodiam-form">
            <div className="container anodiam-container">
              <p>Video Speach about the following to go here:</p>
              •	Who we are, mission, vision, catch line and meaning of Anodiam<br/>
              •	Pre-recorded content vs live classes<br/>
              •	Our low pricing and discounts: Scholarships and Buddy schemes instead of marketing fat cats<br/>
              •	Differentiation against competition in terms of content and approach<br/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default AnodiamAbout;