import React from "react";

import { storiesOf } from "@storybook/react";
import CodeSandBox from "./CodeSandBox";

storiesOf("Router|HashRouter", module).add(
  "usage",
  () => (
    <CodeSandBox
      src="https://codesandbox.io/embed/hashrouter-f89jv?fontsize=14"
      title="HashRouter"
    />
  ),
  {
    notes:
      "A `<Router>` that uses the hash portion(window.location.hash) to keep your UI in sync with the URL."
  }
);
