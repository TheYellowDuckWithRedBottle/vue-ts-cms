<template>
  <div class="top-tool">
    <div class="collapse-wrap" @click="collapseMenuPanel">
      <font-awesome-icon icon="fa-solid fa-bars" />
      <!-- 靠右 -->
    </div>
    <div class="copy-coordinate">
      <font-awesome-icon icon="fa-solid fa-copy" />
        <div class="copy-panel">

        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    collapse: {
      default: true,
      type: Boolean
    }
  },
  setup(props, { emit }) {
    function collapseMenuPanel() {
      emit('collapse', true)
    }
    return {
      collapseMenuPanel
    }
  }
})
</script>

<style scoped lang="scss">
.top-tool {
  position: absolute;
  z-index: 2;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  background: #d9e7fd;
  display: flex;
  align-items: center;
  padding: 0 8px;

}
    .copy-coordinate {
    height: 100%;
    width: calc(100% - 25px);
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #428bca;
    font-weight: 600;
    position:relative;

  }
      .copy-panel {
      position: absolute;
      width: 500px;
      height: 300px;
    }
.collapse-wrap {
  color: #428bca;
  font-size: 20px;
  width: 25px;
}
.collapse-wrap:hover {
  cursor: pointer;
}
</style>
