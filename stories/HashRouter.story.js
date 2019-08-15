import React from "react";

import { storiesOf } from "@storybook/react";

storiesOf("Router|HashRouter", module).add("usage", () => (
  <iframe
    src="https://codesandbox.io/embed/hashrouter-f89jv?fontsize=14"
    title="new"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    style={{
      width: "100%",
      height: "100%",
      position: "absolute"
    }}
  />
),{
  notes:"A `<Router>` that uses the hash portion(window.location.hash) to keep your UI in sync with the URL."
});
