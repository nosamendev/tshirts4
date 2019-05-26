import axios from 'axios';

export default axios.create({
    baseURL: 'https://tshirt-1ee50.firebaseio.com/'
});