<template lang="pug">
.comp-y-axis-item
    .item(v-for="item in data" :style="{bottom:`${item.bottom}px`}") {{item.text}}
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 400
        },
        cellCount: {
            type: Number,
            default: 50
        },
        name: {
            type: String,
            default: "脉搏"
        },
        displayMax: {
            type: Number,
            default: 150
        },
        displayMin: {
            type: Number,
            default: 40
        },
        displaySplit: {
            type: Number,
            default: 10
        },
        cellMin: {
            type: Number,
            default: 20
        },
        cellSplit: {
            type: Number,
            default: 5
        }
    },
    computed: {
        data() {
            let res = [];
            let max = Math.floor(
                (this.displayMax - this.displayMin) / this.displaySplit
            );
            for (let i = 0; i <= max; i++) {
                let val = this.displayMin + i * this.displaySplit;
                let bottom =
                    ((val - this.cellMin) / this.cellSplit) *
                    (this.height / this.cellCount);
                res.push({
                    text: val,
                    bottom: bottom - 6
                });
            }
            res.push({
                text: this.name,
                bottom: res[max].bottom + 20
            });
            return res;
        }
    }
};
</script>


<style lang="scss" scoped>
.comp-y-axis-item {
    position: relative;
    font-size: 12px;
    .item {
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
    }
}
</style>
