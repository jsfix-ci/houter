import React from "react";

import { storiesOf } from "@storybook/react";

storiesOf("Router|Router", module).add(
  "usage",
  () => (
    <iframe
      src="https://codesandbox.io/embed/router-9be8z?fontsize=14"
      title="new"
      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute"
      }}
    />
  ),
  {
    notes:
      "The common low-level interface for all router components.The most common use-case for using the low-level `<Router>` is to synchronize a custom history with a state management lib like Redux or Mobx,or using the history instance outside the React App."
  }
);
