import React from "react";

import { storiesOf } from "@storybook/react";
import CodeSandBox from "./CodeSandBox";

storiesOf("Router|Router", module).add(
  "usage",
  () => (
    <CodeSandBox
      src="https://codesandbox.io/embed/router-9be8z?fontsize=14"
      title="Router"
    />
  ),
  {
    notes:
      "The common low-level interface for all router components.The most common use-case for using the low-level `<Router>` is to synchronize a custom history with a state management lib like Redux or Mobx,or using the history instance outside the React App."
  }
);
