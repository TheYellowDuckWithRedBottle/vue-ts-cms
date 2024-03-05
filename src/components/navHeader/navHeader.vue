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
    <div class="user-avatar-dialog" v-if="showAvatarDialog" @click="showAvatarDialog=false">
      <div  class="avatar-dialog" @click.stop="clickAvatar">
        <div class="avatar-header">裁剪头像 </div>
        <div class="avatar-body">
          <div class="crop-box-container" style="width: 100%;height:100%;position:relative">
            <img :src="user.avatar" id="avatarImage" ref="cropImage"  alt="">
          </div>
        </div>
        <div class="avatar-footer">
          <button class="avatar-btn" @click = "setNewAvatar">设置新头像</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref , computed, reactive, watch, onMounted} from 'vue'
import { useStore,mapState  } from 'vuex'
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  components: {
  },
  setup() {
    const store = useStore()
    const storeUser = computed(() => store.getters.getUser)
    const state = reactive({
      showAvatarDialog: false,
      user: {
        username: storeUser.value.username,
        avatar: storeUser.value.avatar
      },
    })
    onMounted(() => {
      console.log('storeUser', storeUser)
      state.user = {
        username: storeUser.value.username,
        avatar: storeUser.value.avatar
      }
    })
    watch(() => store.state.user, (newVal, oldVal) => {
      state.user = {
        username: newVal.username,
        avatar: 'data:image/png;base64,'+newVal.avatar
      }
      console.log('state.user', state.user)
    });
    const cropImage = ref(null)
    let cropper = null
    const showAvatarDialog = ref(false)
    function changeUserAvatar (value) {
      //1.打开form对话框，选择图片
      showAvatarDialog.value = true
      // 2.将图片转换为base64
      const file = value.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      try {
        reader.onload = function (e) {
          state.user.avatar = e.target?.result
          const image = document.getElementById('avatarImage')
          image.src = e.target?.result
          cropper = new Cropper(image, {
            viewMode:3,
            dragMode: 'move',
            aspectRatio: 1/1,
            initialAspectRatio: 1,
            autoCrop: 0.6,
            movable: true,
            rotatable: true
          });
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    function setNewAvatar () {
      cropper.getCroppedCanvas().toBlob((blob) => {
        const user = {
          username: state.user.username,
          avatar: ''
        }
        const reader = new FileReader();
        // 监听读取完成事件
        reader.onloadend = function() {
          // 获取Base64字符串（去掉前缀）
          const base64String = reader.result.split(',')[1];
          console.log(base64String);
          user.avatar = base64String
          store.dispatch('setUserAvatar', user)
          showAvatarDialog.value = false
        };
        reader.readAsDataURL(blob)
      })
    }
    function clickAvatar () {
      showAvatarDialog.value = true
    }
    return {
      ...state,
      showAvatarDialog,
      cropImage,
      changeUserAvatar,
      setNewAvatar,
      clickAvatar,
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
        .crop-box-container {
          width: 100%;
          height: 100%;
          position: relative;
          .crop-box {
            position: absolute;
            overflow: hidden;
            top:0px;
            left: 0px;
            width: 100%;
            height: 100%;
            aspect-ratio: 1 / 1;

            .crop-box-inner {
              position: absolute;
              padding: 4px;
            }
            .crop-box-inner::before{
              position: absolute;
              display: block;
              padding: 4px;
              border-radius: 50%;
              transform: translate(-50%, -50%);
              content: '';
              background: #fff;
              border: 1px solid #767676;
            }
            .nw {
              top: 0;
              left: 0;
              cursor:nw-resize;
            }
            .ne {
              top:0;
              right: 0;
              cursor:ne-resize;
            }
            .sw {
              bottom: 0;
              left: 0;
              cursor:sw-resize;
            }
            .se {
              bottom: 0;
              right: 0;
              cursor:se-resize;
            }
          }
        }
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
