import React, { Component } from "react";
import { render } from "react-dom";

import { HashRouter, Route, useRoute } from "../../src";
console.log(HashRouter, "H");

const U = () => {
  const { match } = useRoute({path:"/",exact:true});
  return <div>match:{JSON.stringify(match)}</div>;
};
class Demo extends Component {
  render() {
    return (
      <HashRouter>
        <U />
        <Route path={["/a",'/b']} render={({location})=>`${location.pathname}`}/>
        <h1>11</h1>
      </HashRouter>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
