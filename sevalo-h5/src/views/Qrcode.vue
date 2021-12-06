<template>
  <div class="coupon-envelope">
    <div class="title" v-if="info.name">
      <p>恭喜你</p>
      <p>获得一个优惠券红包</p>
    </div>
    <div class="title" v-else style="padding-top: 100px"></div>
    <div class="qrcode">
      <img src="@/assets/img/pic2.png" alt="" />
      <div class="img" v-if="info.name">
        <p>【{{ info.name }}】</p>
        <template v-if="info.discountCode">
          <img
            :src="baseUrl + '/api/media/queryUrl/' + info.discountCode"
            alt=""
          />
        </template>
      </div>
      <div class="img" style="margin-top: 10px" v-else>来晚了，奖品已领完~</div>
    </div>
    <div class="desc" v-if="info.name">
      <p>长按或保存二维码至相册</p>
      <p>并识别进入商城领取使用吧</p>
    </div>
  </div>
</template>

<script>
import { receive } from "@/api/jthb.js";
export default {
  name: "Couponenvelope",
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      params: {
        id: this.$route.query.id,
        openId: this.$route.query.openId,
      },
      info: {
        name: "",
        discountCode: "",
      },
    };
  },
  mounted() {
    this._receive();
  },
  methods: {
    _receive() {
      receive(this.params).then((res) => {
        console.log(res);
        // Object.assign(this.info, res.data);
        if (res.data.code == 0) {
          this.$nextTick(() => {
            this.info.name = res.data.data.name;
            this.info.discountCode = res.data.data.discountCode;
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.coupon-envelope {
  font-size: 15px;
  background: url(../assets/img/page2.png) no-repeat top center/100% 100%;
  height: 100vh;
  width: 100%;
  .title {
    font-size: 20px;
    color: #fff;
    line-height: 30px;
    padding-top: 50px;
    text-align: center;
  }
  .qrcode {
    width: 280px;
    margin: 30px auto;
    position: relative;
    > img {
      width: 100%;
    }
    .img {
      width: 160px;
      position: absolute;
      left: 50%;
      margin-left: -80px;
      top: 50%;
      color: #fff;
      img {
        width: 128px;
        height: 128px;
        margin-top: 5px;
      }
    }
  }
  .desc {
    margin-top: 20px;
    line-height: 30px;
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
}
</style>
