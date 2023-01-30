<template>
  <div>
    我是测试子组件
    <div v-for="(item, index) in lis" :key="index" @click="clickItem(item)" :class="currentIndex===item.name?'active':''">
      {{item.name}}
    </div>

  </div>
</template>

<script>
import { ref,toRefs,reactive,defineComponent } from 'vue'
export default defineComponent({
  props: {
    lis: {
      type: Array,
      default: ()=>[]
    }
  },
    setup(props) {
      let reacLis = reactive(props.lis)
      let state = reactive({
        currentIndex:''
      })

      const clickItem = (item) => {
        debugger
        state.currentIndex = item.name
      }
      return {...toRefs(state),clickItem,reacLis}
    }

})
</script>

<style>
.active {
  color: red
}
</style>
