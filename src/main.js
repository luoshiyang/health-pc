import Vue from "vue";
import Table from "./views/Table.vue";
import store from "./store";
import "./lib/http";

import "reset-css";
import "./styles/common.scss";

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(Table)
}).$mount("#app");
