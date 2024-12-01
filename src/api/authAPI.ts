import axios from 'axios';
import {loginRequestDataType} from '../types/loginTypes';
import {url} from '../const/config';

export const loginApi = (data: loginRequestDataType) =>
  axios.post(`${url}/login`, data).then((res: {data: any}) => res.data);
