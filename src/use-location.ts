import { useRouter } from './Router';
import { Location, History } from './types';

const useLocation = (): [Location, History['push'], History['replace']] => {
  const { location, history } = useRouter();

  return [location, history.push, history.replace];
};

export default useLocation;
