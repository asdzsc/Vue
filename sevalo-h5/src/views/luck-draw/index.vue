<template>
  <div class="container">
    <img src="@/assets/img/luckdraw/luckdraw.png" alt="" />
    <div class="share" @click="handleShare">分享</div>

    <van-loading
      size="24px"
      color="#0094ff"
      vertical
      v-if="!prizeListOrigin.length"
      >加载中...</van-loading
    >
    <div class="wheel-wrapper" v-else>
      <div class="addChange">分享好友获取更多抽奖机会</div>
      <img
        class="wheel-pointer"
        @click="handleStart"
        src="@/assets/img/luckdraw/start.png"
        alt=""
      />
      <div
        class="wheel-bg"
        :class="{ freeze: freeze }"
        :style="`transform: rotate(${wheelDeg}deg)`"
        @transitionend="onLotteryEnd"
      >
        <div class="prize-list">
          <div
            class="prize-item-wrapper"
            v-for="(item, index) in prizeListOrigin"
            :key="index"
          >
            <div
              class="prize-item"
              :style="
                `transform: rotate(${(360 / prizeListOrigin.length) *
                  index}deg)`
              "
            >
              <div class="prize-name">
                {{ item.prizeName }}
              </div>
              <div class="prize-icon" v-if="item.prizeType == 1">
                <img :src="baseUrl + '/api/media/queryUrl/' + item.prizeImg" />
              </div>
              <div class="prize-icon" v-else-if="item.prizeType == 2">
                <img src="@/assets/img/luckdraw/jj.png" alt="" />
              </div>
              <div class="prize-icon" v-else-if="item.prizeType == 3">
                <img src="@/assets/img/luckdraw/icon.png" alt="" />
              </div>
              <div class="prize-icon" v-else>
                <img src="@/assets/img/luckdraw/xx.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="color:#fd9d0c;margin:5px auto;text-align: center;">
      您还有{{ infoObj.number ? infoObj.number : 0 }}次抽奖机会
    </div>
    <div style="color:#fd9d0c;margin:0px auto;text-align: center;">
      活动时间：
      {{ infoObj.startDate ? infoObj.startDate.slice(0, 10) : "" }}——
      {{ infoObj.endDate ? infoObj.endDate.slice(0, 10) : "" }}
    </div>
    <div class="btn">
      <div class="left" @click="handleMyPrice">
        查看我的奖品 <span>》</span>
      </div>
      <div class="right" @click="handleMyPoints">我的积分<span>》</span></div>
    </div>
    <div class="luck">
      <img src="@/assets/img/luckdraw/1.png" alt="" />
      <div class="list">
        <div class="rowup">
          <div class="item">
            <img src="@/assets/img/luckdraw/a1.png" alt="" />
            <span style="margin-right: 5px;">158******65</span>5分钟前抽中50积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a2.png" alt="" />
            <span style="margin-right: 5px;">186******25</span
            >7分钟前抽中10元优惠券
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a3.png" alt="" />
            <span style="margin-right: 5px;">138******33</span
            >8分钟前抽中挖掘机模型
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a4.png" alt="" />
            <span style="margin-right: 5px;">130******35</span
            >17分钟前抽中20积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a5.png" alt="" />
            <span style="margin-right: 5px;">178******65</span>5分钟前抽中50积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a6.png" alt="" />
            <span style="margin-right: 5px;">188******25</span
            >7分钟前抽中10元优惠券
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a7.png" alt="" />
            <span style="margin-right: 5px;">133******33</span
            >8分钟前抽中挖掘机模型
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a8.png" alt="" />
            <span style="margin-right: 5px;">130******35</span
            >17分钟前抽中20积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a9.png" alt="" />
            <span style="margin-right: 5px;">159******65</span>5分钟前抽中50积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a10.png" alt="" />
            <span style="margin-right: 5px;">176******25</span
            >7分钟前抽中10元优惠券
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a1.png" alt="" />
            <span style="margin-right: 5px;">158******65</span>5分钟前抽中50积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a2.png" alt="" />
            <span style="margin-right: 5px;">186******25</span
            >7分钟前抽中10元优惠券
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a3.png" alt="" />
            <span style="margin-right: 5px;">138******33</span
            >8分钟前抽中挖掘机模型
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a4.png" alt="" />
            <span style="margin-right: 5px;">130******35</span
            >17分钟前抽中20积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a5.png" alt="" />
            <span style="margin-right: 5px;">178******65</span>5分钟前抽中50积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a6.png" alt="" />
            <span style="margin-right: 5px;">188******25</span
            >7分钟前抽中10元优惠券
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a7.png" alt="" />
            <span style="margin-right: 5px;">133******33</span
            >8分钟前抽中挖掘机模型
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a8.png" alt="" />
            <span style="margin-right: 5px;">130******35</span
            >17分钟前抽中20积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a9.png" alt="" />
            <span style="margin-right: 5px;">159******65</span>5分钟前抽中50积分
          </div>
          <div class="item">
            <img src="@/assets/img/luckdraw/a10.png" alt="" />
            <span style="margin-right: 5px;">176******25</span
            >7分钟前抽中10元优惠券
          </div>
        </div>
      </div>
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
import {
  prizeInfo,
  getOpenId,
  lottery,
  share,
  getSign,
} from "@/api/luckdraw.js";
import { messageToast } from "@/components/message";
import moment from "moment";
import { Toast } from "vant";
import wx from "weixin-js-sdk";
export default {
  name: "about",
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      // userId: this.$route.query.userId,
      userId: "zsc",
      params: {
        // id: this.$route.query.id,
        id: "1464168779213836288",
        openId: "",
      },
      model: {
        // id: this.$route.query.id,
        id: "1464168779213836288",
        code: "",
      },
      lottery: {
        // id: this.$route.query.id,
        id: "1464168779213836288", //活动id
        openId: "", //用户openId
      },
      share: {
        id: this.$route.query.id,
        openId: "",
      },
      getSign: {
        id: this.$route.query.id,
        url: "",
      },
      infoObj: {},
      freeze: false,
      rolling: false,
      wheelDeg: 0,
      prizeNumber: 8,
      prizeListOrigin: [],
    };
  },
  computed: {
    prizeList() {
      return this.prizeListOrigin.slice(0, this.prizeNumber);
    },
  },
  mounted() {
    // alert("获取用户身份失败！");
    if (localStorage.getItem("luckdraw-openId")) {
      this.params.openId = localStorage.getItem("luckdraw-openId");
    } else {
      this.getWxCode();
    }
    console.log(this.params.openId);
    setTimeout(() => {
      if (this.params.openId) {
        this._prizeInfo();
      }
    }, 500);
    this.share.openId = this.params.openId;
    this.sharePage();
    // this._share();
  },
  methods: {
    sharePage() {
      let timestamp = "";
      let nonceStr = "";
      let signature = "";
      this.getSign.url = location.href;
      let vm = this;
      getSign(this.getSign).then((res) => {
        // console.log(res);
        // timestamp = res.data.data.timestamp;
        // nonceStr = res.data.data.nonceStr;
        // signature = res.data.data.signature;
        wx.config({
          debug: false,
          appId: "wxb5cb5dd960997e7a",
          timestamp: res.data.data.timestamp,
          nonceStr: res.data.data.nonceStr,
          signature: res.data.data.signature,
          jsApiList: [
            "onMenuShareAppMessage",
            "onMenuShareTimeline",
            "onMenuShareWeibo",
            "onMenuShareQQ",
            "onMenuShareQZone",
          ],
        });
        wx.ready(function() {
          wx.checkJsApi({
            jsApiList: [
              "onMenuShareAppMessage",
              "onMenuShareTimeline",
              "onMenuShareWeibo",
              "onMenuShareQQ",
              "onMenuShareQZone",
            ],
          });
          var shareData = {
            title: "千里马转盘抽奖",
            desc: "千里马转盘抽奖-818直播活动",
            link: location.href,
            shareUrl: location.href,
            imgUrl: "https://i.postimg.cc/CMWQhvjR/share.jpg", //图片路径
          };
          wx.onMenuShareAppMessage({
            title: "千里马转盘抽奖",
            desc: "千里马转盘抽奖-818直播活动",
            link: location.href,
            shareUrl: location.href,
            imgUrl: "https://i.postimg.cc/CMWQhvjR/share.jpg", //图片路径
            success: function() {
              share(vm.share)
                .then((res) => {
                  vm.$router.go(0);
                })
                .then((res) => {
                  vm.$router.go(0);
                });
            },
          });
          wx.onMenuShareTimeline({
            title: "千里马转盘抽奖",
            desc: "千里马转盘抽奖-818直播活动",
            link: location.href,
            shareUrl: location.href,
            imgUrl: "https://i.postimg.cc/CMWQhvjR/share.jpg", //图片路径
            success: function() {
              share(vm.share)
                .then((res) => {
                  vm.$router.go(0);
                })
                .then((res) => {
                  vm.$router.go(0);
                });
            },
          });
          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareWeibo(shareData);
          wx.onMenuShareQQ(shareData);
          wx.onMenuShareQZone(shareData);
        });
      });
    },
    getWxCode() {
      if (isWechat()) {
        let appid = "wxb5cb5dd960997e7a"; //appid
        let code = getUrlParam("code"); //是否存在code
        let local =
          this.baseUrl +
          "/sevaloh5/luckdraw/" +
          "?id=" +
          this.model.id +
          "&userId=" +
          this.userId;
        if (code == null || code === "") {
          //不存在就打开上面的地址进行授权
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
            local
          )}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
        } else {
          console.log(code);
          // alert(`code: ${code}`);
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
          localStorage.setItem("luckdraw-openId", res.data.data);
          // alert(`获取到的openid: ${res.data.data}`);
          // this.$router.go(0);
          this.params.openId = res.data.data;
        } else {
          messageToast({
            message: "获取用户身份失败，请重新扫码！",
            duration: 3000,
          });
        }
      });
    },
    _prizeInfo() {
      this.params.openId = localStorage.getItem("luckdraw-openId");
      console.log(this.params);
      prizeInfo(this.params).then((res) => {
        // if (res.code == 0) {
        // console.log(res);
        // this.$router.go(0);
        Object.assign(this.infoObj, res.data.data);
        this.prizeListOrigin = res.data.data.rafflePrizes;
        console.log(res.data.data.exchangePrizes);
        // localStorage.setItem(
        //   "points",
        //   JSON.stringify(res.data.data.exchangePrizes)
        // );
        // localStorage.setItem(
        //   "integral",
        //   JSON.stringify(res.data.data.integral)
        // );
        console.log(this.prizeListOrigin);
        for (var i = this.prizeListOrigin.length + 1; i <= 8; i++) {
          this.prizeListOrigin.push({
            prizeName: "谢谢参与",
            prizeImg: "",
          });
        }
        // console.log(this.prizeListOrigin);
        // this.prizeListOrigin.sort(() => Math.random() - 0.5);
        this.prizeListOrigin.sort(() => (Math.random() > 0.5 ? -1 : 1));
        // console.log(this.prizeListOrigin);
      });
    },
    handleStart() {
      // console.log(infoObj.startDate);
      // if(infoObj.startDate)
      let start = moment(this.infoObj.startDate);
      let end = moment(this.infoObj.endDate);
      let now = moment().format("YYYY-MM-DD");
      if (now < start) {
        // Toast.fail("活动尚未开始，请耐心等待！");
        this.$dialog
          .alert({
            message: `活动尚未开始，请耐心等待！`,
            theme: "round-button",
          })
          .then(() => {
            this.$router.go(0);
          });
        return;
      }
      if (now > end) {
        // Toast.fail("活动已结束！");
        this.$dialog
          .alert({
            message: `活动已结束！`,
            theme: "round-button",
          })
          .then(() => {
            this.$router.go(0);
          });
        return;
      }
      if (this.rolling || !this.prizeListOrigin) {
        return;
      }
      if (this.infoObj.number == 0) {
        this.$dialog
          .alert({
            message: `抽奖次数为0，请分享获取抽奖机会！`,
            theme: "round-button",
          })
          .then(() => {
            this.$router.go(0);
          });
        return;
      }
      this.rolling = true;
      this.lottery.openId = localStorage.getItem("luckdraw-openId");
      console.log("抽奖次数：", this.infoObj.number);
      if (this.infoObj.number > 0) {
        lottery(this.lottery).then((res) => {
          console.log(res);
          if (res.data.code == "-1") {
            // Toast.fail("活动尚未开始，请耐心等待！");
            this.$dialog
              .alert({
                message: `活动尚未开始，请耐心等待！`,
                theme: "round-button",
              })
              .then(() => {
                this.$router.go(0);
              });
            return;
          }
          // console.log();
          // if (!res.data.data) {
          //   const { wheelDeg, prizeListOrigin } = this;
          //   const random = Math.floor(Math.random() * prizeListOrigin.length);
          //   console.log(random);
          //   this.wheelDeg =
          //     wheelDeg -
          //     (wheelDeg % 360) +
          //     6 * 360 +
          //     (360 - (360 / prizeListOrigin.length) * random);
          //   setTimeout(() => {
          //     this.$dialog
          //       .alert({
          //         message: `未获得奖品，感谢参与！`,
          //         theme: "round-button",
          //       })
          //       .then(() => {
          //         this.$router.go(0);
          //       });
          //   }, 4000);
          // }
          // console.log(res.data.data.prizeType);
          if (res.data.data?.prizeType == 1) {
            setTimeout(() => {
              this.$dialog
                .alert({
                  message: `恭喜获得${res.data.data.prizeName}，请到我的奖品查看！`,
                  theme: "round-button",
                })
                .then(() => {
                  this.$router.go(0);
                  // this.$router.push({
                  //   path: "/luckdraw/my-price",
                  //   query: {
                  //     id: this.model.id,
                  //   },
                  // });
                });
            }, 4000);
          } else if (res.data.data?.prizeType == 2) {
            setTimeout(() => {
              this.$dialog
                .alert({
                  message: `恭喜获得${res.data.data.prizeName}，请到我的奖品查看！`,
                  theme: "round-button",
                })
                .then(() => {
                  // this.$router.push({
                  //   path: "/luckdraw/my-price",
                  //   query: {
                  //     id: this.model.id,
                  //   },
                  // });
                  this.$router.go(0);
                });
            }, 4000);
          } else if (res.data.data?.prizeType == 3) {
            setTimeout(() => {
              this.$dialog
                .alert({
                  message: `恭喜获得${res.data.data.prizeName}，请到我的奖品查看！`,
                  theme: "round-button",
                })
                .then(() => {
                  // this.$router.push({
                  //   path: "/luckdraw/my-price",
                  //   query: {
                  //     id: this.model.id,
                  //   },
                  // });
                  this.$router.go(0);
                });
            }, 4000);
          }
          const LotteryResult = res.data.data?.id;
          const { wheelDeg, prizeListOrigin } = this;
          let random = null;
          if (LotteryResult) {
            random = this.prizeListOrigin.findIndex(
              (it) => it.id === LotteryResult
            );
          } else {
            const possiblyResIndexArr = [];
            this.prizeListOrigin.forEach((it, index) => {
              if (!it.id) possiblyResIndexArr.push(index);
            });
            random =
              possiblyResIndexArr[
                Math.floor(Math.random() * possiblyResIndexArr.length)
              ];
            setTimeout(() => {
              this.$dialog
                .alert({
                  message: `未获得奖品，感谢参与！`,
                  theme: "round-button",
                })
                .then(() => {
                  this.$router.go(0);
                });
            }, 4000);
          }
          this.wheelDeg =
            wheelDeg -
            (wheelDeg % 360) +
            6 * 360 +
            (360 - (360 / prizeListOrigin.length) * random);
        });
      }
    },
    onLotteryEnd() {
      this.rolling = false;
    },
    handleShare() {
      this.$router.push({
        path: "/luckdraw/share",
        query: {
          userId: this.userId,
          id: this.params.id,
        },
      });
    },
    handleMyPrice() {
      this.$router.push({
        path: "/luckdraw/my-price",
        query: {
          id: this.params.id,
        },
      });
    },
    handleMyPoints() {
      this.$router.push({
        path: "/luckdraw/my-points",
        query: {
          id: this.params.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@-webkit-keyframes rowup {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -307px, 0);
    transform: translate3d(0, -307px, 0);
  }
}

@keyframes rowup {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -307px, 0);
    transform: translate3d(0, -307px, 0);
  }
}
.container {
  font-size: 15px;
  background: #e1532c;
  min-width: 100vw;
  height: 100vh;
  overflow-y: auto;
  > img {
    width: 100%;
  }
  .share {
    background: rgba($color: #2797f3, $alpha: 0.8);
    padding: 2px 5px;
    width: 50px;
    box-sizing: border-box;
    border-radius: 20px 0 0 20px;
    position: absolute;
    right: 0;
    top: 20vh;
    color: #fff;
  }

  .wheel-wrapper {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    margin-top: -130px;
    .addChange {
      width: 200px;
      position: absolute;
      top: -30px;
      left: 50%;
      margin-left: -100px;
      color: #fff;
      background: rgba($color: #000, $alpha: 0.6);
      border-radius: 20px;
    }

    transform: translate(0%, 0%);
    .wheel-pointer {
      height: 120px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 43%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 60px;
      z-index: 10;
    }
    .wheel-bg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      transition: transform 4s ease-in-out;
      background-image: url("../..//assets/img/luckdraw/bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .prize-list {
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;

        .prize-item-wrapper {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 150px;

          .prize-item {
            width: 100%;
            height: 100%;
            transform-origin: bottom;
            .prize-name {
              padding: 6px 0;
              box-sizing: border-box;
              font-size: 14px;
              color: #9d5000;
              font-weight: bold;
              padding-top: 30px;
              font-weight: bolder;
            }
            .prize-icon {
              img {
                width: 40px;
                height: 40px;
              }
            }
          }
        }
      }
    }
    .freeze {
      transition: none;
    }
  }
  .btn {
    display: flex;
    justify-content: space-around;
    margin: 20px auto;
    color: #fff;
    .left {
      color: #76360c;
    }
    .left,
    .right {
      background-image: url("../../assets/img/luckdraw/btn1.png");
      width: 150px;
      height: 40px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      line-height: 40px;
      span {
        margin-left: 10px;
      }
    }
    .right {
      background-image: url("../../assets/img/luckdraw/btn2.png");
      background-repeat: no-repeat;
    }
  }
  .luck {
    width: 90%;
    margin: 20px auto;
    margin-top: 40px;
    position: relative;
    color: #fff;
    > img {
      width: 100%;
      position: relative;
    }
    .list {
      position: absolute;
      // bottom: 0;
      top: 55px;
      height: 200px;
      width: 280px;
      left: 50%;
      margin-left: -140px;
      overflow: hidden;

      .rowup {
        -webkit-animation: 30s rowup linear infinite normal;
        animation: 30s rowup linear infinite normal;
      }

      .item {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin-top: 10px;
        overflow: hidden;
        text-align: left;
        img {
          width: 30px;
          height: 30px;
          margin-right: 20px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
