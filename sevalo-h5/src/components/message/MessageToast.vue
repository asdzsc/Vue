<template>
  <fade>
    <div id="textToast" v-show="visible">
      <div>{{ message }}</div>
    </div>
  </fade>
</template>

<script>
import {defineComponent} from 'vue';
import Fade from '@/components/Fade.vue';

export default defineComponent({
  name: 'MessageToast',
  components: {Fade},
  props: {
    message: String,
    visible: Boolean,
  },
});
</script>

<style scoped>
#textToast {
  width: 340px;
  position: fixed;
  top: 30vh;
  left: 17.5px;
  color: #fff;
  text-align: center;
  padding: 20px;
  background: rgba(0, 117, 194, 0.8);
  white-space: pre;
  font-size: 14Px;
}
</style>
