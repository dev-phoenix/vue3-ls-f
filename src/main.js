import { createApp } from 'vue'

import App from './App'
import components from '@/components/UI'
import router from '@/router/router'
// import VIntersection from '@/directives/VIntersection'
import directives from '@/directives'
import store from '@/store'

// console.log(components);


const app = createApp(App)

// components.forEach(component => {
//     app.component(component.name, component);
// });

directives.forEach(directive => {
    app.directive(directive.name, directive);
});

for (var ckey in components) {
    var component = components[ckey]
    app.component(component.name, component);
}

// app.directive('intersection', VIntersection)

app
    .use(router)
    .use(store)
    .mount('#app')

