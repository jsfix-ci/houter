import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Hook|useLocation", module).add("usage", () => (
  <iframe
    src="https://codesandbox.io/embed/uselocation-dxkw2?fontsize=14"
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
  notes:"You can get access to the location object’s properties and performing a navigation via the **useLocation** hook."
});
