import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AnodiamBody from './components/AnodiamBody/AnodiamBody';
import AnodiamFooter from './components/AnodiamFooter/AnodiamFooter';
import AnodiamHeader from './components/AnodiamHeader/AnodiamHeader';

function App() {
  return (
    <Router>
      <div className="App anodiam-gradiant-background">
        <div className="anodiam-container">
          <AnodiamHeader />
          {/* <AnodiamHeader /> */}
          <div className="anodiam-content">
            <Switch>
              <Route exact path="/">
                <AnodiamBody />
              </Route>
            </Switch>
          </div>
          <AnodiamFooter />
        </div>
      </div>
    </Router>
  );
}

export default App;