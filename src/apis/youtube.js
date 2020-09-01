import axios from 'axios';
const KEY = 'AIzaSyDOHSsGueCGPX05l2DrjWM_ZoAn6p4jxFU';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    type: 'video',
    maxResults: 5,
    key: KEY
  }
});
