import React from "react";
import { storiesOf } from "@storybook/react";
import CodeSandBox from "./CodeSandBox";

storiesOf("Component|Switch", module).add(
  "usage",
  () => (
    <CodeSandBox
      src="https://codesandbox.io/embed/switch-zege9?fontsize=14"
      title="Switch"
    />
  ),
  {
    notes: "<Switch/> always render the first matched <Route/> component."
  }
);
