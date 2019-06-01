import request from '@/utils/request'
const host = 'http://localhost:9002'
const api_name = 'share'
export default {
  getList() {
    return request({
      url: `${host}/${api_name}`,
      method: 'get'
    })
  },
  search(page, size, searchMap) {
    return request({
      url: `${host}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  save(pojo) {
    return request({
      url: `${host}/${api_name}`,
      method: 'post',
      data: pojo
    })
  },
  findById(id) {
    return request({
      url: `${host}/${api_name}/${id}`,
      method: 'get'
    })
  },
  update(id, pojo) {
    if (id === null || id === '') {
      return this.save(pojo)
    }
    return request({
      url: `${host}/${api_name}/${id}`,
      method: 'put',
      data: pojo
    })
  },
  deleteById(id) {
    return request({
      url: `${host}/${api_name}/${id}`,
      method: 'delete'
    })
  },
  examine(id){
    return request({
      url: `${host}/${api_name}/examine/${id}`,
      method : 'put'
    })
  },
  thumbup(id,token){
    return request({
      url: `${host}/${api_name}/thumbup/${id}`,
      method: 'put',
      data:{
        token
      }
    })
  }
}
