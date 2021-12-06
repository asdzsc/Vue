import request from '@/utils/request'
const baseUrl = 'lottery/'

// openId(Post)
export function getOpenId(params) {
    return request({
        url: baseUrl + 'getOpenId',
        method: 'get',
        params
    })
}

// 移动端-获取抽奖活动详情(Post) lottery/prizeInfo
export function prizeInfo(data) {
    return request({
        url: baseUrl + 'prizeInfo',
        method: 'post',
        data
    })
}
// 移动端-抽奖(Post)			lottery/lottery
export function lottery(data) {
    return request({
        url: baseUrl + 'lottery',
        method: 'post',
        data
    })
}
// 移动端-领取实物奖品(Post)			lottery/receive
export function receive(data) {
    return request({
        url: baseUrl + 'receive',
        method: 'post',
        data
    })
}
// 移动端-我的奖品(Post)			lottery/myPrize
export function myPrize(data) {
    return request({
        url: baseUrl + 'myPrize',
        method: 'post',
        data
    })
}
// 移动端-兑换奖品(Post)			lottery/exchange
export function exchange(data) {
    return request({
        url: baseUrl + 'exchange',
        method: 'post',
        data
    })
}
// 移动端-拉新二维码(Post)			lottery/shareQRCode
export function shareQRCode(data) {
    return request({
        url: baseUrl + 'shareQRCode',
        method: 'post',
        data
    })
}

// 移动端-分享增加抽奖次数(Post)	lottery/share
export function share(data) {
    return request({
        url: baseUrl + 'share',
        method: 'post',
        data
    })
}


// 移动端-分享增加抽奖次数(Post)	lottery/getSign
export function getSign(params) {
    return request({
        url: baseUrl + 'getSign',
        method: 'get',
        params
    })
}