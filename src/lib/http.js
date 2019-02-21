import axios from "axios";
import Vue from "vue";

var instance = axios.create({
    timeout: 15000,
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
});

instance.interceptors.request.use(config => {
    return config;
});

Vue.prototype.$http = instance;

export default instance;
