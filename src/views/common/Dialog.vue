<template>
  <div class="dialog-background" v-if="dialogVisible" @click="closeDialog">
    <div class="dialog" :style="{width:dialogWidth + 'px', height:dialogHeight + 'px'}" @click.stop="clickDialog">
      <div class="dialog-header">
        <div class="dialog-title">
          <slot name="title"></slot>
        </div>
        <div class="dialog-close" @click.stop="closeDialog">
          <slot name="close"></slot>
        </div>
      </div>
      <div class="dialog-body">
        <slot name="body"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer">
          <el-button type="primary" size="small" @click="confirm.stop">确定</el-button>
          <el-button size="small" @click.stop="closeDialog">取消</el-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'
export default  defineComponent ({
  props: {
    dialogVisible: Boolean,
    dialogWidth: {
      type: Number,
      default: 500
    },
    dialogHeight: {
      type: Number,
      default: 300
    }
  },
  setup(props, {emit}) {
    function closeDialog() {
      emit('closeDialog')
    }
    function confirm () {
      emit('confirm')
    }
    return {
      closeDialog,
      confirm
    }
  }

})
</script>

<style lang="less" scoped>
.dialog-background {
   position: fixed;
   top: 0px;
   left: 0px;
   background-color: rgba(0,0,0,0.5);
   z-index: 1000;
   height: 100%;
   width: 100%;
   .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--borderColor);
      border-radius: 5px;
      width: 500px;
      height: 300px;
      .dialog-header {
        height: 20%;
        display: flex;
        align-items: center;
        padding: 0 10px;
        justify-content: space-between;
        color: var(--cardBorderColor);
        background: var(--color-primary);
        .dialog-title {
          font-size: 16px;
          font-weight: bold;
        }
        .dialog-close {
          font-size: 12px;
          display: flex;
          align-items: center;
        }
      }
      .dialog-body {
        height: calc(80% - 40px);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
      }
      .dialog-footer {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
      }
   }
}

</style>
