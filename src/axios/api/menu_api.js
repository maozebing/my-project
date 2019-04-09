import {get, post, put, del} from '../http'

export const api_listMenu = p => get('/menu', p);
