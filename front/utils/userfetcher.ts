import axios from 'axios';


const userfetcher =  async(url: string) => {
    const headerValue = localStorage.getItem("user") ?? "";
    const res = await axios.get(url, {headers: { 'auth-token' :  headerValue  }})
    if (!res){
        const error = new Error('An error occurred while fetching the data.')
        return error
    }
    return res.data
}
export default userfetcher;

