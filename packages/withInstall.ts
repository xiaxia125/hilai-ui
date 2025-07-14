import type { App, Plugin } from "vue"

type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(component: T) {
  const comp = component as SFCWithInstall<T>
  
  comp.install = (app: App) => {
    const { name } = comp as unknown as { name: string }
    app.component(name, comp)
  }
  
  return comp
}