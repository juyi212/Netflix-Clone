import axios from 'axios';

const fetcher = async (url: string, headerValue: string) => 
    await axios.get(url, {headers: { 'access-token' : "Bearer " + headerValue  }})
    .then((response) => response.data)
    .catch((error) =>  error )
export default fetcher;