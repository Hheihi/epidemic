import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FormModel, Button, Input, Icon, message, Radio, Layout, Menu, Table, Tag, Modal, PageHeader, DatePicker, Cascader, Avatar, Dropdown, Upload } from 'ant-design-vue';
Vue.config.productionTip = false
Vue.prototype.$message = message
Vue.use(FormModel);
Vue.use(Button)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Modal)
Vue.use(PageHeader)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(Upload)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')