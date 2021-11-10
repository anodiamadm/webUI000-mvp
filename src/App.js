import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Anodiam404 from './components/Anodiam404/Anodiam404';
import AnodiamFooter from './components/AnodiamFooter/AnodiamFooter';
import AnodiamHeader from './components/AnodiamHeader/AnodiamHeader';
import AnodiamHome from './components/AnodiamHome/AnodiamHome';
import AnodiamLogin from './components/AnodiamLogin/AnodiamLogin';
import AnodiamRegister from './components/AnodiamRegister/AnodiamRegister';

const App = () => {
  return (
    <Router>
      <AnodiamHeader />
      <Switch>
        <Route exact path="/">
          <AnodiamLogin />
        </Route>
        <Route exact path="/register">
          <AnodiamRegister />
        </Route>
        <Route exact path="/home">
          <AnodiamHome />
        </Route>
        <Route exact path="/error">
          <Anodiam404 />
        </Route>
        <Redirect to="/" />
      </Switch>
      <AnodiamFooter />
    </Router>
  );
}

export default App;