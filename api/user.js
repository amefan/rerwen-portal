import request from '@/utils/request'
const host = 'http://localhost:9001'
const api_name = 'user';
export default {
    sendsms(mobile){
        return request({
            url: `${host}/${api_name}/sendsms/${mobile}`,
            method: 'post'
        })
    },
    register(user,code){
        return request({
            url: `${host}/${api_name}/register/${code}`,
            method: 'post',
            data: user
        })
    },
    login(mobile,password){
        return request({
            url: `${host}/${api_name}/login`,
            method: 'post',
            data: {
                mobile: mobile,
                password: password
            }
        })
    },
    toSelf(token){
        return request({
            url: `${host}/${api_name}/toself`,
            method: 'post',
            data: {
                token
            }
        })
    },
    save(pojo,id){
        return request({
            url: `${host}/${api_name}/${id}`,
            method: 'put',
            data: pojo
        })
        
    },
    GetOnline(){
        return request({
            url: `${host}/${api_name}/online`,
            method: 'get',
        })
    },
    getOne(id){
        return request({
            url: `${host}/${api_name}/${id}`,
            method: 'get',
        })
    }

}