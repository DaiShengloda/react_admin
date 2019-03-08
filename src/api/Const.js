// 接口域名
// const domain = 'http://gccj.lzyunying.com'
const domain = 'http://api.cf69.com'

// 接口地址
const API_URL = {
  // 笔记列表
  NOTE_LIST: '/api/noteInterface/list.do',
}

//解决Object.entries不兼容的问题
if (!Object.entries || typeof Object.entries !== 'function') {
  Object.entries = function (obj) {
    let objData = [];
    for (let k in obj) {
      objData.push([k, obj[k]]);
    }
    return objData;
  }
}
  
for (let [k, v] of Object.entries(API_URL)) {
  API_URL[k] = domain + v
}

export default {
  API_URL: API_URL,
  domain,
}