// ******************************************************
// Service access URLs
// ******************************************************
const signupUrl = 'http://localhost:8444/api/public/student-signup'
const loginUrl = 'http://localhost:8445/login';
const boardListUrl = 'http://localhost:8446/api/master-data/boards';
const levelListUrl = 'http://localhost:8446/api/master-data/levels';
const getProfileUrl = 'http://localhost:8446/api/user/profile';
// ******************************************************

export function getUrl (targetFunction) {
  let url = loginUrl;
  switch (targetFunction) {
    case 'loginUrl':
      url = loginUrl;
      break;
    case 'signupUrl':
      url = signupUrl;
      break;
    case 'boardListUrl':
      url = boardListUrl;
      break;
    case 'levelListUrl':
      url = levelListUrl;
      break;
    case 'getProfileUrl':
      url = getProfileUrl;
      break;
    default:
      url = loginUrl;
  }
  return (url);
}