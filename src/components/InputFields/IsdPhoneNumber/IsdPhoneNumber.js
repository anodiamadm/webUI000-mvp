import PhoneInputWithCountrySelect from 'react-phone-number-input';
import { stopChange } from '../../../utils/StopCutCopyPaste';
import './IsdPhoneNumber.css';

const IsdPhoneNumber = ({phoneNumber, setPhoneNumber}) => {
  return (
    <div>
    <PhoneInputWithCountrySelect defaultCountry='IN' value={phoneNumber} onChange={setPhoneNumber} 
    onCut={stopChange} onCopy={stopChange} onPaste={stopChange} />
    </div>
  );
}
 
export default IsdPhoneNumber;