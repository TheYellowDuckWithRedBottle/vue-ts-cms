<template>
  <div class="template-item">
    <div class="item-panel" @click="route2Map(mapTemplate)">
      <!--  封面 -->
      <div class="map-cover">
        <img src="@/assets/img/widget-icons/thumbnail.png" alt="map_cover" />
        <div class="map-main-info">
          <div class="map-template-name">{{ mapTemplate?.name }}</div>
          <div class="map-template-desc">{{ mapTemplate?.desc }}</div>
        </div>
      </div>
      <div class="divider"></div>
      <!-- 描述信息 -->
      <div class="map-desc">

        <div class="map-template-EPSGCode">
          <span>坐标系：</span>
          {{ mapTemplate?.EPSG }}
        </div>
        <div class="map-template-EPSGCode">
         <span>创建人：</span>
          {{ mapTemplate?.createUser }}
        </div>
        <div>
          <span>模板名称：</span>
          {{ mapTemplate?.title }}
        </div>
        <div class="map-template-createTime">
          <span>创建时间：</span>
          {{ mapTemplate?.createTime }}
        </div>
      </div>
      <div class="map-operation">
        <div class="opera-icon map-viewer" @click="route2Map(mapTemplate)">
          <font-awesome-icon icon="fa-solid fa-eye" />
        </div>
        <div class="opera-icon map-config" @click.stop="configMapFunction(mapTemplate)">
          <font-awesome-icon icon="fa-solid fa-gear" />
        </div>
        <div class="opera-icon map-delete" @click.stop = "deleteTemplate(mapTemplate)">
          <font-awesome-icon icon="fa-sharp fa-trash" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
  props: {
    mapTemplate: Object
  },
  setup(props, { emit }) {
    const mapTemplate = toRefs(props)
    function deleteTemplate (mapTemplate: any) {
      console.log(mapTemplate)
    }
    function route2Map (mapTemplate: any) {
      window.open("")
    }
    function configMapFunction (mapTemplate: any) {
      console.log(mapTemplate)
      emit('configMapFunction',mapTemplate)
    }
    return { deleteTemplate, route2Map, configMapFunction }
  }
})
</script>

<style scoped lang="less">
.template-item {
  margin: 5px 10px;
  font-size: var(--font-second-size);
}
.item-panel {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 280px;
  margin: 5px;
  border: 1px solid var(--cardBorderColor);
  box-shadow: 2px 2px 2px rgb(0 0 0 / 23%);
}
.item-panel :hover {
  cursor: pointer;
}
.map-cover {
  width: 100%;
  height: 50%;
  background: white;
  padding: 1px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  // 水平垂直据中
  .map-main-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: var(--font-primary-size);
    font-weight: bold;
    .map-template-name {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .map-template-desc {
      width: 100%;
      height: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: wrap;
      font-size:var(--font-second-size)
    }
  }
}
.divider {
  height: 2px;
  width: 100%;
  background: var(--color-primary);
}
.map-desc {
  width: 100%;
  height: calc(35% - 1px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  div {
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .map-name {
    font: bold;
    font-size: var(--font-primary-size);
  }
}
.map-operation {
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: var(--borderColor);
  font-size: 20px;
}
.opera-icon:hover{
  color: var(--color-primary)
}
</style>
