import {get, post, put, del} from '../http'

export const api_listUser = p => get('/user', p);
export const api_addUser = p => post('/user', p);
export const api_updateUser = p => put('/user', p);