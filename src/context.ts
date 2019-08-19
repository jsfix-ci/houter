import React from 'react';
import { ctxValue } from './types';

const RouterContext = React.createContext<ctxValue | null>(null);
export default RouterContext;
