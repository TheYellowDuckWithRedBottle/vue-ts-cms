<template>
  <div>{{ isChange }}</div>
  <div>{{ isChange2 }}</div>
  <div>{{ isChange3 }}</div>
  <button @click="changeName">改名</button>
</template>
<script setup lang="ts">
import { anyTypeAnnotation, objectExpression } from '@babel/types'
import { ref, isRef, shallowRef, triggerRef, customRef } from 'vue'
function MyRef<T>(value: T) {
  let timer: any
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newVal) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          console.log('出发了')
          value = newVal
          timer = null
          trigger()
        }, 500)
      }
    }
  })
}
function NewRef<T>(value: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set() {
        trigger()
      }
    }
  })
}
type M = {
  name: string
}
const isChange = ref<M>({
  name: '小明'
})
const isChange2 = shallowRef<M>({
  name: '校长'
})
const isChange3 = MyRef<string>('WANGL')
const myMenu = NewRef<string>('good')
const changeName = function () {
  isChange.value.name = 'nice'
  isChange2.value = { name: '王' }
  isChange3.value = 'nice'
  isChange3.value = 'good'
  console.log(isChange2)
}
// return {
//   isChange,
//   changeName
// }
</script>
<style scoped></style>
