# vue-data-api

API documentation:

## Installation

1. Install the dataAPI package:
```bash
npm install vue-data-api
```
2. Install mountedCheck mixin package:
```bash
npm install vue-mounted-check
```

Now you can use the dataAPI in your Vue components. But first you need to register the "vue-mounted-check" mixin globally or you have to import it in every component where you want to use the dataAPI onMounted hook.

To register the mixin globally, add the following code to your main.js file (Optionally):
```js
import { createApp } from 'vue'
import App from './App.vue'
import mountedCheck from 'vue-mounted-check'

createApp(App)
    .mixin(mountedCheck)
    .mount('#app')
```

## Usage

File: `App.vue`
```vue
<script>
import dataAPI from 'vue-data-api'

export default {
    name: 'App',
    mounted() {
        dataAPI.onMethod(this, 'methodName', (data) => {
            console.log(data)
        })
    }
}
</script>
```

File: `Child.vue`
```vue
<script>
import dataAPI from 'vue-data-api'

export default {
    name: 'Child',
    mounted() {
        dataAPI.callMethod('methodName', 'Hello World') // It will log 'Hello World' in the console
    }
}
</script>
```

If you are using Composition API:
```js
const _mounted = ref(false)
onMounted(() => {
    _mounted.value = true
})
onUnmounted(() => {
    _mounted.value = false
})

dataAPI.onMethod({ _mounted: _mounted.value }, 'methodName', (data) => {
    console.log(data)
})
```

## API
```js
dataAPI.onMethod(componentThis, methodName, callback, options?)
// options: { once: boolean }
dataAPI.callMethod(methodName, ...data?)
dataAPI.offMethodCallback(methodName, callback)
dataAPI.offMethod(methodName)
```