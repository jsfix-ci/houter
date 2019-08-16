import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Hook|useRoute", module).add("usage", () => (
  <iframe
    src="https://codesandbox.io/embed/useroute-pzj8l?fontsize=14"
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
  notes:'The useRoute hook make accessing router directly easier . You can check if particular route matches th current location by using an useRoute hook .'
});
