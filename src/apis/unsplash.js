import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID Py_Xy4RG-bjAye3mwNWdoRm9oBTkkMqzOD4lcRcPpcs'
  }
});
