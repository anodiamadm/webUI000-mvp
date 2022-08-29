// ******************************************************
// Service access URLs
// ******************************************************

const protocol = 'http';
const server = '34.121.14.128';
const loginPort = '80';
const studentPort = '80';
const signupPort = '80';
// const profilePort = '3000';
const signupEndPoint = '/api/auth/signup/student'
const loginEndPoint = '/api/auth/signin';
const studentEndPoint = '/student';
// const boardListEndPoint = '/api/master-data/boards';
// const levelListEndPoint = '/api/master-data/levels';
// const getProfileEndPoint = '/api/user/profile';
// const profileSaveEndPoint = '/api/user/save-profile';
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
    case 'studentUrl':
      url = protocol + '://' + server + ':' + studentPort + studentEndPoint;
      break;
    // case 'boardListUrl':
    //   url = protocol + '://' + server + ':' + profilePort + boardListEndPoint;
    //   break;
    // case 'levelListUrl':
    //   url = protocol + '://' + server + ':' + profilePort + levelListEndPoint;
    //   break;
    // case 'getProfileUrl':
    //   url = protocol + '://' + server + ':' + profilePort + getProfileEndPoint;
    //   break;
    // case 'profileSaveUrl':
    //   url = protocol + '://' + server + ':' + profilePort + profileSaveEndPoint;
    //   break;
    default:
      url = protocol + '://' + server + ':' + loginPort + loginEndPoint;
  }
  return (url);
}