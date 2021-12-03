import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { stopChange } from '../../../utils/StopCutCopyPaste';

const PostalAddress = ({address, setAddress, setLatitude, setLongitude}) => {
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    setAddress(value);
    setLatitude(ll.lat);
    setLongitude(ll.lng);
  }

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div key={suggestions.description}>
            <input type="text" className="form-control"
              value={address} onChange={(e) => setAddress(e.target.value)}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'form-control',
              })}
              onCut={stopChange} onCopy={stopChange} onPaste={stopChange} />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#aaddff', cursor: 'pointer' }
                  : { backgroundColor: '#ddeeff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
 
export default PostalAddress;