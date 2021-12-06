import request from '@/utils/request'
const baseUrl = 'discount/'

// 获取微信公众号openId(GET)			discount/getOpenId
export function getOpenId(params) {
    return request({
        url: baseUrl + 'getOpenId',
        method: 'get',
        params
    })
}

// 领取优惠券(GET)			discount/receive
export function receive(params) {
    return request({
        url: baseUrl + 'receive',
        method: 'get',
        params
    })
}