import axios from 'axios'

// 处理请求头
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  }, 
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
)

// 处理请求返回值
axios.interceptors.response.use(
  response => {
    if(response.data.errcode=='100'){  
      // 100 清除token信息并跳转到登录页面
    //   router.push({
    //     path: '/user/login',
    //     query: {redirect: encodeURIComponent(router.currentRoute.fullPath)}
    //   })
    }else if(response.data.sessionStatus=='0'){
      // 静默登录
    //   userManager.loginByAuth()
      return response
    }else{
      return response
    }
  },
  error => {
    console.error('网络异常，请检查网络后重试！')
    return Promise.reject(error);
  }   
)

/**
 * 发送请求
 */
function apiAxios(method, url, params,success, failure) {
  return new Promise((resolve, reject)=>{
    axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      withCredentials: true
    }).then((response)=> {
      if(response){
        if(response.data.data){
          resolve(response.data.data)  
        }else if(response.data.status!=1){
          reject(response.data)
        }else{
          resolve(response.data.data)   
        }
      }else{
        reject('暂无数据') 
      }      
    }).catch((error)=> {
      reject(error)
    })
  })
}

// get请求
function getRequest(url, params, success, failure) {
  return apiAxios('GET', url, params, success, failure)
}
    
// post请求
function postRequest(url, params, success, failure) {
  return apiAxios('POST', url,params, success, failure)
}

export default {
  getRequest,
  postRequest
}