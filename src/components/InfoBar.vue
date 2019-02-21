<template lang="pug">
.comp.flex 
    .item.flex
        label 姓名:
        .value {{data.name}}
    .item.flex
        label 性别:
        .value {{data.sex}}
    .item.flex 
        label 年龄:
        .value {{data.age}}
    .item.flex 
        label 科别:
        .value {{data.department}}
    .item.flex 
        label 病床:
        .value {{data.bed}}
    .item.flex 
        label 住院号:
        .value {{data.hospitalized}}

</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default() {
                return {};
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.comp {
    padding-bottom: 10px;
    .item {
        margin-right: 20px;
        label {
            color: #000;
            margin-right: 5px;
        }
    }
}
</style>
