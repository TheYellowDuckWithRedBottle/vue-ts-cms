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
    <div class="sys-user">
      <div class="sys-search">
        <input placeholder="搜索/功能" class="el-input" />
      </div>
      <div class="sys-login">
        <div class="user-icon">
          <input type="file" id="avatar" @change="changeUserAvatar" class="file-input" name="avatar" accept="image/png, image/jpeg" >
          <img :src=user.avatar alt="">
        </div>
        <span class="username">{{ user.username }}</span>
      </div>
    </div>
    <div class="user-avatar-dialog" v-if="showAvatarDialog" @click="showAvatarDialog = false">
      <div  class="avatar-dialog" >
        <div class="avatar-header">裁剪头像 </div>
        <div class="avatar-body">
          <img :src="user.avatar" alt="">
        </div>
        <div class="avatar-footer">
          <button class="avatar-btn" @click = "setNewAvatar">设置新头像</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref , computed, reactive} from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    // testCom
  },
  setup() {
    const store = useStore()
    const storeUser = computed(() => store.getters.getUser)
    const state = reactive({
      showAvatarDialog: false,
      user: {
        username: storeUser.value.username,
        avatar: storeUser.value.avatar
      }
    })
    const showAvatarDialog = ref(false)
    function changeUserAvatar (value:any) {
      //1.打开form对话框，选择图片
      showAvatarDialog.value = true
      // 2.将图片转换为base64
      const file = value.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      try {
        reader.onload = function (e) {
          state.user.avatar = e.target?.result
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    function setNewAvatar () {
      console.log('state.user', state.user)
      store.dispatch('setUserAvatar', state.user)
      showAvatarDialog.value = false
    }
    return {
      ...state,
      showAvatarDialog,
      changeUserAvatar,
      setNewAvatar
    }
  }
}
</script>

<style scoped lang="less">
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
  .user-avatar-dialog {
    // 垂直水平居中
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    .avatar-dialog {
      position: absolute;
      width: 30%;
      height: 60%;
      top: 50%;
      left: 50%;
      font-weight: bold;
      transform: translate(-50%, -50%);
      border-radius: var(--borderRadius-medium);
      background-color: var(--background-white);
      .avatar-header {
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid var(--heading-color);
        display: flex;
        justify-content: space-between;
        padding: 16px;
        color: var(--heading-color)
      }
      .avatar-body {
        box-sizing: border-box;
        width: 100%;
        height: calc(100% - 115px);
        padding: 16px;
        overflow: hidden;
      }
      .avatar-footer {
        box-sizing: border-box;
        width: 100%;
        height: 65px;
        border-top: 1px solid var(--heading-color);
        display: flex;
        justify-content: flex-end;
        padding: 16px;
        color: var(--heading-color);
        .avatar-btn {
          display: inline-block;
          color: var(--background-white);
          border: 1px solid #fff; 
          border-radius: var(--borderRadius-medium);
          background-color: var(--color-primary);
          width: 100%;
          cursor: pointer;
        }
      }
    }

  }
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
  span {
    cursor: pointer;
  }
}
.user-icon {
  width: 25px;
  height: 25px;
  position: relative;;
  .file-input {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
    // z-index: 1;
    background: navajowhite;
  }
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
