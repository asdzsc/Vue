<template>
  <div class="page-wrapper">
    <div class="description-img-wrapper">
      <img :src="require('@/assets/img/invite-rewards/gift-img.png')" alt="">
    </div>
    <div class="form-wrapper">
      <div class="input-wrapper">
        <img :src="require('@/assets/img/invite-rewards/kefu.png')" alt="" class="label">
        <input v-model.trim="formState.receiver" type="text" placeholder="请输入姓名">
      </div>
      <div class="input-wrapper">
        <img :src="require('@/assets/img/invite-rewards/phone.jpg')" alt="" class="label">
        <input v-model.trim="formState.phone" type="text" placeholder="请输入手机号">
      </div>
      <div class="input-wrapper">
        <img :src="require('@/assets/img/invite-rewards/address.jpg')" alt="" class="label">
        <input v-model.trim="formState.address" type="text" placeholder="请输入地址">
      </div>
      <img class="btn" :src="require('@/assets/img/invite-rewards/get-gift-btn.jpg')" alt="" @click="onSubmit">
    </div>
  </div>
</template>

<script>
import {reactive, ref} from 'vue'
import {messageToast} from "@/components/message";
import {submitAddressToGift} from "@/api/invite-rewards";
import {useRoute, useRouter} from "vue-router";

export default {
  name: "GetGift",
  setup() {
    const formState = reactive({address: '', phone: '', receiver: ''})
    let submitLoading = false
    const router = useRouter();
    const route = useRoute();
    const onSubmit = () => {
      if (submitLoading) return
      if (formState.address && formState.phone && formState.address) {
        submitLoading = true
        submitAddressToGift({...formState, inviteId: route.query.id, openId: localStorage.getItem('openId')}).then((res) => {
          if (res.data.code !== '0') {
            submitLoading = false
            messageToast({
              message: res.data.message,
              duration: 3000,
            })
            return
          }
          messageToast({
            message: '提交成功',
            duration: 3000
          })
          router.replace({name: 'InviteRewards', query: {...route.query}})
        }).catch(() => {
          submitLoading = false
          messageToast({
            message: '提交失败',
            duration: 3000,
          })
        })
      } else {
        messageToast({
          message: '请完善表单表内容',
          duration: 3000,
        })
      }
    }
    return {
      formState, onSubmit, submitLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: url("~@/assets/img/invite-rewards/get-gift-header.jpg") no-repeat top;
  width: 375px;
  background-size: 100%;
  min-height: 100vh;
  position: relative;
}

.description-img-wrapper {
  padding-top: 140px;
  width: 375px;
  text-align: center;

  img {
    width: 250px;
    height: auto;
  }
}

.form-wrapper {
  position: absolute;
  bottom: 20px;
  padding: 0 40px;

  .btn {
    margin-top: 30Px;
    width: 100%;
  }

  .input-wrapper {
    border-radius: 8px;
    border: 1px solid #000000;
    line-height: 30px;
    display: flex;
    align-items: center;
    padding: 8px;
    margin-bottom: 14px;

    .label {
      width: 20px;
      height: 20px;
    }

    input {
      margin-left: 10px;
      background: none;
      outline: none;
      border: 0;
      font-size: 14Px;
    }
  }
}

</style>
