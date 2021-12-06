<template>
  <div class="my-address">
    <img src="@/assets/img/luckdraw/address.png" alt="" />
    <!-- <div class="main">
      <template v-for="(item, index) in list" :key="item.url">
        <img @click="showImg(list, index)" :src="item.url" alt="" />
      </template>
      <p style="margin-top:15px"><b>818千里马转盘抽奖奖品兑换群</b></p>
    </div> -->
    <div class="form-wrapper">
      <div class="input-wrapper">
        <span>姓名：</span>
        <input v-model="formState.name" type="text" placeholder="请输入姓名" />
      </div>
      <div class="input-wrapper">
        <span>手机号：</span>
        <input
          v-model="formState.mobile"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div class="input-wrapper">
        <span>收货地址:</span>
        <input
          v-model="formState.address"
          type="text"
          placeholder="请输入收货地址"
        />
      </div>
    </div>
    <div class="btn">
      <van-button type="primary" round size="large" @click="submit"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import { exchange, receive } from "@/api/luckdraw";
import { Toast } from "vant";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      list: [
        {
          url: require("@/assets/img/luckdraw/code.jpg"),
        },
      ],
      baseUrl: process.env.VUE_APP_BASE_URL,
      formState: {
        address: "",
        mobile: "",
        name: "",
      },
      exchange: {
        prizeId: this.$route.query.id, //奖品ID
        openId: "", //用户openId
        name: "", //用户名称（兑换奖品为实物奖品，则必填）
        mobile: "", //手机号（兑换奖品为实物奖品，则必填）
        address: "", //地址（兑换奖品为实物奖品，则必填）
      },
      receive: {
        id: this.$route.query.id, //领取奖品ID
        name: "", //用户名称
        mobile: "", //手机号
        address: "", //地址
      },
    };
  },
  mounted() {
    this.exchange.openId = localStorage.getItem("luckdraw-openId");
    // if (this.$router.options.history.state.back.indexOf("my-points") > -1) {
    //   console.log("ss");
    // }
    if (this.$route.query.address) {
      this.formState.address = this.$route.query.address;
      this.formState.mobile = this.$route.query.mobile;
      this.formState.name = this.$route.query.name;
    }
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
    submit() {
      if (this.$router.options.history.state.back.indexOf("my-points") > -1) {
        this.exchange.name = this.formState.name;
        this.exchange.mobile = this.formState.mobile;
        this.exchange.address = this.formState.address;
        exchange(this.exchange).then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            let vm = this;
            // setTimeout(() => {
            vm.$dialog
              .alert({
                message: `兑换成功！`,
                theme: "round-button",
              })
              .then(() => {
                // console.log(this);
                // console.log(item);
                vm.$router.push({
                  path: "/luckdraw/my-code",
                  query: {
                    id: vm.$route.query.id,
                  },
                });
                vm.formState.name = "";
                vm.formState.mobile = "";
                vm.formState.address = "";
                // this.$router.go(-1);
              });
            // }, 2000);
          } else if (res.data.code == -1) {
            this.$dialog
              .alert({
                message: `奖品库存已兑完！`,
                theme: "round-button",
              })
              .then(() => {
                this.$router.go(-1);
              });
          } else {
            setTimeout(() => {
              this.$dialog
                .alert({
                  message: `积分不够，无法兑换该奖品！`,
                  theme: "round-button",
                })
                .then(() => {
                  this.$router.go(-1);
                });
            }, 2000);
          }
        });
      } else {
        this.receive.name = this.formState.name;
        this.receive.mobile = this.formState.mobile;
        this.receive.address = this.formState.address;
        receive(this.receive).then((res) => {
          if (res.data.code == 0) {
            // setTimeout(() => {
            let vm = this;
            vm.$dialog
              .alert({
                message: `领取成功！`,
                theme: "round-button",
              })
              .then(() => {
                vm.$router.push({
                  path: "/luckdraw/my-code",
                  query: {
                    id: vm.$route.query.id,
                  },
                });
                vm.formState.name = "";
                vm.formState.mobile = "";
                vm.formState.address = "";
                // this.$router.go(-1);
              });
            // }, 0);
          } else {
            // setTimeout(() => {
            this.$dialog
              .alert({
                message: `领取失败！`,
                theme: "round-button",
              })
              .then(() => {
                this.$router.go(-1);
              });
            // }, 2000);
          }
        });
      }
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
  input::-webkit-input-placeholder {
    color: #999999;
  }
  .form-wrapper {
    padding: 0 40px;

    .btn {
      margin-top: 30px;
      width: 100%;
    }

    .input-wrapper {
      // border-radius: 8px;
      // border: 1px solid #000000;
      border-bottom: 1px solid #cccccc;
      line-height: 30px;
      display: flex;
      align-items: center;
      padding: 8px;
      text-align: left;
      margin-bottom: 14px;
      span {
        min-width: 80px;
      }

      .label {
        width: 20px;
        height: 20px;
      }

      input {
        margin-left: 10px;
        background: none;
        outline: none;
        border: 0;
        font-size: 14px;
      }
    }
  }
  .btn {
    width: 70%;
    margin: 20px auto;
    margin-top: 100px;
  }
}
</style>
