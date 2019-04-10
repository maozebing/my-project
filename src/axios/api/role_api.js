import {get, post, put, del} from '../http'

export const api_listRole = p => get('/role', p);
export const api_addRole=p=>post('/role',p);
export const api_updateRole=p=>put('/role',p);
