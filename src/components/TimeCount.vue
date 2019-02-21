<template lang="pug">
.comp.flex(:class="{'special-css':specialCss}")
    .item(v-for="item in array") {{item}}
</template>

<script>
export default {
    props: {
        split: {
            type: Number,
            default: 4
        },
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        hasData: {
            type: Boolean,
            default: false
        },
        specialCss: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        array() {
            if (this.hasData) {
                return this.data;
            } else {
                return this.split === 4
                    ? [3, 9, 15, 21]
                    : [2, 6, 10, 14, 18, 22];
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.comp {
    text-align: center;
    align-items: stretch;
    height: 34px;
    .item {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #999;
        width: 100%;
        word-break: break-all;
        word-wrap: break-word;
        &:last-child {
            border-right: 0 none;
        }
    }
    &.special-css {
        .item {
            align-items: flex-start;
            &:nth-child(2n) {
                align-items: flex-end;
            }
        }
    }
}
</style>
