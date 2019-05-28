<template>
    <div>
        <div :class='"page-num"'>页码:{{data.pageNumber}}</div>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type: Object,
            default() {
                return {};
            }
        }
    }
}
</script>
<style lang="scss">
    .page-num{
        width:100%;
        height:auto;
        text-align:right;
        font-size:14px;
        margin-top:15px;
        margin-bottom:15px;
    }
</style>