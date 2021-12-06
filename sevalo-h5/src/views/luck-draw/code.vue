<template>
  <div class="my-address">
    <img src="@/assets/img/luckdraw/address.png" alt="" />
    <div class="main">
      <template v-for="(item, index) in list" :key="item.url">
        <img @click="showImg(list, index)" :src="item.url" alt="" />
      </template>
      <p style="margin-top:15px"><b>兑换码：</b>{{ info.id }}</p>
      <p style="margin-top:15px">
        <b>请凭兑换码进群领取</b>
        <!-- <b>活动群名称:</b> -->
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
      list: [
        {
          url: require("@/assets/img/luckdraw/code.jpg"),
        },
      ],
      info: {
        id: this.$route.query.id, //奖品ID
      },
    };
  },
  methods: {
    showImg(imgList, index) {
      console.log(imgList);
      // console.log(index);
      let img = imgList.map((i) => {
        return i.url;
      });
      ImagePreview(img, index);
    },
  },
};
</script>
<style lang="scss" scoped>
.my-address {
  font-size: 15px;
  min-width: 100vw;
  .main {
    width: 60%;
    margin: 30px auto;
    img {
      width: 100%;
    }
  }
  > img {
    width: 100%;
  }
}
</style>
