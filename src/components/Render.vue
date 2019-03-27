<template>
    <div :class="'comp-render'" :style="{height:`${this.height}px`}">
        <canvas ref="canvas"></canvas>
        <div class="comp-table">
            <div :class="'comp-tr'" v-for="(item, index) in heightCount" :key="index">
                <div :class="'comp-td'" v-for="(item, index) in widthCount" :key="index"></div>
            </div>
        </div>
    </div>
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
            default: 560
        },
        xSplit: {
            type: Number,
            default: 8
        },
        heightCount: {
            type: Number,
            default: 70
        },
        widthCount: {
            type: Number,
            default: 42
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
                    "#000",
                    i % this.xSplit === 0 ? 2 : 1,
                    -3
                );
                this.zr.add(line);
            }

            let yCount =
                (this.height - (this.heightCount - 1)) / this.heightCount;
            for (let i = 1; i < 70; i++) {
                let line = createLine(
                        0,
                        i * yCount + i - 1,
                        this.width,
                        i * yCount + i - 1,
                        "#000",
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
            //循环数组，筛选掉value值不存在的坐标。
            for(var i=0; i<data.array.length; i++){
                if(!data.array[i].value){
                    data.array.splice(i,1);
                }
            }
            data.array.forEach((item, index) => {
                if (index >= 1) {
                    let preItem = data.array[index - 1];
                    if (preItem.Break !== 'true') {
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

            //此处循环，会得到以相邻的坐标组成的多边形坐标组为元素的数组。再把数组循环遍历渲染出多边形。
            for(var i=0; i<array.length; i++){
                var x = this.getX(array[i].time);
                var y1 = this.getY(array[i].v1, cellMin, cellSplit);
                var y2 = this.getY(array[i].v2, cellMin, cellSplit);
                var next_x = '';
                var next_y1 = '';
                var next_y2 = '';
                
                //获取下个索引值的数据，以构成多边形
                if(i<array.length-1){
                    //当前索引的下一个元素横坐标的值
                    next_x = this.getX(array[i+1].time);
                    //当前索引的下一个元素两个纵坐标的值
                    next_y1 = this.getY(array[i+1].v1, cellMin, cellSplit);
                    next_y2 = this.getY(array[i+1].v2, cellMin, cellSplit); 
                }

                //绘制坐标点，相同的横坐标下，有y和y2两个纵坐标的点位
                let circle = createFullCircle(x, y1, color);
                let circle2 = createFullCircle(x, y2, color);
                this.zr.add(circle);
                this.zr.add(circle2);

                //添加说明tips
                addHover(circle, this.zr, array[i].v1Tips);
                addHover(circle2, this.zr, array[i].v2Tips);

                //设置每个坐标的（x,y）为起点，(x,y2)为终点，连接起点和终点，形成封闭多边形
                let line = createLine(x, y1, x, y2, color);
                this.zr.add(line);

                //N组坐标，由坐标组成的多边形只有(N-1)个，故push四次坐标组
                if(i<array.length-1){
                    points.push([
                        //左上
                        [x,y1],
                        //右上
                        [next_x,next_y1],
                        //右下
                        [next_x,next_y2],
                        //左下
                        [x,y2]
                    ]);
                }
            }
            // console.log(points);

            //渲染多边形区域
            for(var j=0; j<points.length; j++){
                // let fillColor = (array[j].Break === 'true')?'rgb(255,255,255,0)':bgColor;
                // let strokeColor = (array[j].Break === 'true')?'rgb(255,255,255,0)':color;
                if(array[j].Break !== 'true'){
                    let poly = new zrender.Polygon({
                        shape: {
                            points: points[j]
                        },
                        style: {
                            fill: bgColor
                        }
                    });
                    let polyline = new zrender.Polyline({
                        shape: {
                            points: points[j]
                        },
                        style: {
                            stroke: color
                        }
                    });
                    this.zr.add(poly);
                    this.zr.add(polyline);
                }
            }
            // array.forEach((item,index) => {
            //     //横坐标
            //     let x = this.getX(item.time);
            //     //上纵坐标
            //     let y = this.getY(item.v1, cellMin, cellSplit);
            //     //下纵坐标
            //     let y2 = this.getY(item.v2, cellMin, cellSplit);
            //     //绘坐标点，相同的横坐标下，有y和y2两个纵坐标的点位
            //     let circle = createFullCircle(x, y, color);
            //     let circle2 = createFullCircle(x, y2, color);
            //     this.zr.add(circle);
            //     this.zr.add(circle2);

            //     addHover(circle, this.zr, item.v1Tips);
            //     addHover(circle2, this.zr, item.v2Tips);

            //     //设置每个坐标的（x,y）为起点，(x,y2)为终点，连接起点和终点，形成封闭多边形
            //     let line = createLine(x, y, x, y2, color);
            //     this.zr.add(line);

            //     points.push([x, y]);
            // });
            // array.reverse().forEach(item => {
            //     let x = this.getX(item.time);
            //     let y = this.getY(item.v2, cellMin, cellSplit);
            //     points.push([x, y]);
            // });
            // console.log(points);

            // let poly = new zrender.Polygon({
            //     shape: {
            //         points: points
            //     },
            //     style: {
            //         fill: bgColor
            //     }
            // });
            // let polyline = new zrender.Polyline({
            //     shape: {
            //         points: points
            //     },
            //     style: {
            //         stroke: color
            //     }
            // });
            // this.zr.add(poly);
            // this.zr.add(polyline);
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
                if(text === 'H'){
                    g.position[1] = this.getY(item.y || y, cellMin, cellSplit) - 5 + 15;
                }else{
                    g.position[1] = this.getY(item.y || y, cellMin, cellSplit) - 5;
                }
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
                        },
                        zlevel: 3
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
                        position: [5, 6],
                        zlevel: 3
                    })
                );
                this.zr.add(g);
                addHover(g, this.zr, item.tips);
            });
        },
        drawText(data) {
            // let text = new zrender.Text({
            //     style: {
            //         text: data.text,
            //         textAlign: "left",
            //         textVerticalAlign: "top",
            //         textFill: data.color,
            //         textStroke: "#fff",
            //         fontWeight: "bold",
            //         textShadowColor: "#fff"
            //     },
            //     position: [this.getX(data.time), this.getY(data.position, data.cellMin, data.cellSplit)]
            // });
            let state = new zrender.Group();
            //计算文本有多少个字符/一个字符占位20px
            let newArr = data.text.split('\n');
            for(var i=0; i<newArr.length; i++){
                if(newArr[i] === ''){
                    newArr.splice(i,1);
                }
            }
            // console.log(newArr);
            let textLength = newArr.length;
            state.add(
                new zrender.Rect({
                    shape: {
                        x: 0,
                        y: 0,
                        width: 20,
                        height: 12*textLength+10    //每个字符高度12px，乘以字符长度，再加上架padding值5px
                    },
                    style: {
                        fill: "#ffffff"
                    },
                    zlevel: 0,
                    position: [this.getX(data.time)-4, this.getY(data.position, data.cellMin, data.cellSplit)-5]
                })
            );
            state.add(
                new zrender.Text({
                    style: {
                        text: data.text,
                        textAlign: "left",
                        textVerticalAlign: "top",
                        textFill: data.color,
                        textStroke: "#fff",
                        fontWeight: "bold",
                        textShadowColor: "#fff"
                    },
                    position: [this.getX(data.time), this.getY(data.position, data.cellMin, data.cellSplit)],
                    zlevel:0
                })
            );
            this.zr.add(state);
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
                // this.drawGrid();
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
        // console.log('分辨率'+window.devicePixelRatio);
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
    position: relative;
    height: 100%;
    canvas {
        width: 100%;
        height: 100%;
        position:relative;
        z-index:100;
    }
    .canvas-img{
        width: 100%;
        height: 100%;
        position:relative;
        z-index:100;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .comp-table{
        width:100%;
        height: 100%;
        position:absolute;
        top:0;
        left:0;
        z-index: 0;
        .comp-tr{
            width:100%;
            height:8px;
            overflow:hidden;
            &:nth-child(1){
                .comp-td{
                    &::before{
                        border-top:1px solid #fff;
                    }
                }
            }
            .comp-td:nth-child(6n){
                &::before{
                    border-right:2px solid #000;
                }
            }
            .comp-td:last-child{
                &::before{
                    border-right:1px solid #fff;
                }
            }
        }
        .comp-td{
            height:8px;
            width:2.3809%;
            float:left;
            position:relative;
            &::before{
                position:absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                border:{
                    top:1px solid #000;
                    right:1px solid #000;
                };
                content:"";
            }
        }
    }
}
</style>
