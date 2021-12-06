<template>
  <div class="share">
    <img src="@/assets/img/luckdraw/share1.png" alt="" />
    <div class="share_wrap">
      <img src="@/assets/img/luckdraw/share2.png" alt="" />
      <div class="share_info">
        <img
          style="width: 80px;height:80px;"
          v-for="item in urlList"
          :key="item"
          @click="showImg(urlList)"
          :src="item.url"
          alt=""
        />
        <div>
          <!-- <p class="name">周少冲</p> -->
          <p>点击放大识别此二维码添加企业微信获取抽奖机会！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shareQRCode } from "@/api/luckdraw";
import { ImagePreview } from "vant";
export default {
  name: "App",
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      params: {
        userId: this.$route.query.userId, //导购userId
        id: this.$route.query.id, //活动id
        openId: "", //用户openId
      },
      urlList: [
        {
          url: "",
        },
      ],
    };
  },
  mounted() {
    this.params.openId = localStorage.getItem("luckdraw-openId");
    this.getCode();
  },
  methods: {
    getCode() {
      shareQRCode(this.params).then((res) => {
        console.log(res);
        this.urlList[0].url = res.data.data;
      });
    },
    showImg(imgList) {
      let img = imgList.map((i) => {
        return i.url;
      });
      ImagePreview(img);
    },
  },
};
</script>
<style lang="scss" scoped>
.share {
  font-size: 15px;
  min-width: 100vw;
  background: #fff;
  > img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .share_wrap {
    width: 90%;
    margin: 0 auto;
    margin-top: 150px;
    // position: relative;
    img {
      width: 100%;
    }
    .share_info {
      display: flex;
      padding-right: 20px;
      width: 90%;
      margin: 0 auto;
      margin-top: 20px;
      align-items: center;
      margin-bottom: 20px;
      // position: absolute;
      // left: 10px;
      // bottom: 20px;
      // left: 10%;
      // margin-left: -40px;
      // color: #e1532c;

      img {
        // width: 80px !important;
        // height: 80px !important;
        margin-right: 20px;
      }
      div {
        .name {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
