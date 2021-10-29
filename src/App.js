import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AnodiamFooter from './components/AnodiamFooter/AnodiamFooter';
import AnodiamHeader from './components/AnodiamHeader/AnodiamHeader';
import AnodiamLogin from './components/AnodiamLogin/AnodiamLogin';
import AnodiamRegister from './components/AnodiamRegister/AnodiamRegister';

function App() {
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
      </Switch>
      <AnodiamFooter />
    </Router>
  );
}

export default App;