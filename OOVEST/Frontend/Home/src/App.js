import './App.css';
import ResponsiveBar from './components/ResponsiveBar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './pages';
import About from './pages/about';
import Services from './pages/services';
import Questions from './pages/questions';
import UsageHelp from './pages/usage-help';

function App() {
  return (
    <Router>
      <ResponsiveBar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/services' component={Services} />
        <Route path='/questions' component={Questions} />
        <Route path='/usage-help' component={UsageHelp} />
      </Switch>
    </Router>
  );
}

export default App;
