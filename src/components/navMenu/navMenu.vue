<template>
  <div class="navMenu-layout">
    <div class="nav-title">
      <img src="~@/assets/img/logo.svg" alt="" />
      <span>vue3 + ts</span>
    </div>
    <div class="nav-content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.navMenu-layout {
  padding-top: 10px;
  height: calc(100% - 10px);
  .nav-title {
    height: 5%;
    display: flex;
    justify-content: center;
  }
  img {
    height: 24px;
    width: 24px;
  }
}
</style>
