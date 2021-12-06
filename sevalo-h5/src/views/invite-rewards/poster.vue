<template>
  <div id="poster" class="poster" v-if="pageData">
    <template v-if="!canvasUrl">
      <div class="description-img-wrapper">
        <!--        <img :src="pageData.prizeUrl" alt="" @load="onImgLoad">-->
        <img :src="require('@/assets/img/invite-rewards/奖品说明.png')" alt="" @load="onImgLoad">
      </div>
      <div class="qrcode-card-wrapper">
        <div class="qr-code">
          <img :src="pageData.qrCode" alt="" @load="onImgLoad">
        </div>
        <div class="info">
          <div class="cell">
            <img class="icon" :src="require('@/assets/img/invite-rewards/company.png')" alt="" @load="onImgLoad">
            {{ pageData.corpName }}
          </div>
          <div class="cell" style="color: #bbb;font-size: 12Px">
            长按识别二维码添加企业微信
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <img class="printscreen" :src="canvasUrl" alt="">
      <div class="arrows"></div>
      <span class="tips">长按上图保存分享</span>
    </template>
  </div>
</template>

<script>
import {nextTick, ref} from "vue";
import html2canvas from "html2canvas";
import {useRoute} from "vue-router";
import {getShareCodeInfo} from "@/api/invite-rewards";
import {messageToast} from "@/components/message";

export default {
  name: "poster.vue",
  setup() {
    let imgReadyCount = 0
    const canvasUrl = ref('')
    let mask = document.createElement('div')
    Object.assign(mask.style, {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: '0',
      background: '#fff',
      zIndex: '999999'
    })
    console.log(mask)
    document.body.appendChild(mask)
    const onImgLoad = () => {
      imgReadyCount += 1
      if (imgReadyCount === 3) {
        imgReadyCount = 0
        html2canvas(document.getElementById('poster'), {useCORS: true}).then(canvas => {
          canvasUrl.value = canvas.toDataURL()
          nextTick(() => {
            mask.remove()
            mask = undefined
          })
        })
      }
    }
    const route = useRoute()
    const pageData = ref(null)
    const fetchData = () => {
      //1417416725896499200
      getShareCodeInfo({id: route.query.id, openId: localStorage.getItem('openId')}).then(res => {
        if (res.data.code !== '0') {
          messageToast({
            message: res.data.message,
            duration: 9999999999
          })
          return
        }
        pageData.value = res.data.data
        pageData.value.prizeUrl = `${process.env.VUE_APP_BASE_URL}/api/media/queryUrl/${res.data.data.prizeUrl}`
      }).catch(() => {
        messageToast({
          message: '加载失败：网络异常',
          duration: 9999999999
        })
      })
    }
    fetchData()
    return {
      canvasUrl, onImgLoad, pageData
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style/poster';

.printscreen {
  width: 100vw;
  height: auto;
}

.arrows {
  margin: 0 auto;
  width: 0;
  height: 0;
  border: 10px solid;
  border-color: transparent transparent #bbbbbb;
}

.tips {
  font-size: 14px;
}
</style>
