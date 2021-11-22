import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Anodiam404 from './components/Anodiam404/Anodiam404';
import AnodiamBuyCourses from './components/AnodiamBuyCourses/AnodiamBuyCourses';
import AnodiamFooter from './components/AnodiamFooter/AnodiamFooter';
import AnodiamHeader from './components/AnodiamHeader/AnodiamHeader';
import AnodiamLogin from './components/AnodiamLogin/AnodiamLogin';
import AnodiamRegister from './components/AnodiamRegister/AnodiamRegister';
import MyLearning from './components/MyLearning/MyLearning';
import MyProfile from './components/MyProfile/MyProfile';
import AuthContextProvider from './contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <AnodiamHeader />
        <Switch>
          <Route exact path="/">
            <AnodiamLogin />
          </Route>
          <Route exact path="/register">
            <AnodiamRegister />
          </Route>
          <Route exact path="/buyCourses">
            <AnodiamBuyCourses />
          </Route>
          <Route exact path="/profile">
            <MyProfile />
          </Route>
          <Route exact path="/learning">
            <MyLearning />
          </Route>
          <Route exact path="/error">
            <Anodiam404 />
          </Route>
          <Redirect to="/" />
        </Switch>
        <AnodiamFooter />
      </AuthContextProvider>
    </Router>
  );
}

export default App;