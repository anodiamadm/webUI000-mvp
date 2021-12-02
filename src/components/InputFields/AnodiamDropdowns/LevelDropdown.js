import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { getUrl } from "../../../utils/UrlUtils";

const LevelDropdown = ({levelId, setLevelId, setError}) => {
  const { auth } = useContext(AuthContext);
  const levelListUrl = getUrl('levelListUrl');
  const [levels, setLevels] = useState(null);
  useEffect(() => {
    fetch(levelListUrl, {
      headers: { 'Authorization': "Bearer " + auth }
    }).then(res => {
      if(!res.ok) {
        throw Error('Error in fetching from ' + levelListUrl);
      }
      return res.json();
    }).then(levelsReturned => {
      setLevels(levelsReturned);
    }).catch(err => {
      setError(err.message);
    });
  }, [auth, levelListUrl, setError])
  return (
    <div>
      { levels!==null ?
        <select className="form-control" value={levelId}
          onChange={(e) => setLevelId(e.target.value)} >
          {levels.map(level=>(
            <option value = {level.levelId} key = {level.levelId}>{level.levelName}</option>
          ))} 
        </select> :
        <div>Loading...</div>
      }
    </div>
  );
}
 
export default LevelDropdown;