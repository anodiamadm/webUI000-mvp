import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { getUrl } from "../../../utils/UrlUtils";

const BoardDropdown = ({boardId, setBoardId, setError}) => {
  const { auth } = useContext(AuthContext);
  const boardListUrl = getUrl('boardListUrl');
  const [boards, setBoards] = useState(null);
  useEffect(() => {
    fetch(boardListUrl, {
      headers: { 'Authorization': "Bearer " + auth }
    }).then(res => {
      if(!res.ok) {
        throw Error('Error in fetching from ' + boardListUrl);
      }
      return res.json();
    }).then(boardsReturned => {
      setBoards(boardsReturned);
    }).catch(err => {
      setError(err.message);
    });
  }, [auth, boardListUrl, setError])
  return (
    <div>
      { boards!==null ?
        <select className="form-control" value={boardId}
          onChange={(e) => setBoardId(e.target.value)} >
          {boards.map(board=>(
            <option value = {board.boardId} key = {board.boardId}>{board.boardShortName}</option>
          ))} 
        </select> :
        <div>Loading...</div>
      }
    </div>
  );
}
 
export default BoardDropdown;