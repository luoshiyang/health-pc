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
            tr  
                td 血压(mmhg)
                td.timer-day(v-for="item in tableData.bloodPressure")
                    time-count(:split="2" :data="item" :hasData="true")
            tr  
                td 大便次数
                td(v-for="item in tableData.shitTimes") {{item}}

            

            tr  
                td 身高(cm)
                td(v-for="item in tableData.height") {{item}}
            tr  
                td 体重(kg)
                td(v-for="item in tableData.weight") {{item}}
            tr  
                td 皮试结果
                td(v-for="item in tableData.skinTestRst") {{item}}

    table.for-table
        tbody(v-for="item in tableData.StatisticsSummary")
            tr(v-for="node in item")
                td {{node.Name}}
                td(v-for="chile in node.Data") {{chile}}   
            
            tr(v-for="item in 2")
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
            //正式打包覆盖mock数据
            // try {
			// 	let { data } = await this.$http.post("http://a.composite.com:8080/api/PatrolInfo/ChartSummary",{PatientCode:this.urlParam.cstId,beginDate:this.urlParam.begin,endDate:this.urlParam.end});
			// 	this.tableData = data.Data
			// } catch (error) {
			// 	// console.log(error);
			// }

            let data = tableData;
            this.tableData = data;
        }
    },
    created() {
        this.$store.dispatch("updateConfigData");
        this.$store.dispatch("getUrlParam");
        bus.$on("config_data_ready", () => {
            // console.log("ready");
            this.getData();
        });
    }
};
</script>

<style lang="scss" scoped>
.view {
    overflow: auto;
    box-sizing: border-box;
    padding: 4px 10px;
    table {
        width: 100%;
        table-layout: fixed;
        td {
            padding: 4px 10px;
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
        &.for-table{
            margin-top:-1px;
        }
    }
}
</style>
