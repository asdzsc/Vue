<template>
  <div class="my-price">
    <img src="@/assets/img/luckdraw/price.png" alt="" />
    <div class="title">
      <p>我的积分</p>
      <p class="num">{{ total ? total : 0 }}</p>
      <div @click="handleMyRecord">兑换记录</div>
    </div>
    <!-- <van-empty v-if="!list.length" description="暂无数据" /> -->
    <!-- v-else -->
    <div class="list">
      <div class="top">
        <img src="@/assets/img/luckdraw/sm.png" alt="" />
        点击右上角分享链接，获得更多积分
      </div>
      <div class="item" v-for="(item, index) in list" :key="item.id">
        <div class="left">
          <img
            @click="showImg(list, index)"
            :src="baseUrl + '/api/media/queryUrl/' + item.prizeImg"
            alt=""
          />
          <div class="item_name">
            <div>
              <p class="item_name_price">{{ item.prizeName }}</p>
              <p class="item_name_stock">库存:{{ item.inventory }}件</p>
            </div>
            <p class="item_name_points">所需积分:{{ item.integral }}</p>
          </div>
        </div>
        <div class="btn" @click="handleMyPoints(item)">兑换</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  myPrize,
  receive,
  prizeInfo,
  exchange,
  share,
  getSign,
} from "@/api/luckdraw";
import { Toast } from "vant";
import { ImagePreview } from "vant";
export default {
  name: "App",
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      params: {
        current: 1, //				页码
        pageSize: 99999, //条数
        id: this.$route.query.id, //活动ID
        type: "1", //奖品来源类型（0-活动抽奖；1-积分兑换）
        openId: "", //用户openId
      },
      model: {
        id: this.$route.query.id,
        // id: "1425458993844850688",
        openId: "",
      },
      getSign: {
        id: this.$route.query.id,
        url: "",
      },
      total: 0,
      list: [],
      cont: [],
    };
  },
  mounted() {
    this.params.openId = localStorage.getItem("luckdraw-openId");
    this.model.openId = localStorage.getItem("luckdraw-openId");
    this._prizeInfo();
    this.sharePage();
    // this.list = JSON.parse(localStorage.getItem("points"));
    // this.total = JSON.parse(localStorage.getItem("integral"));
    // console.log(this.total);
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
    getInfo() {
      myPrize(this.params).then((res) => {
        // console.log(res);
        // Object.assign(this.list, res.data.data.list);
        // this.total = res.data.data.integral;
      });
    },

    _prizeInfo() {
      // this.params.openId = localStorage.getItem("luckdraw-openId");
      console.log(this.params);
      prizeInfo(this.params).then((res) => {
        console.log(res);
        this.total = res.data.data.integral;
        this.list = res.data.data.exchangePrizes;
        // console.log(this.prizeListOrigin);
      });
    },
    showImg(imgList, index) {
      console.log(imgList);
      // console.log(index);
      let img = imgList.map((i) => {
        return this.baseUrl + "/api/media/queryUrl/" + i.prizeImg;
      });
      ImagePreview(img, index);
    },
    handleMyPoints(item) {
      console.log(item);
      console.log(item.integral);
      console.log(this.total);
      if (item.prizeType == 1) {
        if (item.integral <= this.total) {
          this.$router.push({
            path: "/luckdraw/my-address",
            query: {
              id: item.id,
            },
          });
        } else {
          // Toast.fail("积分不够，无法兑换该奖品！");
          setTimeout(() => {
            this.$dialog
              .alert({
                message: `积分不够，无法兑换该奖品！`,
                theme: "round-button",
              })
              .then(() => {
                this.$router.go(0);
              });
          }, 0);
        }
      } else {
        exchange({
          prizeId: item.id,
          openId: localStorage.getItem("luckdraw-openId"), //用户openId
          name: "11", //用户名称（兑换奖品为实物奖品，则必填）
          mobile: "22", //手机号（兑换奖品为实物奖品，则必填）
          address: "33", //地址（兑换奖品为实物奖品，则必填）
        }).then((res) => {
          this.$dialog
            .alert({
              message: `兑换成功`,
              theme: "round-button",
            })
            .then(() => {
              this.$router.go(0);
            });
        });
      }
    },
    handleMyRecord() {
      this.$router.push({
        path: "/luckdraw/my-record",
        query: {
          id: this.params.id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.my-price {
  font-size: 15px;
  min-width: 100vw;
  background: #f1e8e7;
  height: 100vh;
  overflow-y: auto;
  > img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .title {
    z-index: 999;
    text-align: center;
    position: relative;
    color: #ffffff;
    margin-top: 30px;
    .num {
      margin-top: 5px;
      font-size: 30px;
      margin-bottom: 10px;
    }
    div {
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      top: 10px;
      position: absolute;
      border-radius: 20px 0 0 20px;
      right: 0;
      background: rgba($color: #000000, $alpha: 0.5);
    }
  }
  .list {
    width: 90%;
    margin: 0 auto;
    background: #ffffff;
    border: 1px solid #e1532c;
    position: relative;
    box-shadow: 1px 1px #ef917b;
    border-radius: 15px;
    max-height: 80vh;
    overflow-y: auto;
    .top {
      // margin: 5px;
      padding: 20px;
      padding-bottom: 0;
      box-sizing: border-box;
      text-align: left;
      img {
        vertical-align: middle;
        margin-right: 5px;
        width: 20px;
        height: 20px;
      }
    }

    .item {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 20px;
      box-sizing: border-box;
      // align-items: center;
      align-items: flex-end;
      .left {
        display: flex;
        img {
          width: 100px;
          height: 85px;
          margin-right: 10px;
        }
        .item_name {
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 110px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .item_name_price {
            font-weight: bolder;
          }
          .item_name_stock {
            color: #666;
            font-size: 13px;
          }
          .item_name_points {
            color: #ef917b;
            font-size: 13px;
          }
        }
      }
      .btn {
        // background: #5c9eff;
        background-image: url("../../assets/img/luckdraw/btn4.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 60px;
        padding: 7px 0;
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        line-height: 10px;
      }
    }
  }
}
</style>
