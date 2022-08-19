import PageHeading from "../PageHeading";
import '../../../../node_modules/font-awesome/css/font-awesome.min.css'

const AnodiamContact = () => {
  return ( 
    <div className="anodiam-container">
      <div className="anodiam-body-panel">
        <PageHeading heading='Contact US' />
        <div className="anodiam-body-panel-mid">
          <form className="anodiam-form">
            <div className="container anodiam-container">
              <p><i className="fas fa-phone icon-decor" aria-hidden="true"></i></p><p> +61 470 142 229</p><br/>
              <p><i className="fas fa-map-marker-alt icon-decor" aria-hidden="true"></i></p><p> 8/71 Wolseley Street, Bexley, NSW, Australia 2207</p><br/>
              <p><i className="far fa-envelope-open icon-decor" aria-hidden="true"></i></p><p> admin@anodiam.com</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default AnodiamContact;