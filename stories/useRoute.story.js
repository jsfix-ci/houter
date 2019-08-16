import React from "react";
import { storiesOf } from "@storybook/react";
import CodeSandBox from "./CodeSandBox";

storiesOf("Hook|useRoute", module).add(
  "usage",
  () => (
    <CodeSandBox
      src="https://codesandbox.io/embed/useroute-pzj8l?fontsize=14"
      title="useRoute"
    />
  ),
  {
    notes:
      "The useRoute hook make accessing router directly easier . You can check if particular route matches th current location by using an useRoute hook ."
  }
);
