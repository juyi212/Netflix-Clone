import axios from 'axios';


const fetcher =  (url: string) => {
    const headerValue = localStorage.getItem("user") ?? "";
    return axios.get(url, {headers: { 'auth-token' :  headerValue  }})
    // 호출안될때 에러값 보내달라고 하기 
    .then((response) => response.data )
    .catch((error) =>  error )
}
export default fetcher;

