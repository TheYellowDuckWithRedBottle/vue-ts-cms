<template>
  <div class="template-item">
    <div class="item-panel">
      <div class="map-cover">
        <img src="@/assets/img/widget-icons/thumbnail.png" alt="map_cover" />
      </div>
      <div class="divider"></div>
      <div class="map-desc">
        <div class="map-name">{{ mapTemplate?.name }}</div>
        <div class="map-template-name">
          <font-awesome-icon icon="fa-solid fa-circle" />
          {{ mapTemplate?.title }}
        </div>
        <div class="map-template-desc">
          <font-awesome-icon icon="fa-solid fa-circle" />
          {{ mapTemplate?.desc }}
        </div>
      </div>
      <div class="map-operation">
        <div class="map-viewer">
          <font-awesome-icon icon="fa-solid fa-eye" />
        </div>
        <div class="map-config">
          <font-awesome-icon icon="fa-solid fa-gear" />
        </div>
        <div class="map-delete" @click = "deleteTemplate(mapTemplate)">
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
    }
    return { deleteTemplate }
  }
})
</script>

<style scoped lang="less">
.template-item {
  margin: 5px 10px;
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
  img {
    width: 100%;
    height: 100%;
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
  font-size: 10px;
  div {
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .map-name {
    font: bold;
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
</style>
