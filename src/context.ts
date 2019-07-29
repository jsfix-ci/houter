
import {ctxValue} from './types'
import React from 'react'

const RouterContext = React.createContext<ctxValue|null>(null);
export default RouterContext