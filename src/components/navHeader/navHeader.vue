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
            <img :src="user.avatar" ref="cropImage"  alt="">
            <div class="crop-box">
              <div class="crop-outline" ref="cropBox" style="background-color: rgba(255, 255, 255, 0.5); cursor:move" @mousedown="clickCropBox($event)" @mousemove="moveBox($event)" @mouseup="stopCropBox($event)"></div>
              <div class="crop-box-inner nw" ref="nw" @mousedown="mouseStartHandle($event, 'nw')" @mousemove="mouseMoveHandle($event, 'nw')" @mouseup="mouseupHandle($event, 'nw')"></div>
              <div class="crop-box-inner ne" ref="ne" @mousedown="mouseStartHandle($event, 'ne')" @mousemove="mouseMoveHandle($event, 'ne')" @mouseup="mouseupHandle($event, 'ne')"></div>
              <div class="crop-box-inner sw" ref="sw" @mousedown="mouseStartHandle($event, 'sw')" @mousemove="mouseMoveHandle($event, 'sw')" @mouseup="mouseupHandle($event, 'sw')"></div>
              <div class="crop-box-inner se" ref="se" @mousedown="mouseStartHandle($event, 'se')" @mousemove="mouseMoveHandle($event, 'se')" @mouseup="mouseupHandle($event, 'se')"></div>
            </div>
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
import { ref , computed, reactive} from 'vue'
import { useStore } from 'vuex'
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
    let startTouch = ref(false)
    let moveCropBox = ref(false)
    const cropImage = ref(null)
    const nw= ref(null)
    const ne= ref(null)
    const sw= ref(null)
    const se= ref(null)
    const cropBox = ref(null)
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
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    function setNewAvatar () {
      store.dispatch('setUserAvatar', state.user)
      showAvatarDialog.value = false
    }
    function clickAvatar () {
      showAvatarDialog.value = true
    }
    // 点击四个边角
    function mouseStartHandle (event, direction) {
      startTouch.value = true
      console.log(event, direction)
    }
    function mouseMoveHandle (event,direction) {
      if(startTouch.value) {
        if (cropImage.value && cropImage.value) {
          const dom = (cropImage.value)
          const domRect = dom.getBoundingClientRect()
          const originX = domRect.x // dom的x坐标
          const originY = domRect.y // dom的y坐标
          console.log('原点', originX,originY)
          const width = domRect.width  // dom的宽度
          const height = domRect.height // dom的高度
          switch (direction) {
            case 'nw':
                if (event.x > originX && event.y > originY) {
                  if (event.x < originX + width && event.y < originY + height) {
                    console.log('鼠标点', event.x,event.y)
                    // 移动
                    const distanceX = event.x - originX
                    const distanceY = event.y - originY
                    nw.value.style.left = distanceX + 'px'
                    nw.value.style.top = distanceY + 'px'
                    // 设置cropBox
                    cropBox.value.style.left = distanceX + 'px'
                    cropBox.value.style.top = distanceY + 'px'
                    cropBox.value.style.bottom = 0 + 'px'
                    cropBox.value.style.right = 0 + 'px'
                    cropBox.value.style.position = 'absolute'
                    cropBox.value.style.width = width - distanceX + 'px'
                    cropBox.value.style.height = height - distanceY + 'px'

                    ne.value.style.top = distanceY + 'px'// 右上角的点也要变化
                    sw.value.style.left = distanceX + 'px' // 左下角也要变化
                    console.log('nw', nw.value.style.left,nw.value.style.top)
                  }
                } else {
                  startTouch.value = false
                }
              break
            case 'ne':
              if (event.x > originX && event.y > originY) {
                if (event.x < originX + width && event.y < originY + height) {
                  console.log('鼠标点', event.x,event.y)
                  // 移动
                  const distanceX =  event.x - originX + width
                  const distanceY = event.y - originY
                  ne.value.style.left = distanceX + 'px'
                  ne.value.style.top =  distanceY + 'px'
                  nw.value.top = distanceY + 'px'
                  se.value.left = distanceX + 'px'
              }
          }
              break
            case 'sw':
              break
            case 'se':
              break
          }
        }
      }
    }
    function mouseupHandle (event,direction) {
      console.log('up')
      startTouch.value = false
    }
    // 点击裁剪框
    function clickCropBox (event) {
      moveCropBox.value = true
    }
    function moveBox (event) {
      // 拖拽裁剪框并调整四个角点的位置
      if (moveCropBox.value) {
        console.log('move')

      // 计算鼠标相对于拖拽元素的偏移量
      const offsetX =event.x-cropBox.value.getBoundingClientRect().left
      const offsetY =event.y-cropBox.value.getBoundingClientRect().top
      console.log(offsetX,offsetY)
      // 计算鼠标在目标元素中的位置
      const x = event.x - cropImage.value.getBoundingClientRect().left - offsetX
      const y = event.y - cropImage.value.getBoundingClientRect().top - offsetY

      // 设置拖拽元素的位置
      cropBox.value.style.left = cropBox.value.left + offsetX + 'px'
      cropBox.value.style.top = cropBox.value.top + offsetY + 'px'
      // 计算四个角点的位置
      nw.value.style.left =  'px'
      nw.value.style.top = y + 'px'
      ne.value.style.left = x + cropBox.value.style.width + 'px'
      ne.value.style.top = y + 'px'
      sw.value.style.left = x + 'px'
      sw.value.style.top = y + cropBox.value.style.height + 'px'
      }
    }
    function stopCropBox (event) {
      moveCropBox.value = false
    }
    return {
      ...state,
      showAvatarDialog,
      cropImage,
      nw,
      ne,
      sw,
      se,
      cropBox,
      changeUserAvatar,
      setNewAvatar,
      clickAvatar,
      mouseStartHandle,
      mouseMoveHandle,
      mouseupHandle,
      clickCropBox,
      moveBox,
      stopCropBox
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
            background: rgba(255,255,255,0.5);

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
