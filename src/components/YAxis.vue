<template lang="pug">
.comp.flex 
    y-axis-legend.legend(:data="configData.legend")
    y-axis-item.item(
        v-for="item in configData.yAxisData" 
        :key="item.name"
        :name="item.name"
        :displayMax="item.displayMax"
        :displayMin="item.displayMin"
        :displaySplit="item.displaySplit"
        :cellMin="item.cellMin"
        :cellSplit="item.cellSplit"
    )
</template>

<script>
import YAxisItem from "./YAxisItem.vue";
import YAxisLegend from "./YAxisLegend.vue";
import { mapState } from "vuex";
export default {
    components: {
        YAxisItem,
        YAxisLegend
    },
    computed: mapState({
        configData: state => state.configData
    })
};
</script>


<style lang="scss" scoped>
.comp {
    height: 400px;
    align-items: stretch;
    position: relative;
    .item {
        flex-grow: 1;
        width: 25%;
        border-right: 1px solid #000;
        &:last-child {
            border-right: 0;
        }
    }
    .legend {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 1;
    }
}
</style>
