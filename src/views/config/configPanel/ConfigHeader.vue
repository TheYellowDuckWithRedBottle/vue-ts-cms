<template>
  <div class="map-panel">
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
          :mapTemplate="item"
        ></mapTemplate>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import mapTemplate from './mapTemplate.vue'
export default defineComponent({
  components: {
    mapTemplate
  },
  setup() {
    const input1 = ''
    let dialogVisible = ref(false)
    function previewMap(mapTemplateInfo: any) {
      console.log(mapTemplateInfo)
    }
    function addTemplate() {
      console.log('a')
      dialogVisible.value = true
    }
    const mapTemplates = [
      {
        cover: '',
        name: '',
        title: '',
        desc: ''
      }
    ]
    return { input1, mapTemplates, previewMap, addTemplate, dialogVisible }
  }
})
</script>

<style scoped lang="less">
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
</style>
