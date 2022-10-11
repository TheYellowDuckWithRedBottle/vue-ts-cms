<template>
  <div class="top-tool">
    <div class="collapse-wrap" @click="collapseMenuPanel">
      <font-awesome-icon icon="fa-solid fa-bars" />
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

<style scoped>
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
.collapse-wrap {
  color: #428bca;
  font-size: 20px;
}
.collapse-wrap:hover {
  cursor: pointer;
}
</style>
