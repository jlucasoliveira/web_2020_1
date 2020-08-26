import Axios from 'axios';

const baseURL = 'http://localhost:3002/api/v1';

export default Axios.create({baseURL});