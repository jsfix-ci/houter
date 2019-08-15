import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

storiesOf("Router|HashRouter", module).add("usage", () => (
  <iframe
    src="https://codesandbox.io/embed/hashrouter-f89jv?fontsize=14"
    title="new"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    style={{
      width: "100%",
      height: "100%",
      position: "absolute"
    }}
  />
));

