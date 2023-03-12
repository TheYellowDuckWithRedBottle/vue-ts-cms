<template>
  <div class="angle-radian-container" v-if="dialogVisible">
    <div>
      <span>经纬度：</span>
      <el-input v-model="position" @change="onChangePosition" placeholder="请输入经纬度" style="width: 100px;"></el-input>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, reactive, onMounted, getCurrentInstance } from 'vue'
export default defineComponent({
  props: {
  },
  setup(props, {emit}) {
    let map,L
    onMounted(() => {
      const instance = getCurrentInstance()
      map = instance.appContext.config.globalProperties.$map
      L = instance.appContext.config.globalProperties.$L =  L
    })
    let state = reactive({
      tabs: ['度','度分秒'],
      position: ''
    })
    function onChangePosition(value) {
      console.log(state.position)

      map.setView(state.position.split(','), 18)
    }

    return {
      ...toRefs(state),
      onChangePosition
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
