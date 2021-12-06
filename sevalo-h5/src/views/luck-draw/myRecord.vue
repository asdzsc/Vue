<template>
  <div class="my-price">
    <img src="@/assets/img/luckdraw/price.png" alt="" />
    <div class="title">
      <p>兑换记录</p>
      <p class="num">{{ list.length }}</p>
      <!-- <div @click="$router.push('/luckdraw/my-record')">兑换记录</div> -->
    </div>
    <van-empty v-if="!list.length" description="暂无数据" />
    <div class="list" v-else>
      <div class="item" v-for="(item, index) in list" :key="item.id">
        <div class="left">
          <img
            @click="showImg(list, index)"
            :src="baseUrl + '/api/media/queryUrl/' + item.prizeImg"
            alt=""
          />
          <div class="item_name">
            <p class="item_name_price">{{ item.prizeName }}</p>
            <!-- <p class="item_name_stock">库存：{{ item.inventory }}</p> -->
            <p class="item_name_points">所需积分:{{ item.integral }}</p>
          </div>
        </div>
        <div class="btn" @click="handleMyaddress(item)">已兑换</div>
      </div>
    </div>
  </div>
</template>

<script>
import { myPrize, receive } from "@/api/luckdraw";
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
      list: [],
    };
  },
  mounted() {
    this.params.openId = localStorage.getItem("luckdraw-openId");
    this.getInfo();
  },
  methods: {
    getInfo() {
      myPrize(this.params).then((res) => {
        // console.log(res);
        Object.assign(this.list, res.data.data.list);
        // this.total = res.data.data.integral;
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
    handleMyaddress(item) {
      if (item.prizeType == 1) {
        this.$router.push({
          path: "/luckdraw/my-code",
          query: {
            id: item.id,
          },
        });
      } else {
        this.$router.push({
          path: "/luckdraw/my-coupon",
          query: {
            id: item.prizeImg,
          },
        });
      }
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
        background: #5c9eff;
        border-radius: 10px;
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
