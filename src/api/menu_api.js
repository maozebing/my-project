import {get, post, put, del} from '../utils/http'

export const api_listMenu = p => get('/menu', p);
