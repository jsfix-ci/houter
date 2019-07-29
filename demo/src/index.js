import React, { Component } from "react";
import { render } from "react-dom";
import { useRoute, Router, Switch, Route } from "../../src";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
const h1 = () => <h1>h1</h1>;
console.log("works");
class Demo extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
        <Route exact path="/" component={h1} />
          <Route
            path="/:baa"
            render={({ match }) => <h3>{match.params.baa}</h3>}
          />
 
          <Route path="/foo" render={() => <h2>123</h2>} />
        </Switch>
      </Router>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
