import {
  History,
  Location,
  HashHistoryBuildOptions,
  BrowserHistoryBuildOptions
} from "history";
import { ReactElement, ComponentType, ReactNode } from "react";

export type History = History;
export type Location = Location;
export type Match = {
  path: string;
  url: string;
  isExact: boolean;
  params: object;
} | null;

export type ctxValue = {
  history: History;
  location: Location;
  match: Match;
};

export interface RouterProps {
  history: History;
  children?: ReactNode;
  basename?: string;
}

export type HashRouterProps = {
  children?: ReactNode;
} & HashHistoryBuildOptions;

export type BrowserRouterProps = {
  children?: ReactNode;
} & BrowserHistoryBuildOptions;

export type RouteComponentProps = {
  location: Location;
  history: History;
  match: Match;
};
export type RouteProps = {
  location?: Location;
  children?: ReactNode | ((props: RouteComponentProps) => ReactElement);
  render?: (props: RouteComponentProps) => ReactElement;
  component?: ComponentType<RouteComponentProps>;
  computedMatch?: Match;
  path?: string;
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
};

export type Options = {
  path?: string | Array<string>;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
};

export type makeMatchOpt = {
  exact: boolean;
  strict: boolean;
  sensitive: boolean;
};

export type SwitchProps={
  children?:ReactNode;
  location?:Location;
}

export type LinkProps={
  to?:string;
  path?:string;
  children?:ReactNode;
  onClick?:(e:React.FormEvent<HTMLAnchorElement>)=>void;
  state?:any;
}

export type RedirectProps={
  to?:string;
  href?:string;
}