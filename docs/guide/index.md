### 安装

```javascript
npm install hilai-ui
```

### 快速开始
<br/>

##### 完整引入

```javascript
import { createApp } from 'vue'
import HilaiUI from 'hilai-ui'
import 'hilai-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(HilaiUI)
app.mount('#app')
```
##### 按需引入

```javascript
import { HlCrossTableSelector } from 'hilai-ui'
```