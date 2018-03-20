import axios from 'axios'
import Qs from 'qs'
export function axiosPost(url, data) {
  let querData = Qs.stringify(data)
  return axios({
    method: 'post',
    url: url,
    // withCredentials: true,
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    data: querData
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
