<template lang="pug">
.view 
    info-bar(:data="tableData")
    table
        tbody
            tr  
                td 日期
                td(v-for="item in tableData.date") {{item}}
            tr  
                td 患病日数
                td(v-for="item in tableData.daysAfterSick") {{item}}
            tr  
                td 术后日数
                td(v-for="item in tableData.daysAfterOperation") {{item}}
            tr  
                td.timer-day 每日时间
                td.timer-day(v-for="item in 7")
                    time-count(:split="configData.daySplit")
            tr 
                td.padding-0
                    y-axis
                td.padding-0(colspan="7")
                    render(:xSplit="configData.daySplit")
            //- tr  
            //-     td 呼吸
            //-     td.timer-day(v-for="item in tableData.breath")
            //-         time-count(:split="configData.daySplit" :data="item" :hasData="true" :specialCss="true")
            tr  
                td 疼痛
                td.timer-day(v-for="item in tableData.pain")
                    time-count(:split="configData.daySplit" :data="item" :hasData="true")
            tr  
                td 血压(mmhg)
                td.timer-day(v-for="item in tableData.bloodPressure")
                    time-count(:split="2" :data="item" :hasData="true")
            tr  
                td 小便量(ml)
                td(v-for="item in tableData.peeVolume") {{item}}
            tr  
                td 大便次数
                td(v-for="item in tableData.shitTimes") {{item}}
            tr  
                td 输入液量(ml)
                td(v-for="item in tableData.inputVolume") {{item}}
            tr  
                td 摄入量(ml)
                td(v-for="item in tableData.drinkVolume") {{item}}
            tr  
                td 出量(ml)
                td(v-for="item in tableData.excretionVolume") {{item}}
            tr  
                td 身高(cm)
                td(v-for="item in tableData.height") {{item}}
            tr  
                td 体重(kg)
                td(v-for="item in tableData.weight") {{item}}
            tr(v-for="item in 3")
                td(v-for="item in 8") &nbsp;
            
</template>

<script>
import InfoBar from "@/components/InfoBar";
import TimeCount from "@/components/TimeCount";
import YAxis from "@/components/YAxis";
import Render from "@/components/Render";
import bus from "@/lib/bus";
import { tableData } from "@/mock/data";
import { mapState } from "vuex";
export default {
    components: {
        InfoBar,
        TimeCount,
        YAxis,
        Render
    },
    data() {
        return {
            tableData: {
                date: [],
                daysAfterSick: [],
                daysAfterOperation: [],
                peeVolume: [],
                shitTimes: [],
                inputVolume: [],
                drinkVolume: [],
                bloodPressure: [],
                height: [],
                weight: []
            }
        };
    },
    computed: mapState({
        configData: state => state.configData,
        urlParam: state => state.urlParam
    }),
    methods: {
        async getData() {
            // try {
            //     let { data } = await this.$http.get("");
            //     commit("UPDATE_CONFIG_DATA", data);
            //     bus.$emit("config_data_ready");
            // } catch (error) {
            //     console.log(error);
            // }
            let data = tableData;
            this.tableData = data;
        }
    },
    created() {
        this.$store.dispatch("updateConfigData");
        this.$store.dispatch("getUrlParam");
        bus.$on("config_data_ready", () => {
            console.log("ready");
            this.getData();
        });
    }
};
</script>

<style lang="scss" scoped>
.view {
    overflow: auto;
    box-sizing: border-box;
    padding: 10px;
    table {
        width: 100%;
        table-layout: fixed;
        td {
            padding: 10px;
            border: 1px solid #000;
            vertical-align: top;
            &.timer-day {
                padding: 0;
                &:first-child {
                    padding-left: 10px;
                    height: 34px;
                    line-height: 34px;
                }
            }
        }
    }
}
</style>
