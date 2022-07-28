import axios from 'axios';

export function get_batch_list() {
  return axios.get('/api/production/get_batch_list').then(res => {
    return res.data.batch_list;
    // console.log(res.data.batch_list);
  });
}

export function get_batch_data(batch_num: any) {
  return axios
    .post('/api/production/get_batch_data', { batch_num })
    .then(res => {
      return res.data.batch_data;
      // console.log(res.data.batch_list);
    });
}

export function download_batch(username:any,production_name:any,batch_name: any, batch_list_data: any) {
  return axios
    .post('/api/production/download_batch', {username, production_name, batch_name, batch_list_data })
    .then(res => {
      return res.data;
    });
}

export function uploadLocal(id:any,sBatchName: any, batch_list_data: any) {
  return axios
    .post('/api/production/uploadLocal', { id, sBatchName, batch_list_data })
    .then(res => {
      return res.data.flag_success;
    });
}

export function generate_config(data: any) {
  axios.post('/api/production/generate_config', data).then(res => {
    if (res.data.success) alert('success');
    else alert('error occur');
  });
}

export function getAssets(id:any) {
  return axios.post('/api/production/get_assets',{id}).then(res => {
    if (res.data.success) {
      return res.data;
    } else alert('error occur');
  });
}

export function upload_nft() {
  return axios.post('/api/production/upload_nft').then(res => {
    return res.data;
    // if (res.data.success) {
    //   return res.data;
    // } else alert('error occur');
  });
}

export function verify_nft() {
  return axios.post('/api/production/verify_nft').then(res => {
    return res.data;
    // if (res.data.success) {
    //   return res.data;
    // } else alert('error occur');
  });
}

export function mint_nft(count: any) {
  return axios.post('/api/production/mint_nft', { count }).then(res => {
    return res.data;
  });
}

