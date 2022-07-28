import axios from 'axios';

export function generate_config(data: any) {
  axios.post('/api/generate/generate_config', data)
  .then(res => {
    if (res.data.success) alert('success');
    else alert('error occur');
  });
}

export function generate_metadata(data: any) {
  axios.post('/api/generate/generate_metadata', data).then(res => {
    if (res.data.success) alert('success');
    else alert('error occur');
  });
}

export function upload_nft() {
  return axios.post('/api/generate/upload_nft').then(res => {
    return res.data.success;
  });
}

export function verify_nft() {
  return axios.post('/api/generate/verify_nft').then(res => {
    return res.data.success;
  });
}

export function mint_nft(count: any) {
  return axios.post('/api/generate/mint_nft', { count }).then(res => {
    return res.data.success;
  });
}

export function get_assets(count: any) {
  axios.post('/api/generate/get_assets', { count }).then(res => {
    if (res.data.success) alert('success');
    else alert('error occur');
  });
}

export function upload_images(formData: any) {
  axios.post('/api/generate/upload_images',  formData ).then(res => {
    if (res.data.success) alert('success');
    else alert('error occur');
  });
}

export function choose_assets(formData: any) {
  axios.post('/api/generate/choose_assets',  formData ).then(res => {
    if (res.data.success) alert('success');
    else alert('error occur');
  });
}

