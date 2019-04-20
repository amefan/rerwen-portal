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
    }

}