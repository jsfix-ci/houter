import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Component|Route", module).add("usage", () => (
  <iframe
    src="https://codesandbox.io/embed/route-ixhsi?fontsize=14"
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
  notes:"`<Route/>` is a component rendered some UI when a location matches it's path."
});
