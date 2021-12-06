<template>
  <div class="poster" v-if="pageData">
    <div class="description-img-wrapper">
      <!--        <img :src="pageData.prizeUrl" alt="" @load="onImgLoad">-->
      <img
        :src="
          pageData.prizeUrl ||
            require('@/assets/img/invite-rewards/奖品说明.png')
        "
        alt=""
        @load="onImgLoad"
      />
    </div>
    <div class="qrcode-card-wrapper">
      <div class="qr-code">
        <img :src="pageData.qrCode" alt="" @load="onImgLoad" />
      </div>
      <div class="info">
        <div class="cell">
          <img
            class="icon"
            :src="require('@/assets/img/invite-rewards/company.png')"
            alt=""
            @load="onImgLoad"
          />
          {{ pageData.corpName }}
        </div>
        <div class="cell" style="color: #bbb;font-size: 12Px">
          长按识别二维码添加企业微信
        </div>
      </div>
    </div>
    <div class="my-invite-card-wrapper">
      <template v-for="item in pageData.customerList" :key="item.id">
        <div class="user-item">
          <img
            class="avatar"
            :src="
              item.avatar ||
                require('@/assets/img/invite-rewards/plus-icon.png')
            "
            alt=""
          />
          <p>{{ item.nickName || "邀请好友" }}</p>
        </div>
      </template>
    </div>
    <div class="tips">
      <div>说明：</div>
      <div class="content">
        请点击邀请好友按钮，将生成的分享卡片发送给好友，好友通过分享卡片扫码添加后才记为我的邀请。
      </div>
    </div>
    <div class="bottom">
      <img
        :src="require('@/assets/img/invite-rewards/share-btn.png')"
        alt=""
        class="btn"
        @click="onShareBtnClick"
      />
      <img
        :src="require('@/assets/img/invite-rewards/get-btn.png')"
        alt=""
        class="btn"
        @click="onGetBtnClick"
      />
    </div>
    <img class="printscreen" :src="canvasUrl" alt="" />
  </div>
</template>

<script>
import { messageToast } from "@/components/message";
import html2canvas from "html2canvas";
import { computed, onMounted, ref, watch } from "vue";
import {
  getInviteCodeInfo,
  getShareCodeInfo,
  inviteModuleGetOpenId,
} from "@/api/invite-rewards";
import { useRoute, useRouter } from "vue-router";
import { tryLogin } from "@/utils/try-login";

export default {
  data() {
    return {
      canvasUrl: "",
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const pageData = ref(null);
    const fetchData = () => {
      //1416688206346326016
      getInviteCodeInfo({
        id: route.query.id,
        openId: localStorage.getItem("openId"),
      })
        .then((res) => {
          if (res.data.code !== "0") {
            messageToast({
              message: res.data.message,
              duration: 9999999999,
            });
            return;
          }
          pageData.value = res.data.data;
          pageData.value.prizeUrl = `${process.env.VUE_APP_BASE_URL}/api/media/queryUrl/${res.data.data.prizeUrl}`;
          const difference =
            pageData.value.rewardRule - pageData.value.customerList.length;
          if (difference) {
            for (let i = 0; i < difference; i++) {
              pageData.value.customerList.push({});
            }
          }
        })
        .catch(() => {
          messageToast({
            message: "加载失败",
            duration: 9999999999,
          });
        });
    };
    const loginFn = async (code) => {
      const res = await inviteModuleGetOpenId({ id: route.query.id, code });
      if (res.data.code !== "0") {
        throw new Error("登录失败");
      }
      return res.data.data;
    };
    onMounted(async () => {
      await tryLogin(loginFn);
      fetchData();
    });
    const onShareBtnClick = () => {
      const difference =
        pageData.value.rewardRule -
        pageData.value.customerList.filter((it) => it.id).length;
      if (difference === 0) {
        messageToast({
          message: "您已经达成目标，无需继续分享",
          duration: 3000,
        });
        return;
      }
      router.push({
        name: "InviteRewardsSharePage",
        query: { ...route.query },
      });
    };
    const onGetBtnClick = () => {
      const difference =
        pageData.value.rewardRule -
        pageData.value.customerList.filter((it) => it.id).length;
      if (difference > 0)
        messageToast({
          message: "不满足领取条件，\n请继续邀请好友吧",
          duration: 3000,
        });
      else if (pageData.value.submit === 1) {
        messageToast({
          message: "您已经提交过领取联系地址啦",
          duration: 3000,
        });
      } else {
        router.push({
          name: "InviteRewardsGetGift",
          query: { ...route.query },
        });
      }
    };
    return { pageData, onShareBtnClick, onGetBtnClick };
  },
};
</script>

<style lang="scss" scoped>
@import "./style/poster";

.my-invite-card-wrapper {
  @include content-block;
  background: url("~@/assets/img/invite-rewards/invite-c.jpg") no-repeat top
    left;
  background-size: 60px 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  padding: 10px 20px 20px 40px;
  border-radius: 10px;
  border: 1px solid #0075c2;

  .user-item {
    text-align: center;
    font-size: 13px;
    margin-top: 10px;
    width: 25%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      overflow: hidden;
    }
  }

  &:after {
    content: " ";
    flex-grow: 999999;
  }
}

.tips {
  @include content-block;
  padding: 0 20px;
  text-align: left;
  margin-top: 8px;
  display: flex;
  font-size: 12px;

  .content {
    flex: 1;
  }
}

.bottom {
  @include content-block;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 20px;

  .btn {
    width: 150px;
    height: auto;
  }
}
</style>
