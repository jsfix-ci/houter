import React from "react";
import { storiesOf } from "@storybook/react";
import CodeSandBox from "./CodeSandBox";

storiesOf("Component|Route", module).add(
  "usage",
  () => (
    <CodeSandBox
      src="https://codesandbox.io/embed/route-ixhsi?fontsize=14"
      title="Route"
    />
  ),
  {
    notes:
      "`<Route/>` is a component rendered some UI when a location matches it's path."
  }
);
