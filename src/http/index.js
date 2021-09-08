import axios from "./axios2";

export function httpGet(url) {
  if (!url) return;
  return axios.get(url);
}
export function httpPost(url, data = {}) {
  if (!url) return;
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  });
}
export function httpDelete(url, data) {
  if (!url) return;
  if (data) {
    /**delete data需要放在config里 */
    return axios.delete(url, { data: data });
  } else {
    return axios.delete(url);
  }
}
export function httpPut(url, data = {}) {
  if (!url) return;
  return axios.put(url, data);
}
export function getDownload(url) {
  if (!url) return;
  return axios.get(url, { responseType: "blob" });
}
export function postDownload(url, data = {}) {
  console.log(data)
  if (!url) return;
  return axios.post(url, data, { responseType: "blob" });
}
export const imgBaseUrl = "http://172.22.8.95:9010/";
