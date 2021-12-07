// ******************************************************
// Service access URLs
// ******************************************************

const protocol = 'http';
const server = 'localhost';
const signupPort = '8444';
const loginPort = '8445';
const profilePort = '8446';
const signupEndPoint = '/api/public/student-signup'
const loginEndPoint = '/login';
const boardListEndPoint = '/api/master-data/boards';
const levelListEndPoint = '/api/master-data/levels';
const getProfileEndPoint = '/api/user/profile';
const profileSaveEndPoint = '/api/user/save-profile';
// ******************************************************

export function getUrl (targetFunction) {
  let url = '';
  switch (targetFunction) {
    case 'loginUrl':
      url = protocol + '://' + server + ':' + loginPort + loginEndPoint;
      break;
    case 'signupUrl':
      url = protocol + '://' + server + ':' + signupPort + signupEndPoint;
      break;
    case 'boardListUrl':
      url = protocol + '://' + server + ':' + profilePort + boardListEndPoint;
      break;
    case 'levelListUrl':
      url = protocol + '://' + server + ':' + profilePort + levelListEndPoint;
      break;
    case 'getProfileUrl':
      url = protocol + '://' + server + ':' + profilePort + getProfileEndPoint;
      break;
    case 'profileSaveUrl':
      url = protocol + '://' + server + ':' + profilePort + profileSaveEndPoint;
      break;
    default:
      url = protocol + '://' + server + ':' + loginPort + loginEndPoint;
  }
  return (url);
}