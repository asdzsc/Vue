import request from "@/utils/request";
const baseUrl = 'potentialInvite/'
export function getInviteCodeInfo(params) {
  return request({
    url: baseUrl + 'info',
    method: 'get',
    params
  })
}

export function getShareCodeInfo(params) {
  return request({
    url: baseUrl + 'invite',
    method: 'get',
    params
  })
}

export function submitAddressToGift(data) {
  return request({
    url: baseUrl + 'insertAddress',
    method: 'post',
    data
  })
}

export function inviteModuleGetOpenId(params) {
  return request({
    url: baseUrl + 'getOpenId',
    method: 'get',
    params
  })
}
