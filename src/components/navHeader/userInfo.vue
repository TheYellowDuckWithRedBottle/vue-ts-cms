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
        currentIndex:'',
        treeData: [
          {name:'haha',num:1},
          {
            name:'dayjs',
            num:3,
            children:[
              {name:'haha',num:2},
              {name:'haha',num:3},
          ]},{
            name: 'bt',
            num:54,
            children:[
            {name:'main',num:32},
            {name:'test',num:32},
            {name: 'config',num: 34}
            ]
          },{
            name: 'destory',
            num:54,
            children:[]
          },
          {
            name: 'dom',
            num:54,
            children:[]
          },{
            name: 'define',
            num:57,
            children:[
            {
            name: 'differ',
            num:7,
            children:[
            {
            name: 'dns',
            num:52,
            }
            ]
          }
            ]
          }
        ]
      })

      const clickItem = (item) => {
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
