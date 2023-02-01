<template>
  <div class="nav-top-bar">
    <div class="nav-sys">
      <div class="nav-avatar">
        <img src="@/assets/img/mlogo.png" alt="" />
      </div>
      <div class="nav-title">
        <strong>标题</strong>
      </div>
    </div>
    <!-- <testCom :lis="liDatas"></testCom> -->
    <div class="sys-user">
      <div class="sys-search">
        <input placeholder="搜索/功能" class="el-input" />
      </div>
      <div class="sys-login">
        <div class="user-icon">
          <font-awesome-icon icon="fa-solid fa-user" />
        </div>
        <span class="username">{{ username }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import testCom from './testCom.vue'
export default {
  components: {
    // testCom
  },
  setup() {
    let username = '匿名用户'
    let liDatas = [
      {name: '小米', age: 30},
      {name: '老白', age: 28},
      {name: '秀才', age: 28}
    ]
    const input1 = ref('')
    return {
      username,
      input1,
      liDatas
    }
  }
}
</script>

<style scoped>
.nav-top-bar {
  box-sizing: border-box;
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primary);
  color: var(--backgroundColor);
  padding: 10px;
}
.nav-sys {
  display: flex;
  height: 100%;
}
img {
  height: 100%;
  width: 100%;
}
span {
  display: flex;
  height: 100%;
  align-items: center;
}
.nav-title {
  height: 100%;
  font-size: 20px;
  padding-left: 8px;
  display: flex;
  align-items: center;
}
.sys-user {
  display: flex;
  height: 100%;
}
.sys-login {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 8px;
  font-size: 14px;
}
.user-icon {
  padding-right: 8px;
}
.sys-search {
  height: 100%;
  display: flex;
  align-items: center;
}

.el-input {
  display: block;
  height: 60%;
  width: 100%;
  border: 0px;
  padding-left: 8px;
  border-radius: 12px;
  background: #d9e7fd;
}
</style>
