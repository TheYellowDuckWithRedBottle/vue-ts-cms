<template>
  <div class="operate-panel">
    <div class="panel-header">
      <div class="title-header">
        <slot name="panel-title">数据列表</slot>
      </div>
      <div class="collapse-wrap" @click="collapseMenuPanel">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </div>
    </div>
    <div class="divider-wrapper">
      <div class="divider"></div>
    </div>
    <div class="panel-body">
      <LayerList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import LayerList from '@/views/layerlist/layerList.vue'
export default defineComponent({
  components: {
    LayerList
  },
  props: {
    isCollapse: Boolean
  },
  setup(props, { emit }) {
    const { isCollapse } = toRefs(props)
    function collapseMenuPanel() {
      var array = [
        {
          id: '9e8262aa-ef2a-4cf7-853e-6c096ee023e9',
          type: 'multiple',
          style: 'teal',
          title: '20229017',
          graphic: {
            geometry: {
              type: 'polygon',
              rings: [
                [
                  [40577453.6749, 3551502.0371000003],
                  [40577497.3083, 3551402.0782999992],
                  [40577426.0562, 3551380.9396],
                  [40577453.6749, 3551502.0371000003]
                ]
              ],
              _ring: 0,
              spatialReference: {
                wkid: 4528,
                latestWkid: 4528
              },
              cache: {
                _extent: {
                  xmin: 40577426.0562,
                  ymin: 3551380.9396,
                  xmax: 40577497.3083,
                  ymax: 3551502.0371000003,
                  spatialReference: {
                    wkid: 4528,
                    latestWkid: 4528
                  }
                },
                _partwise: null
              }
            },
            symbol: null,
            attributes: {
              DKMC: '20229017',
              PRONAME: '地块',
              UNIT_NAME: null,
              XMDD: null,
              PCBH: null,
              PCMC: null,
              PZWH: null,
              PZRQ: null,
              PZJG: null,
              NYDZMJ: null,
              GDMJ: null,
              JSYDZMJ: null,
              WLYDZMJ: null,
              ZYDMJ: null,
              XZQDM: '320600',
              USAGE_: null,
              APP_TYPE: null
            },
            infoTemplate: null
          },
          src: '定位',
          IdentifyId: 'ba390656-b40c-49bc-8aea-2b091371f85b'
        },
        {
          id: '9e8262aa-ef2a-4cf7-853e-6c096ee023e9',
          type: 'multiple',
          style: 'teal',
          title: '20229017',
          graphic: {
            geometry: {
              type: 'polygon',
              rings: [
                [
                  [40577453.6749, 3551502.0371000003],
                  [40577497.3083, 3551402.0782999992],
                  [40577426.0562, 3551380.9396],
                  [40577453.6749, 3551502.0371000003]
                ]
              ],
              _ring: 0,
              spatialReference: {
                wkid: 4528,
                latestWkid: 4528
              },
              cache: {
                _extent: {
                  xmin: 40577426.0562,
                  ymin: 3551380.9396,
                  xmax: 40577497.3083,
                  ymax: 3551502.0371000003,
                  spatialReference: {
                    wkid: 4528,
                    latestWkid: 4528
                  }
                },
                _partwise: null
              }
            },
            symbol: null,
            attributes: {
              DKMC: '20229017',
              PRONAME: '地块',
              UNIT_NAME: null,
              XMDD: null,
              PCBH: null,
              PCMC: null,
              PZWH: null,
              PZRQ: null,
              PZJG: null,
              NYDZMJ: null,
              GDMJ: null,
              JSYDZMJ: null,
              WLYDZMJ: null,
              ZYDMJ: null,
              XZQDM: '320600',
              USAGE_: null,
              APP_TYPE: null
            },
            infoTemplate: null
          },
          src: '定位',
          IdentifyId: 'ba390656-b40c-49bc-8aea-2b091371f85b'
        },
        {
          id: '9e8262aa-ef2a-4cf7-853e-6c096ee023e9',
          type: 'multiple',
          style: 'teal',
          title: '20229017',
          graphic: {
            geometry: {
              type: 'polygon',
              rings: [
                [
                  [40577453.6749, 3551502.0371000003],
                  [40577497.3083, 3551402.0782999992],
                  [40577426.0562, 3551380.9396],
                  [40577453.6749, 3551502.0371000003]
                ]
              ],
              _ring: 0,
              spatialReference: {
                wkid: 4528,
                latestWkid: 4528
              },
              cache: {
                _extent: {
                  xmin: 40577426.0562,
                  ymin: 3551380.9396,
                  xmax: 40577497.3083,
                  ymax: 3551502.0371000003,
                  spatialReference: {
                    wkid: 4528,
                    latestWkid: 4528
                  }
                },
                _partwise: null
              }
            },
            symbol: null,
            attributes: {
              DKMC: '20229017',
              PRONAME: '地块',
              UNIT_NAME: null,
              XMDD: null,
              PCBH: null,
              PCMC: null,
              PZWH: null,
              PZRQ: null,
              PZJG: null,
              NYDZMJ: null,
              GDMJ: null,
              JSYDZMJ: null,
              WLYDZMJ: null,
              ZYDMJ: null,
              XZQDM: '320600',
              USAGE_: null,
              APP_TYPE: null
            },
            infoTemplate: null
          },
          src: '定位',
          IdentifyId: 'ba390656-b40c-49bc-8aea-2b091371f85b'
        },
        {
          id: '9e8262aa-ef2a-4cf7-853e-6c096ee023e9',
          type: 'multiple',
          style: 'teal',
          title: '20229017',
          graphic: {
            geometry: {
              type: 'polygon',
              rings: [
                [
                  [40577453.6749, 3551502.0371000003],
                  [40577497.3083, 3551402.0782999992],
                  [40577426.0562, 3551380.9396],
                  [40577453.6749, 3551502.0371000003]
                ]
              ],
              _ring: 0,
              spatialReference: {
                wkid: 4528,
                latestWkid: 4528
              },
              cache: {
                _extent: {
                  xmin: 40577426.0562,
                  ymin: 3551380.9396,
                  xmax: 40577497.3083,
                  ymax: 3551502.0371000003,
                  spatialReference: {
                    wkid: 4528,
                    latestWkid: 4528
                  }
                },
                _partwise: null
              }
            },
            symbol: null,
            attributes: {
              DKMC: '20229017',
              PRONAME: '地块',
              UNIT_NAME: null,
              XMDD: null,
              PCBH: null,
              PCMC: null,
              PZWH: null,
              PZRQ: null,
              PZJG: null,
              NYDZMJ: null,
              GDMJ: null,
              JSYDZMJ: null,
              WLYDZMJ: null,
              ZYDMJ: null,
              XZQDM: '320600',
              USAGE_: null,
              APP_TYPE: null
            },
            infoTemplate: null
          },
          src: '定位',
          IdentifyId: 'ba390656-b40c-49bc-8aea-2b091371f85b'
        },
        {
          id: '9e8262aa-ef2a-4cf7-853e-6c096ee023e9',
          type: 'multiple',
          style: 'teal',
          title: '20229017',
          graphic: {
            geometry: {
              type: 'polygon',
              rings: [
                [
                  [40577453.6749, 3551502.0371000003],
                  [40577497.3083, 3551402.0782999992],
                  [40577426.0562, 3551380.9396],
                  [40577453.6749, 3551502.0371000003]
                ]
              ],
              _ring: 0,
              spatialReference: {
                wkid: 4528,
                latestWkid: 4528
              },
              cache: {
                _extent: {
                  xmin: 40577426.0562,
                  ymin: 3551380.9396,
                  xmax: 40577497.3083,
                  ymax: 3551502.0371000003,
                  spatialReference: {
                    wkid: 4528,
                    latestWkid: 4528
                  }
                },
                _partwise: null
              }
            },
            symbol: null,
            attributes: {
              DKMC: '20229017',
              PRONAME: '地块',
              UNIT_NAME: null,
              XMDD: null,
              PCBH: null,
              PCMC: null,
              PZWH: null,
              PZRQ: null,
              PZJG: null,
              NYDZMJ: null,
              GDMJ: null,
              JSYDZMJ: null,
              WLYDZMJ: null,
              ZYDMJ: null,
              XZQDM: '320600',
              USAGE_: null,
              APP_TYPE: null
            },
            infoTemplate: null
          },
          src: '定位',
          IdentifyId: 'ba390656-b40c-49bc-8aea-2b091371f85b'
        },
        {
          id: 'f95bf7c5-0bae-4938-8bf5-10d2981eaa10',
          type: 'multiple',
          style: 'teal',
          title: '20229017',
          graphic: {
            geometry: {
              type: 'polygon',
              rings: [
                [
                  [40577003.2771, 3551317.2040999997],
                  [40577101.0049, 3551281.0873000007],
                  [40577007.5262, 3551215.2271999996],
                  [40577003.2771, 3551317.2040999997]
                ]
              ],
              _ring: 0,
              spatialReference: {
                wkid: 4528,
                latestWkid: 4528
              },
              cache: {
                _extent: {
                  xmin: 40577003.2771,
                  ymin: 3551215.2271999996,
                  xmax: 40577101.0049,
                  ymax: 3551317.2040999997,
                  spatialReference: {
                    wkid: 4528,
                    latestWkid: 4528
                  }
                },
                _partwise: null
              }
            },
            symbol: null,
            attributes: {
              DKMC: '20229017',
              PRONAME: '地块',
              UNIT_NAME: null,
              XMDD: null,
              PCBH: null,
              PCMC: null,
              PZWH: null,
              PZRQ: null,
              PZJG: null,
              NYDZMJ: null,
              GDMJ: null,
              JSYDZMJ: null,
              WLYDZMJ: null,
              ZYDMJ: null,
              XZQDM: '320600',
              USAGE_: null,
              APP_TYPE: null
            },
            infoTemplate: null
          },
          src: '定位',
          IdentifyId: '944ca01b-0713-4b00-89f4-cbd5c60ca171'
        },
        {
          id: '532a06a1-eabe-4043-8212-ee57eedd4b2c',
          type: 'multiple',
          style: 'teal',
          title: '20229017',
          graphic: {
            geometry: {
              type: 'polygon',
              rings: [
                [
                  [40577453.6749, 3551502.0371000003],
                  [40577497.3083, 3551402.0782999992],
                  [40577426.0562, 3551380.9396],
                  [40577453.6749, 3551502.0371000003]
                ]
              ],
              _ring: 0,
              spatialReference: {
                wkid: 4528,
                latestWkid: 4528
              },
              cache: {
                _extent: {
                  xmin: 40577426.0562,
                  ymin: 3551380.9396,
                  xmax: 40577497.3083,
                  ymax: 3551502.0371000003,
                  spatialReference: {
                    wkid: 4528,
                    latestWkid: 4528
                  }
                },
                _partwise: null
              }
            },
            symbol: null,
            attributes: {
              DKMC: '20229017',
              PRONAME: '地块',
              UNIT_NAME: null,
              XMDD: null,
              PCBH: null,
              PCMC: null,
              PZWH: null,
              PZRQ: null,
              PZJG: null,
              NYDZMJ: null,
              GDMJ: null,
              JSYDZMJ: null,
              WLYDZMJ: null,
              ZYDMJ: null,
              XZQDM: '320600',
              USAGE_: null,
              APP_TYPE: null
            },
            infoTemplate: null
          },
          src: '定位',
          IdentifyId: 'eba00ca8-43df-40dc-89e6-e4a37c14b58c'
        },
        {
          id: '28df16a8-74f1-4b65-8b01-432e1fab120b',
          type: 'multiple',
          style: 'teal',
          title: '20229017',
          graphic: {
            geometry: {
              type: 'polygon',
              rings: [
                [
                  [40577003.2771, 3551317.2040999997],
                  [40577101.0049, 3551281.0873000007],
                  [40577007.5262, 3551215.2271999996],
                  [40577003.2771, 3551317.2040999997]
                ]
              ],
              _ring: 0,
              spatialReference: {
                wkid: 4528,
                latestWkid: 4528
              },
              cache: {
                _extent: {
                  xmin: 40577003.2771,
                  ymin: 3551215.2271999996,
                  xmax: 40577101.0049,
                  ymax: 3551317.2040999997,
                  spatialReference: {
                    wkid: 4528,
                    latestWkid: 4528
                  }
                },
                _partwise: null
              }
            },
            symbol: null,
            attributes: {
              DKMC: '20229017',
              PRONAME: '地块',
              UNIT_NAME: null,
              XMDD: null,
              PCBH: null,
              PCMC: null,
              PZWH: null,
              PZRQ: null,
              PZJG: null,
              NYDZMJ: null,
              GDMJ: null,
              JSYDZMJ: null,
              WLYDZMJ: null,
              ZYDMJ: null,
              XZQDM: '320600',
              USAGE_: null,
              APP_TYPE: null
            },
            infoTemplate: null
          },
          src: '定位',
          IdentifyId: '01ba4708-54e8-4852-8d91-95b1ee50b73c'
        }
      ]
      console.log(array)
      duplicateRemoval(array)
      emit('collapse', !isCollapse)
    }
    function duplicateRemoval(tempArray: any[]) {
      var finalTempArray: any[] = []
      for (var p = 0; p < tempArray.length; p++) {
        var finalBlock = tempArray[p]
        if (
          tempArray[p].graphic &&
          tempArray[p].graphic.geometry &&
          tempArray[p].graphic.geometry.cache._extent
        ) {
          finalBlock.extent = tempArray[p].graphic.geometry.cache._extent
          finalTempArray.push(finalBlock)
        }
      }
      for (var i = 0; i < finalTempArray.length; i++) {
        for (var j = i + 1; j < finalTempArray.length; j++) {
          var lastExtent = finalTempArray[i].extent
          var nextExtent = finalTempArray[j].extent
          if (
            lastExtent.xmax === nextExtent.xmax &&
            lastExtent.xmin === nextExtent.xmin &&
            lastExtent.ymax === nextExtent.ymax &&
            lastExtent.ymin === nextExtent.ymin
          ) {
            finalTempArray.splice(j, 1)
            j--
          }
        }
      }
      return finalTempArray
    }
    return {
      collapseMenuPanel
    }
  }
})
</script>

<style scope>
.operate-panel {
  background: white;
  border-right: 1px solid #dcdcdc;
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
  background-color: rgb(119, 162, 233);
}
.collapse-wrap:hover {
  cursor: pointer;
  color: #428bca;
}
</style>
