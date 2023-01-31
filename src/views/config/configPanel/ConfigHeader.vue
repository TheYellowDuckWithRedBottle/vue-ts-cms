<template>
  <div class="map-panel-wrapper">
    <div class="map-panel" v-if="!showConfigMapFun">
    <div class="search-header">
      <div class="search-panel-form">
        <el-input
          v-model="input1"
          class="w-50 m-2"
          placeholder="检索地图模板"
        />
      </div>
      <!-- 弹出添加地图模板的对话框 -->
      <div class="new-template">
        <el-button type="primary" @click="addTemplate">新建</el-button>
      </div>
      <el-dialog
        v-model="dialogVisible"
        title="创建地图模板"
        width="30%"
        :center="true"
      >
        <div class="form-body">
          <div class="template-file-name inputInfo">
            <label for="fileName">模板文件名称</label>
            <input id="fileName" placeholder="填写文件名称" />
          </div>
          <div class="template-name inputInfo">
            <label for="templateName">模板名称</label>
            <input id="templateName" type="text" placeholder="填写模板名称" />
          </div>
          <div class="template-desc inputInfo">
            <label for="templateDesc">模板描述</label>
            <textarea name="textarea">填写模板描述</textarea>
          </div>
          <div class="template-source inputInfo">
            <label> 模板来源</label>
            <label for="blank"
              ><input
                type="radio"
                id="blank"
                name="sex"
                value="blank"
              />空白模板</label
            >
            <label for="exist"
              ><input
                for="exit"
                id="exist"
                type="radio"
                name="sex"
                value="exist"
              />已存模板</label
            >
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">
              创建
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="template-body">
      <template v-for="(item, index) in mapTemplates" :key="index">
        <mapTemplate
          @click="previewMap(item)"
          @configMapFunction = "configCurrentMap"
          :mapTemplate="item"
        ></mapTemplate>
      </template>
    </div>
    </div>
    <div class="config-fun-panel" v-else>
      <div class="config-fun-header">
        <div class="tabs-container">
          <div v-for="(tab, index) in tabs" class="tab-wrapper"
          @click="switchConfig(tab)"
          :class="currentTab==tab?'active-tab':''"
          :key="index">
            <span class="tab-text">{{ tab }}</span>
          </div>
        </div>
        <div class="buttons-container">
          <el-button type="primary" size="small">查看</el-button>
          <el-button type="success" size="small">刷新</el-button>
        </div>
      </div>
      <div class="config-content">
        <configAttribute v-if="currentTab=='属性配置'"></configAttribute>
        <configService v-if="currentTab=='服务配置'"></configService>
        <configFunction v-if="currentTab=='功能配置'"></configFunction>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { stat } from 'fs'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import mapTemplate from './mapTemplate.vue'
import configService from './ConfigServices.vue'
import configAttribute from './ConfigAttribute.vue'
import configFunction from './ConfigFunction.vue'
export default defineComponent({
  components: {
    mapTemplate,
    configService,
    configAttribute,
    configFunction
  },
  setup() {
    let state = reactive({
      input1: '',
      dialogVisible: false,
      showConfigMapFun: false,
      tabs: ['模板列表','服务配置','功能配置','属性配置','缓存清理'],
      currentTab:'服务配置'
    })
    function previewMap(mapTemplateInfo: any) {
      console.log(mapTemplateInfo)
    }
    function addTemplate() {
      console.log('a')
      state.dialogVisible = true
    }
    // 点击底图模板的配置按钮
    function configCurrentMap (mapTemplate: any) {
      state.showConfigMapFun = true
    }
    // 切换tab页
    function switchConfig (tab: string) {
      debugger
      state.currentTab = tab
      switch (tab) {
        case '模板列表':
          //todo 跳转到首页
          state.showConfigMapFun = false
          break;
        case '服务配置':

          break;
        case '功能配置':

          break;
        case '属性配置':

          break;
        case '缓存清理':

          break;
        default:
          break;
      }
    }
    const mapTemplates = [
      {
        cover: '',
        name: '',
        title: '',
        desc: ''
      }
    ]
    return { mapTemplates,
      previewMap,
      addTemplate,
      configCurrentMap,
      switchConfig,
      ...toRefs(state) }
  }
})
</script>

<style scoped lang="less">
.map-panel-wrapper {
  width: 100%;
  height: 100%;
}
.map-panel {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.search-header {
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-panel-form {
  margin-right: 20px;
}
.form-body {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .inputInfo {
    height: 45px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 8px;
    label {
      width: 150px;
      height: 100%;
      font-weight: 600;
    }
    input {
      width: calc(100% - 150px);
      height: 100%;
      border: 1px solid var(--borderColor);
      border-radius: 2px;
    }
  }
  .template-desc {
    height: 80px;
    textarea {
      height: 100%;
      width: calc(100% - 150px);
      border: 1px solid var(--borderColor);
    }
  }
  .template-source {
    height: 50px;
    textarea {
      width: calc(100% - 150px);
      height: 50px;
      border: 1px solid var(--borderColor);
      border-radius: 2px;
    }
    input {
      width: 60px;
      height: 20px;
    }
  }
}
::v-deep .el-dialog__header {
  display: flex;
  justify-content: center;
  align-content: center;
}
::v-deep .el-dialog__title {
  display: block;
  font-size: 20px;
  padding-bottom: 5px;
  width: 50%;
  border-bottom: 2px solid var(--borderColor);
}
.template-body {
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 93%;
  padding: 10px 30px;
  overflow: auto;
}
// 配置功能的页面
.config-fun-panel {
  width: 100%;
  height: 100%;
}
 .config-fun-header {
    width: 100%;
    height: 40px;
    display: flex;
    background: rgb(245,245,245);
    .tabs-container {
      width: 90%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .tab-text {
        height: 100%;
        padding: 0px 10px;
        color: var(--color-primary);
      }
    }
    .buttons-container{
      float: right;
      width: 10%;
      display: flex;
      align-items: center;
    }
    .tab-wrapper{
      height: 100%;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
    .active-tab {
      border-bottom: 2px solid var(--color-primary);
    }
  }
  .config-content{
    width: 100%;
    height: calc(100% - 64px);
    padding:12px;
    box-sizing: border-box;
  }
</style>
