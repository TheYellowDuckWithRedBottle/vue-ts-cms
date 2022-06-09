<template>
  <div class="header-container">
    <i
      class="fold-menu"
      :class="isFolder ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="changeFolder"
    ></i>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
export default {
  setup(props, { emit }) {
    let isFolder = ref(false)
    const changeFolder = (e) => {
      isFolder.value = !isFolder.value
      emit('changeFolder', isFolder.value)
    }
    return {
      isFolder,
      changeFolder
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  vertical-align: middle;
}
.fold-menu {
  font-size: 24px;
}
</style>
