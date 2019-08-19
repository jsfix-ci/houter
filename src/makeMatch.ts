import pathToRegexp, { Key } from 'path-to-regexp';
import { Options, Match } from './types';

interface Cache {
  [i: string]: {
    [k: string]: {
      regexp: RegExp;
      keys: Array<Key>;
    };
  };
}

const cache: Cache = {};

type regOptions = {
  exact: boolean;
  strict: boolean;
  sensitive: boolean;
};

const toRegWithCache = (
  path: string,
  { exact, sensitive, strict }: regOptions
): { regexp: RegExp; keys: Array<Key> } => {
  const key = `${exact}${strict}${sensitive}`;
  const pathCache = cache[key] || (cache[key] = {});
  if (pathCache[path]) return pathCache[path];
  const keys: Array<Key> = [];
  const regexp = pathToRegexp(path, keys, {
    end: exact,
    sensitive,
    strict
  });
  const result = (pathCache[path] = { regexp, keys });
  return result;
};

export default (
  currentPath: string,
  options: Options | string | string[] = {}
) => {
  if (typeof options === 'string' || Array.isArray(options)) {
    options = {
      path: options
    };
  }
  const {
    path: optionPath,
    exact = false,
    sensitive = false,
    strict = false
  } = options;

  const paths = ([] as Array<string | undefined>).concat(optionPath);

  return paths.reduce((matched: Match | null, path) => {
    if (!path) return null;
    if (matched) return matched;
    const { regexp, keys } = toRegWithCache(path, {
      exact,
      sensitive,
      strict
    });
    const match = regexp.exec(currentPath);
    if (!match) return null;
    const [url, ...values] = match;
    const isExact = url === currentPath;
    if (exact && !isExact) return null;

    return {
      url: path === '/' && url === '' ? '/' : url,
      path,
      isExact: exact,
      params: keys.reduce((result, key, index) => {
        result[key.name] = values[index];
        return result;
      }, {})
    };
  }, null);
};
