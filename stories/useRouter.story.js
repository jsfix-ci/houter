import React from "react";
import { storiesOf } from "@storybook/react";
import CodeSandBox from "./CodeSandBox";

storiesOf("Hook|useRouter", module).add(
  "usage",
  () => (
    <CodeSandBox
      src="https://codesandbox.io/embed/userouter-tm34j?fontsize=14"
      title="useRouter"
    />
  ),
  {
    notes:
      "The `useRouter` hooks let you have access to the lastest [history](#history) object and the closest [<Route/>'s match](#match) object."
  }
);
