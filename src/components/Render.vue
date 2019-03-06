<template lang="pug">
.comp-render(:style="{height:`${this.height}px`}")
    canvas(ref="canvas")
</template>

<script>
import zrender from "zrender";
import bus from "@/lib/bus";
import { chartData } from "../mock/data";
import {
    addHover,
    createFullCircle,
    createEmptyCircle,
    createShape,
    createLine,
    createDashLine
} from "../lib/util";
import { mapState } from "vuex";
export default {
    computed: mapState({
        urlParam: state => state.urlParam
    }),
    props: {
        height: {
            type: Number,
            default: 400
        },
        xSplit: {
            type: Number,
            default: 6
        },
        heightCount: {
            type: Number,
            default: 50
        }
    },
    data() {
        return {
            width: 0
        };
    },
    methods: {
        getX(time) {
            return time * (this.width / (24 * 7));
        },
        getY(value, cellMin, cellSplit) {
            let max = cellMin + cellSplit * this.heightCount;
            let realY =
                ((max - value) / cellSplit) * (this.height / this.heightCount);
            return realY;
        },
        drawGrid() {
            let xCount =
                (this.width - (this.xSplit * 7 - 1)) / (this.xSplit * 7);
            for (let i = 1; i < this.xSplit * 7; i++) {
                let line = createLine(
                    i * xCount + i - 1,
                    0,
                    i * xCount + i - 1,
                    this.height,
                    "#999",
                    i % this.xSplit === 0 ? 2 : 1,
                    -3
                );
                this.zr.add(line);
            }

            let yCount =
                (this.height - (this.heightCount - 1)) / this.heightCount;
            for (let i = 1; i < 50; i++) {
                let line = createLine(
                        0,
                        i * yCount + i - 1,
                        this.width,
                        i * yCount + i - 1,
                        "#999",
                        1,
                        -3
                    );
                this.zr.add(line);
            }
        },
        drawLine(data) {
            let cellMin = data.cellMin;
            let cellSplit = data.cellSplit;
            let color = data.color;
            let shape = data.shape;
            data.array.forEach((item, index) => {
                if (index >= 1) {
                    let preItem = data.array[index - 1];
                    if (preItem.Break!=='true') {
                        let line = createLine(
                            this.getX(preItem.time),
                            this.getY(preItem.value, cellMin, cellSplit),
                            this.getX(item.time),
                            this.getY(item.value, cellMin, cellSplit),
                            color
                        );
                        this.zr.add(line);
                    }
                }
                let shapeObj = createShape(
                    this.getX(item.time),
                    this.getY(item.value, cellMin, cellSplit),
                    color,
                    shape
                );
                this.zr.add(shapeObj);
                addHover(shapeObj, this.zr, item.tips);
                if (item.extra) {
                    let extraColor = item.extraColor || color;
                    let circle2 = createEmptyCircle(
                        this.getX(item.time),
                        this.getY(item.extra, cellMin, cellSplit),
                        extraColor
                    );
                    this.zr.add(circle2);
                    addHover(circle2, this.zr, item.extraTips);
                    let line = createDashLine(
                        this.getX(item.time),
                        this.getY(item.value, cellMin, cellSplit),
                        this.getX(item.time),
                        this.getY(item.extra, cellMin, cellSplit),
                        extraColor
                    );
                    this.zr.add(line);
                }
                if (item.others && item.others.length > 0) {
                    item.others.forEach(other => {
                        let circle = createEmptyCircle(
                            this.getX(other.time),
                            this.getY(other.value, cellMin, cellSplit),
                            other.color || color
                        );
                        this.zr.add(circle);
                        addHover(circle, this.zr, other.tips);
                        let line = createDashLine(
                            this.getX(item.time),
                            this.getY(item.value, cellMin, cellSplit),
                            this.getX(other.time),
                            this.getY(other.value, cellMin, cellSplit),
                            other.color || color
                        );
                        this.zr.add(line);
                    });
                }
            });
        },
        drawArea(data) {
            let cellMin = data.cellMin;
            let cellSplit = data.cellSplit;
            let color = data.color;
            let bgColor = data.bgColor;
            let array = data.array;
            let points = [];
            array.forEach(item => {
                let x = this.getX(item.time);
                let y = this.getY(item.v1, cellMin, cellSplit);
                let y2 = this.getY(item.v2, cellMin, cellSplit);
                let circle = createFullCircle(x, y, color);
                let circle2 = createFullCircle(x, y2, color);
                addHover(circle, this.zr, item.v1Tips);
                addHover(circle2, this.zr, item.v2Tips);
                let line = createLine(x, y, x, y2, color);
                this.zr.add(circle);
                this.zr.add(circle2);
                this.zr.add(line);
                points.push([x, y]);
            });
            array.reverse().forEach(item => {
                let x = this.getX(item.time);
                let y = this.getY(item.v2, cellMin, cellSplit);
                points.push([x, y]);
            });
            let poly = new zrender.Polygon({
                shape: {
                    points: points
                },
                style: {
                    fill: bgColor
                }
            });
            let polyline = new zrender.Polyline({
                shape: {
                    points: points
                },
                style: {
                    stroke: color
                }
            });
            this.zr.add(poly);
            this.zr.add(polyline);
        },
        drawTag(data) {
            let cellMin = data.cellMin;
            let cellSplit = data.cellSplit;
            let color = data.color;
            let text = data.text;
            let array = data.array;
            let y = data.y;
            array.forEach(item => {
                var g = new zrender.Group({
                    zlevel: 2
                });
                g.position[0] = this.getX(item.time) - 5;
                g.position[1] = this.getY(item.y || y, cellMin, cellSplit) - 5;
                g.add(
                    new zrender.Circle({
                        shape: {
                            cx: 5,
                            cy: 5,
                            r: 8
                        },
                        style: {
                            fill: `rgba(255,255,255,1)`,
                            stroke: color
                        }
                    })
                );
                g.add(
                    new zrender.Text({
                        style: {
                            text: text,
                            textAlign: "center",
                            textVerticalAlign: "middle",
                            textFill: color
                        },
                        position: [5, 6]
                    })
                );
                this.zr.add(g);
                addHover(g, this.zr, item.tips);
            });
        },
        drawText(data) {
            let text = new zrender.Text({
                style: {
                    text: data.text,
                    textAlign: "left",
                    textVerticalAlign: "middle",
                    textFill: data.color,
                    textStroke: "#fff",
                    fontWeight: "bold",
                    textShadowColor: "#fff"
                },
                position: [this.getX(data.time), 50]
            });
            this.zr.add(text);
        },
        drawBaseline(data) {
            let cellMin = data.cellMin;
            let cellSplit = data.cellSplit;
            let color = data.color;
            let y = data.y;
            // console.log(this.getY(y, cellMin, cellSplit));
            let line = new zrender.Line({
                shape: {
                    x1: 0,
                    y1: this.getY(y, cellMin, cellSplit),
                    x2: this.width,
                    y2: this.getY(y, cellMin, cellSplit)
                },
                style: {
                    stroke: color,
                    lineWidth: 2
                },
                zlevel:-1
            });
            this.zr.add(line);
        },
        async getData() {
            // try {
			// 	let { data } = await this.$http.post("/TemperatureList/ChartData",{cstId:this.urlParam.cstId,begin:this.urlParam.begin,end:this.urlParam.end});
			// 	data = data.Data;
			// 	this.$nextTick(() => {
			// 		this.drawGrid();
			// 		data.forEach(item => {
			// 			if (item.type === "line") {
			// 				this.drawLine(item);
			// 			} else if (item.type === "area") {
			// 				this.drawArea(item);
			// 			} else if (item.type === "tag") {
			// 				this.drawTag(item);
			// 			} else if (item.type === "text") {
			// 				this.drawText(item);
			// 			} else if (item.type === "baseline") {
			// 				this.drawBaseline(item);
			// 			}
			// 		});
			// 	});
			// } catch (error) {
			// 	// console.log(error);
			// }
            let data = chartData;
            this.$nextTick(() => {
                //绘制网格
                this.drawGrid();
                console.log(data);
                data.forEach(item => {
                    if (item.type === "line") {
                        this.drawLine(item);
                    } else if (item.type === "area") {
                        this.drawArea(item);
                    } else if (item.type === "tag") {
                        this.drawTag(item);
                    } else if (item.type === "text") {
                        this.drawText(item);
                    } else if (item.type === "baseline") {
                        this.drawBaseline(item);
                    }
                });
            });
        }
    },
    mounted() {
        let canvas = this.$refs["canvas"];
        this.width = canvas.offsetWidth;
        this.zr = zrender.init(canvas, {
            devicePixelRatio: window.devicePixelRatio,
            width: this.width,
            height: this.height
        });
        bus.$on("config_data_ready", () => {
            this.getData();
        });
    }
};
</script>

<style lang="scss" scoped>
.comp-render {
    height: 100%;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
