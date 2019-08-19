import {
  History,
  Location,
  HashHistoryBuildOptions,
  BrowserHistoryBuildOptions
} from 'history';
import { ReactElement, ComponentType, ReactNode } from 'react';

export type History = History;
export type Location = Location;
export type Match<Params extends { [K in keyof Params]?: string } = {}> = {
  path: string;
  url: string;
  isExact: boolean;
  params: Partial<Params>;
};

export type ctxValue = {
  history: History;
  location: Location;
  match: Match | null;
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

type AA = {
  [k: string]: string;
};
export type HookResult<
  Params extends { [k in keyof Params]?: string } = any
> = {
  location: Location;
  history: History;
  match: Match<Params> | null;
};

type NonNullRecord<T> = { [k in keyof T]: NonNullable<T[k]> };

export type RouteComponentProps = NonNullRecord<HookResult>;
export type RouteProps<Params extends { [K in keyof Params]?: string } = {}> = {
  location?: Location;
  children?: ReactNode | ((props: HookResult) => ReactElement);
  render?: (props: RouteComponentProps) => ReactElement;
  component?: ComponentType<RouteComponentProps>;
  computedMatch?: Match<Params>;
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

export type SwitchProps = {
  children?: ReactNode;
  location?: Location;
};

export type LinkProps<State extends { [k in keyof State]?: string } = {}> = {
  to?: string;
  path?: string;
  children?: ReactNode;
  onClick?: (e: React.FormEvent<HTMLAnchorElement>) => void;
  state?: State;
};

export type RedirectProps = {
  to?: string;
  href?: string;
};
