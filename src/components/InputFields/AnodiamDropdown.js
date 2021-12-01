import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AnodiamDropdown = ({item, setItem, listUrl, setError}) => {
  const { auth } = useContext(AuthContext);
  const [items, setItems] = useState(null);
  // [ { id: 1, board_short_name: 'ICSE', board_name: 'Indian Certificate of Secondary Education'},
  //   { id: 2, board_short_name: 'ISC', board_name: 'Indian School Certificate'},
  //   { id: 3, board_short_name: 'CBSE', board_name: 'Central Board of Secondary Education'},
  //   { id: 4, board_short_name: 'Other', board_name: 'Other'}]
  useEffect(() => {
    console.log("Bearer " + auth);
    fetch(listUrl, {
      headers: { 'Authorization': "Bearer " + auth }
    }).then(res => {
      if(!res.ok) {
        throw Error('Error in fetching from ' + listUrl);
      }
      return res.json();
    }).then(itemsReturned => {
      setItems(itemsReturned);
      console.log("items: ", itemsReturned);
    }).catch(err => {
      setError(err.message);
    });
  }, [])
  return (
    <div>
    <p>{auth}</p>
    <p>{listUrl}</p>
    <select className="form-control" value={item}
      onChange={(e) => setItem(e.target.value)} >
      <option value="A">ABCD</option>
      <option value="X">WXYZ</option>
      <option value="1">1234</option>
    </select>
    </div>
  );
}
 
export default AnodiamDropdown;