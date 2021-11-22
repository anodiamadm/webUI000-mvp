// ******************************************************
// Service access URLs
// ******************************************************
const signupUrl = 'http://localhost:8444/api/public/student-signup'
const loginUrl = 'http://localhost:8445/login';
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
    default:
      url = loginUrl;
  }
  return (url);
}