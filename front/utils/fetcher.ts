import axios from 'axios';

const fetcher = async (url: string) => {
  const res = await axios.get(url, { withCredentials: true });
  if (!res) {
    const error = new Error('An error occurred while fetching the data.');
    return error;
  }
  return res.data;
};
export default fetcher;
