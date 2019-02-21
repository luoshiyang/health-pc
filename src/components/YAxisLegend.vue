<template lang="pug">
.comp-legend
    .item(v-for="item in data" :style="{'background-color':item.color}") {{item.name}}
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.comp-legend {
    .item {
        margin: 5px 0 0 5px;
        font-size: 12px;
        color: #fff;
        padding: 3px 5px;
        display: inline-block;
    }
}
</style>
