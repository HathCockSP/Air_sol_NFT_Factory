import axios from "axios";

export function get_batch_list() {
  return axios.get("/api/production/get_batch_list").then((res) => {
    console.log(res.data.batch_data);
    console.log(res.data)
    return res.data;
    // console.log(res.data.batch_list);
  });
}

export function get_batch_data(batch_num: any) {
  return axios
    .post("/api/production/get_batch_data", { batch_num })
    .then((res) => {
      console.log(res.data.batch_list);

      return res.data;
    });
}

export function download_batch(
  username: any,
  wallet_address:any,
  production_name: any,
  batch_name: any,
  batch_list_data: any
) {
  return axios
    .post("/api/production/download_batch", {
      username,
      wallet_address,
      production_name,
      batch_name,
      batch_list_data,
    })
    .then((res) => {
      return res.data;
    });
}

export function uploadLocal(id: any, sBatchName: any, batch_list_data: any) {
  return axios
    .post("/api/production/uploadLocal", { id, sBatchName, batch_list_data })
    .then((res) => {
      return res.data;
    });
}

export function generate_config(id: any, data: any) {
  return axios
    .post("/api/production/generate_config", { id, data })
    .then((res) => {
      return res.data;
    });
}

export function getAssets(id: any) {
  return axios.post("/api/production/get_assets", { id }).then((res) => {
    return res.data;
  });
}

export function upload_nft(id: any) {
  return axios.post("/api/production/upload_nft", { id }).then((res) => {
    return res.data;
    // if (res.data.success) {
    //   return res.data;
    // } else alert('error occur');
  });
}

export function verify_nft(id: any) {
  return axios.post("/api/production/verify_nft", { id }).then((res) => {
    return res.data;
    // if (res.data.success) {
    //   return res.data;
    // } else alert('error occur');
  });
}

export function mint_nft(id: any, count: any) {
  return axios.post("/api/production/mint_nft", { id, count }).then((res) => {
    return res.data;
  });
}
