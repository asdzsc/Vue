<template>
  <div class="home">
    <div class="title animate__animated animate__slideInDown">
      <img src="@/assets/img/logo.png" alt />
    </div>
    <div class="slogan animate__animated animate__bounceIn animate__delay-1s">
      <img src="@/assets/img/slogan.png" alt />
    </div>
    <div class="go">
      <img src="@/assets/img/pic1.png" alt />
    </div>
    <div
      class="btn animate__animated animate__bounce animate__delay-2s"
      @click="getCoupon"
    >
      <img src="@/assets/img/btn.png" alt />
    </div>
  </div>
</template>

<script>
// 判断是否为公众号模拟器环境
const isWechat = () => {
  return (
    String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) ===
    "micromessenger"
  );
};

// 判断公众号截取code
const getUrlParam = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};
import { getOpenId } from "@/api/jthb.js";
import { messageToast } from "@/components/message";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      params: {
        id: this.$route.query.id,
        // id: "1417316326694850561",
        openId: "",
      },
      model: {
        id: this.$route.query.id,
        // id: "1417316326694850561",
        code: "",
      },
    };
  },
  mounted() {
    // alert("获取用户身份失败！");
    if (localStorage.getItem("openId")) {
      this.params.openId = localStorage.getItem("openId");
    } else {
      this.getWxCode();
    }
  },

  methods: {
    getWxCode() {
      if (isWechat()) {
        let appid = "wxb5cb5dd960997e7a"; //appid
        let code = getUrlParam("code"); //是否存在code
        let local =
          this.baseUrl + "/sevaloh5/ladderenvelope/" + "?id=" + this.model.id;
        if (code == null || code === "") {
          //不存在就打开上面的地址进行授权
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
            local
          )}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
        } else {
          this.model.code = code;
          this._getOpenId();
        }
      }
    },
    _getOpenId() {
      console.log(this.model);
      getOpenId(this.model).then((res) => {
        console.log(res.data);
        if (res.data.data) {
          localStorage.setItem("openId", res.data.data);
          this.params.openId = res.data.data;
        } else {
          messageToast({
            message: "获取用户身份失败，请重新扫码！",
            duration: 3000,
          });
        }
      });
    },
    getCoupon() {
      // this.$router.push({
      //   path: "/couponenvelope",
      //   query: {
      //     id: this.params.id,
      //     openId: this.params.openId,
      //   },
      // });
      console.log(this.params.openId);
      if (this.params.openId) {
        this.$router.push({
          path: "/couponenvelope",
          query: {
            id: this.params.id,
            openId: this.params.openId,
          },
        });
      } else {
        messageToast({
          message: "获取用户身份失败，请重新扫码！",
          duration: 3000,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  font-size: 15px;
  background: url(../assets/img/page1.png) no-repeat top center/100% 100%;
  height: 100vh;
  width: 100%;
  .title {
    img {
      width: 120px;
      padding-top: 0;
    }
  }
  .slogan {
    img {
      width: 90vw;
      margin: 0 auto;
    }
  }
  .go {
    img {
      width: 80vw;
      margin: 0 auto;
    }
  }
  .btn {
    img {
      width: 150px;
      margin-top: 240px;
    }
  }
}
</style>
