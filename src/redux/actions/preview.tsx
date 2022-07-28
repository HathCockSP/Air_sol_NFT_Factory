import axios from 'axios';

export function get_assets() {
  return axios.get('/api/preview/get_assets').then(res => {
    if (res.data.success) {
      return res.data;
    } else alert('error occur');
  });
}

export function check_assets(image_type:any) {
  return axios.post('/api/preview/check_assets', {image_type}).then(res => {
    if (res.data.success) {
      return res.data.flag;
    } else alert('error occur');
  });
}
