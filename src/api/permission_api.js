import {get, post, put, del} from '../utils/http'

export const api_login = p => post('/permission/login', p);