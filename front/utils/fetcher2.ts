import axios from 'axios';

const fetcher2 = (url: string) => 
    axios.get(url, { withCredentials: true })
        .then((response) => response.data)
        .catch((err)=> err)
export default fetcher2;