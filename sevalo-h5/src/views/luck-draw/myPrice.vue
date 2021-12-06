<template>
  <div class="my-price">
    <img src="@/assets/img/luckdraw/price.png" alt="" />
    <div class="title">
      <p>我的奖品</p>
      <p class="num">{{ list.length }}个</p>
    </div>
    <van-empty v-if="!list.length" description="暂无数据" />
    <div class="list" v-else>
      <div class="item" v-for="(item, index) in list" :key="item.prizeImg">
        <div class="left">
          <img
            @click="showImg(list, index)"
            v-if="item.prizeType == 1"
            :src="baseUrl + '/api/media/queryUrl/' + item.prizeImg"
            alt=""
          />
          <img
            v-else-if="item.prizeType == 2"
            src="@/assets/img/luckdraw/jj.png"
            alt=""
          />
          <img
            v-else-if="item.prizeType == 2"
            src="@/assets/img/luckdraw/jj.png"
            alt=""
          />
          <img v-else src="@/assets/img/luckdraw/icon.png" alt="" />

          <div class="item_name">
            <p class="item_name_price">
              {{ item.prizeName }}
              <!-- <span v-if="item.prizeType == 1">实物</span> -->
              <!-- <span v-else-if="item.prizeType == 2">卡券</span> -->
              <!-- <span v-else>积分</span> -->
            </p>
            <!-- <p class="item_name_stock">库存</p> -->
          </div>
        </div>
        <div
          class="btn"
          v-if="item.prizeType == 1 && item.status == 0"
          @click="handleMyPrice(item)"
        >
          领取
        </div>
        <div
          class="btn"
          @click="handleMycoupon(item)"
          v-else-if="item.status == 1 && item.prizeType == 2"
        >
          已领取
        </div>
        <div
          class="btn"
          @click="handleMyaddress(item)"
          v-else-if="item.status == 1 && item.prizeType == 1"
        >
          已领取
        </div>
        <!-- <div class="btn" v-else @click="handleMyPoints(item)">
          兑换
        </div> -->
      </div>
      <!-- <div class="item">
        <div class="left">
          <img src="@/assets/img/luckdraw/price.png" alt="" />
          <div class="item_name">
            <p class="item_name_price">商品名称</p>
            <p class="item_name_stock">库存</p>
          </div>
        </div>
        <div class="btn" @click="$router.push('/luckdraw/my-address')">
          领取
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { myPrize } from "@/api/luckdraw";
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
        type: "0", //奖品来源类型（0-活动抽奖；1-积分兑换）
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
      // console.log(this.params);
      myPrize(this.params).then((res) => {
        // console.log(res);
        Object.assign(this.list, res.data.data.list);
        // console.log(this.list);
      });
    },
    showImg(imgList, index) {
      let img = imgList.map((i) => {
        return this.baseUrl + "/api/media/queryUrl/" + i.prizeImg;
      });
      ImagePreview(img, index);
    },
    handleMyPrice(item) {
      console.log(item);
      // if (item.inventory > 0) {
      this.$router.push({
        path: "/luckdraw/my-address",
        query: {
          id: item.id,
        },
      });
      // }
    },
    handleMyPoints(item) {
      if (item.prizeType == 1) {
        this.$router.push({
          path: "/luckdraw/my-points",
          query: {
            id: this.params.id,
          },
        });
      } else {
        this.$dialog
          .alert({
            message: "兑换成功！",
            theme: "round-button",
          })
          .then(() => {
            this.$router.go(0);
          });
      }
    },
    handleMycoupon(item) {
      console.log(item);
      this.$router.push({
        path: "/luckdraw/my-coupon",
        query: {
          id: item.prizeImg,
        },
      });
    },
    handleMyaddress(item) {
      console.log(item);
      this.$router.push({
        path: "/luckdraw/my-address",
        query: {
          id: item.id,
          address: item.address,
          name: item.name,
          mobile: item.mobile,
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
        align-items: center;
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
