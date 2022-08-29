import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Anodiam404 from './components/GenericComponents/Anodiam404/Anodiam404';
import AnodiamBuyCourses from './components/AnodiamBuyCourses/AnodiamBuyCourses';
import AnodiamFooter from './components/GenericComponents/AnodiamFooter/AnodiamFooter';
import AnodiamHeader from './components/AnodiamHeader/AnodiamHeader';
import AnodiamLogin from './components/AnodiamLogin/AnodiamLogin';
import AnodiamRegister from './components/AnodiamRegister/AnodiamRegister';
import MyLearning from './components/MyLearning/MyLearning';
import MyProfile from './components/MyProfile/MyProfile';
import AuthContextProvider from './contexts/AuthContext';
import AnodiamAbout from './components/GenericComponents/AnodiamFooter/AnodiamAbout';
import AnodiamContact from './components/GenericComponents/AnodiamFooter/AnodiamContact';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <AnodiamHeader />
        <Switch>
          <Route exact path="/login">
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
          <Route exact path="/about">
            <AnodiamAbout />
          </Route>
          <Route exact path="/contact">
            <AnodiamContact />
          </Route>
          <Route exact path="/error">
            <Anodiam404 />
          </Route>
          <Redirect to="/login" />
        </Switch>
        <AnodiamFooter />
      </AuthContextProvider>
    </Router>
  );
}

export default App;