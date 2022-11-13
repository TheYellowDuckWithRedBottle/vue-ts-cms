<template>
  <div>
    <el-tree
      :data="dataSource"
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span class="tree-item-title">{{ node.label }}</span>
          <div class="tree-operate-wrap">
            <el-checkbox
              v-model="node.isCheck"
              size="large"
              @change="openService(data, node)"
            />
          </div>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts">
import Test from './test.vue'
import { defineComponent, ref } from 'vue'
interface Tree {
  label: string
  service?: string
  children?: Tree[]
}
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const dataSource = ref<Tree[]>([
      {
        label: '服务一',
        children: [
          {
            label: 'Level two 1-1',
            children: [
              {
                label: 'Level three 1-1-1'
              },
              {
                label: 'Level three 1-1-2'
              }
            ]
          }
        ]
      },
      {
        label: 'Level one 2',
        children: [
          {
            label: 'Level two 2-1'
          },
          {
            label: 'Level two 2-2'
          }
        ]
      }
    ])

    const handleNodeClick = (e: any) => {
      console.log(e)
    }
    const openService = (data: any, node: any) => {
      console.log(data.value)
      console.log(node.value)
    }
    const defaultProps = {
      children: 'children',
      label: 'label'
    }
    return {
      dataSource,
      defaultProps,
      handleNodeClick,
      openService
    }
  }
})
</script>

<style lang="less">
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 100%;
}
.tree-item-title {
  display: block;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tree-operate-wrap {
  width: 7%;
  height: 100%;
}
</style>
