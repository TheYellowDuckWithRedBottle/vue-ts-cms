<template>
  <div class="angle-radian-container" v-if="dialogVisible">


  </div>
</template>

<script>
import { defineComponent, ref, toRefs, reactive } from 'vue'
export default defineComponent({
  props: {
  },
  setup(props, {emit}) {

    return {
    }
  }
})
</script>

<style lang="less">
.angle-radian-container {
  width: 200px;
  height: 150px;
}
</style>
