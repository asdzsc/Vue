<template>
  <div class="my-coupon">
    <img src="@/assets/img/luckdraw/coupon.png" alt="" />
    <!-- <div class="info">
      <div class="left">
        <p class="num"><span>￥</span>20</p>
        <p>满100可用</p>
      </div>
      <div class="right">
        <p class="name">优惠券名称</p>
        <p>有效期2021/10/31</p>
      </div>
    </div> -->
    <div class="code">
      <!-- <img :src="baseUrl + '/api/media/queryUrl/' + url" alt="" /> -->
      <img
        v-for="item in urlList"
        :key="item"
        @click="showImg(urlList)"
        :src="baseUrl + '/api/media/queryUrl/' + item.url"
        alt=""
      />
      <p>
        点击放大识别此二维码 <br />
        兑换使用
      </p>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "App",
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      // url: this.$route.query.id, //活动ID
      urlList: [
        {
          url: this.$route.query.id,
        },
      ],
    };
  },
  mounted() {
    console.log(this.$route.query.id);
    this.urlList[0].url = this.$route.query.id;
  },
  methods: {
    showImg(imgList) {
      let img = imgList.map((i) => {
        console.log(i);
        return this.baseUrl + "/api/media/queryUrl/" + i.url;
      });
      ImagePreview(img);
    },
  },
};
</script>
<style lang="scss" scoped>
.my-coupon {
  font-size: 15px;
  min-width: 100vw;
  > img {
    width: 100%;
  }
  .info {
    height: 100px;
    width: 90%;
    margin: 10px auto;
    background-image: url("../../assets/img/luckdraw/coupon1.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    text-align: left;
    .left {
      .num {
        font-size: 30px;
        color: #ffffff;
        span {
          font-size: 14px;
        }
      }
      p {
        color: #fce76e;
      }
    }
    .right {
      color: #666666;
      .name {
        font-weight: bolder;
        color: #000;
      }
    }
  }
  .code {
    width: 230px;
    margin: 50px auto;
    margin-top: 100px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
    p {
      margin-top: 20px;
    }
  }
}
</style>
