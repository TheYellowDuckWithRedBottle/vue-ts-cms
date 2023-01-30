<template>
  <div class="operate-panel">
    <div class="panel-header">
      <div class="title-header">
        <slot name="panel-title">{{currentWidget.title}}</slot>
      </div>
      <div class="collapse-wrap" @click="collapseMenuPanel">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </div>
    </div>
    <div class="divider-wrapper">
      <div class="divider"></div>
    </div>
    <div class="panel-body">
      <LayerList v-if="currentWidget?.name === 'layerlist'" />
      <Analysis v-if="currentWidget?.name === 'sdxz'" />
      <Attribute v-if="currentWidget?.name === 'attribute'" />
      <FileImport v-if="currentWidget?.name === 'query'" />
      <Measure v-if="currentWidget?.name === 'measure'" />
      <VideoManager v-if="currentWidget?.name === 'videomanager'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from 'vue'
import LayerList from '@/views//widgets/widgetLayerlist/layerList.vue'
import VideoManager from '@/views//widgets/widgetVideo/widgetVideo.vue'
import Analysis from '@/views//widgets/widgetAnalysis/widgetAnalysis.vue'
import Attribute from '@/views//widgets/widgetAttribute/widgetAttribute.vue'
import FileImport from '@/views//widgets/widgetFileImport/widgetFileImport.vue'
import Measure from '@/views//widgets/widgetMeasure/widgetMeasure.vue'
export default defineComponent({
  components: {
    LayerList,
    VideoManager,
    Analysis,
    Attribute,
    FileImport,
    Measure
  },
  props: {
    isCollapse: Boolean,
    currentWidget: Object
  },
  setup(props, { emit }) {
    const { isCollapse } = toRefs(props)

    let state = reactive({

    })
    function collapseMenuPanel() {
      emit('collapse', !isCollapse)
    }
    return {
      collapseMenuPanel,
    }
  }
})
</script>

<style scope>
.operate-panel {
  background: var(--backgroundColro);
  border-right: 1px solid var(--borderColor);
  height: 100%;
  width: 400px;
  position: relative;
  z-index: 2;
}
.panel-header {
  width: 100%;
  height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 12px;
}
.divider-wrapper {
  width: 100%;
  height: 1px;
  display: flex;
  justify-content: center;
}
.divider {
  width: 96%;
  height: 100%;
  background-color: var(--color-primary);
}
.collapse-wrap:hover {
  cursor: pointer;
  color: var(--color-primary);
}
</style>
