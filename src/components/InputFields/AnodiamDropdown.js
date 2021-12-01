import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const AnodiamDropdown = ({item, setItem, listUrl, setError}) => {
  const { auth } = useContext(AuthContext);
  const [items, setItems] = useState(null);
  useEffect(() => {
    fetch(listUrl, {
      headers: { 'Authorization': "Bearer " + auth }
    }).then(res => {
      if(!res.ok) {
        throw Error('Error in fetching from ' + listUrl);
      }
      return res.json();
    }).then(itemsReturned => {
      setItems(itemsReturned);
    }).catch(err => {
      setError(err.message);
    });
  }, [auth, listUrl, setError])
  return (
    <div>
    <p>{auth}</p>
    <p>{listUrl}</p>
    {items.map(item=>(
      <div key={item.boardId}>value = {item.boardId}&nbsp;&nbsp;Show = {item.boardShortName}</div>
    ))}

    <select className="form-control" value={item}
      onChange={(e) => setItem(e.target.value)} >
      {items.map(item=>(
        <option value = {item.boardId}>{item.boardShortName}</option>
      ))}
      <option value="1">1234</option>
      <option value="A">ABCD</option>
      <option value="X">WXYZ</option>
    </select>
    </div>
  );
}
 
export default AnodiamDropdown;