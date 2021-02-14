import axios from 'axios';
export const endpoint = axios.create({
    baseURL: 'http://192.168.110.197:8000/api',
});
