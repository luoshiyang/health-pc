import Vue from "vue";
import Vuex from "vuex";
import bus from "@/lib/bus";
// import http from "@/lib/http";
import { configData } from "@/mock/data";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        urlParam: {},
        // 图表配置
        configData: {
            // N等分，只支持4或者6
            daySplit: 4,
            // 图例
            legend: [],
            // 竖坐标配置
            yAxisData: []
        }
    },
    mutations: {
        UPDATE_CONFIG_DATA(state, data) {
            Object.assign(state.configData, data);
            console.log(state);
        },
        UPDATE_ID(state, data) {
            Object.assign(state.urlParam, data);
        }
    },
    actions: {
        async updateConfigData({ commit }) {
            // 此处换成ajax, demo 如下
            // try {
            //     let { data } = await http.get("");
            //     commit("UPDATE_CONFIG_DATA", data);
            //     bus.$emit("config_data_ready");
            // } catch (error) {
            //     console.log(error);
            // }
            setTimeout(() => {
                let data = configData;
                commit("UPDATE_CONFIG_DATA", data);
                bus.$emit("config_data_ready");
            }, 0);
        },
        getUrlParam({ commit }) {
            let search = window
                .decodeURIComponent(window.location.search.slice(1))
                .split("&");
            let param = {};
            search.forEach(str => {
                let arr = str.split("=");
                param[arr[0]] = arr[1];
            });
            commit("UPDATE_ID", param);
        }
    }
});
