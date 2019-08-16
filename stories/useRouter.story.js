import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Hook|useRouter", module).add("usage", () => (
  <iframe
    src="https://codesandbox.io/embed/userouter-tm34j?fontsize=14"
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
  notes:"The `useRouter` hooks let you have access to the lastest [history](#history) object and the closest [\<Route/\>'s match](#match) object."
});
