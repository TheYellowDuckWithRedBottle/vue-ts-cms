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
        <el-button type="primary" @click="dialogVisible = true">新建</el-button>
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
            <input id="fileName" :value="newTemplate.fileName" placeholder="填写文件名称" />
          </div>
          <div class="template-name inputInfo">
            <label for="templateName">模板名称</label>
            <input id="templateName" :value="newTemplate.templateName" type="text" placeholder="填写模板名称" />
          </div>
          <div class="template-desc inputInfo">
            <label for="templateDesc">模板描述</label>
            <textarea name="textarea" :value="newTemplate.templateDesc">填写模板描述</textarea>
          </div>
          <div class="template-source inputInfo">
            <label> 模板来源</label>
            <el-radio-group v-model="mapSource" class="ml-4">
              <el-radio label="blank" size="large">空白模板</el-radio>
              <el-radio label="exist" size="large">已存模板</el-radio>
            </el-radio-group>
          </div>
          <div v-if="mapSource == 'exist' && mapTemplates.length > 0" class="template-source inputInfo">
            <label> 选择模板</label>
            <el-select v-model="newTemplate.templateName"  placeholder="请选择模板">
              <el-option
                v-for="item in mapTemplates"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary"  @click="addTemplate">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs,onMounted } from 'vue'
import {getMapTemplates, addMapTemplate, deleteMapTemplate} from '@/service/login/login'
import mapTemplate from './mapTemplate.vue'
import configService from './ConfigServices.vue'
import configAttribute from './ConfigAttribute.vue'
import { MapTemplate } from '@/service/login/types'
import router from '@/router/index'
export default defineComponent({
  components: {
    mapTemplate,
    configService,
    configAttribute,

  },
  setup() {
    let state = reactive({
      input1: '',
      dialogVisible: false,
      showConfigMapFun: false,
      tabs: ['模板列表','服务配置','功能配置','属性配置','缓存清理'],
      currentTab:'服务配置',
      mapTemplates:  [
      {
        cover: '',
        name: '',
        title: '',
        desc: '',
        epsg: '',
      }
    ],
    newTemplate: {
      fileName: '',
      templateName: '',
      templateDesc: '',
    },
    mapSource: 'blank'
    })
    onMounted(async () => {
      getAllMapTemplates()
    })
    async function getAllMapTemplates() {
      try {
        const res = await getMapTemplates()
        state.mapTemplates = res.data
      } catch (error) {
        router.push({ path: `/login` })
      }
      
    }
    function previewMap(mapTemplateInfo: any) {
      const mapTemplateId = mapTemplateInfo.id
      router.push({ path: `/main` })

    }
    function changeTemplate (value: any) {
      console.log(value)
    }
    function addTemplate() {
      let newTemplate: MapTemplate = {
        id: '',
        cover: '',
        name: '',
        title: '',
        desc: '',
        epsg: '',
      }
      if (state.mapSource == 'blank') {
        const newTemplate = {
          cover: '',
          name: state.newTemplate.templateName,
          title: state.newTemplate.templateName,
          desc: state.newTemplate.templateDesc
        }
      } else {
        const template = state.mapTemplates.find((item: any) => item.name == state.newTemplate.templateName)
        if (!template) {
          return
        }
        newTemplate = {
          id:'',
          cover: template.cover,
          name: template.name,
          title: template.title,
          desc: template.desc,
          epsg: template.epsg
        }
      }
      const res = addMapTemplate(newTemplate)
      if (res) {
        getAllMapTemplates()
      }
      state.dialogVisible = false
    }
    // 点击底图模板的配置按钮
    function configCurrentMap (mapTemplate: any) {
      state.showConfigMapFun = true
    }
    // 切换tab页
    function switchConfig (tab: string) {
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
    return {
      previewMap,
      addTemplate,
      configCurrentMap,
      changeTemplate,
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
