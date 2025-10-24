import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main>
          <Switch>
            <Route path="/" exact component={Dashboard} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;