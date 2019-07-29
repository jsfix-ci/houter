import React from "react";
import { RedirectProps } from "./types";
import { useLocation } from "./use-location";
const Redirect = (props: RedirectProps) => {
  const [_, push] = useLocation();

  React.useEffect(() => {
    const href = props.href || props.to;
    if (href) push(href);
  }, []);
  return null;
};

export { Redirect };
