import 'element-plus/theme-chalk/index.css'
import { ElAlert, ElAside, ElButton } from 'element-plus'
const components = [ElButton, ElAlert, ElAside]

export function registerApp(app: any) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
