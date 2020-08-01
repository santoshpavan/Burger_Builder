import axios from 'axios';

// creating an axios instance in firebase
const axiosInstance = axios.create({
    baseURL: 'https://react-burger-builder-4309a.firebaseio.com/'
});

export default axiosInstance;