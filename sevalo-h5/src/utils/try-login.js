const getUrlParam = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

export async function tryLogin(loginFn) {
  if (localStorage.getItem('openId')) return
  let code = getUrlParam('code');
  if (!code) {
    if (process.env.NODE_ENV === 'production') {
      const redirectUri = encodeURIComponent(location.href);
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.VUE_APP_APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
      location.href = url;
    } else {
      localStorage.setItem('openId', process.env.VUE_APP_FAKE_OPEN_ID)
    }
    throw new Error('跳转登录')
  }
  try {
    const openId = await loginFn(code)
    localStorage.setItem('openId', openId)
    history.go(-1);
  } catch (e) {
    document.title = '登录失败'
    throw e
  }
}
