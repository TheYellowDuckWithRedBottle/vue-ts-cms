import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElRadioGroup,
  ElTabPane,
  ElTabs,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElIcon,
  ElTree,
  ElDialog,
  ElTable,
  ElTableColumn,
  ElUpload,
  ElSelect,
  ElOption,
  ElMessage,
  ElSlider,
  ElSwitch
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElRadioGroup,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElAside,
  ElAside,
  ElMain,
  ElFooter,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElIcon,
  ElTree,
  ElDialog,
  ElTable,
  ElTableColumn,
  ElUpload,
  ElSelect,
  ElOption,
  ElMessage,
  ElSlider,
  ElSwitch
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
