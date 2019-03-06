import zrender from "zrender";
/* eslint-disable */
let div = document.createElement("div");
div.id = "canvas_hover";
document.body.appendChild(div);
let canvas;
export const addHover = (node, zr, text) => {
    node.on("mouseover", function() {
        if (!canvas) {
            canvas = document.querySelector("canvas");
        }
        let pos = canvas.getBoundingClientRect();
        let x;
        let y;
        let left =
            pos.left + document.documentElement.scrollLeft ||
            document.body.scrollLeft;
        let top =
            pos.top + document.documentElement.scrollTop ||
            document.body.scrollTop;
        if (node._rect) {
            x = left + node.shape.cx + "px";
            y = top + node.shape.cy - 5 + "px";
        } else {
            x = left + node.position[0] + "px";
            y = top + node.position[1] - 5 + "px";
        }
        if (text) {
            div.innerHTML = text;
            div.style.left = x;
            div.style.top = y;
            div.style.display = "block";
        }
    });
    node.on("mouseout", function() {
        div.style.display = "none";
    });
};

export const createFullCircle = (cx = 0, cy = 0, color = "#000") => {
    return new zrender.Circle({
        shape: {
            cx: cx,
            cy: cy,
            r: 4
        },
        style: {
            fill: color
        },
        zlevel: 2
    });
};

export const createEmptyCircle = (cx = 0, cy = 0, color = "#000", r = 3) => {
    return new zrender.Circle({
        shape: {
            cx: cx,
            cy: cy,
            r: r
        },
        style: {
            stroke: color,
            fill: "rgba(255,255,255,1)"
        },
        zlevel: 2
    });
};

export const createXShape = (cx = 0, cy = 0, color = "#000") => {
    var g = new zrender.Group({
        zlevel: 2
    });
    g.position[0] = cx - 4;
    g.position[1] = cy - 4;
    g.add(
        new zrender.Rect({
            shape: {
                x: 0,
                y: 0,
                width: 8,
                height: 8
            },
            style: {
                fill: "rgba(255,255,255,0)"
            },
            zlevel: 2
        })
    );
    g.add(createLine(0, 0, 8, 8, color));
    g.add(createLine(8, 0, 0, 8, color));
    return g;
};

export const createXCircleShape = (cx = 0, cy = 0, color = "#000") => {
    var g = new zrender.Group({
        zlevel: 2
    });
    g.position[0] = cx - 4;
    g.position[1] = cy - 4;

    g.add(
        new zrender.Circle({
            shape: {
                cx: 4,
                cy: 4,
                r: 3
            },
            style: {
                fill: `rgba(255,255,255,1)`,
                stroke: color
            }
        })
    );

    g.add(createLine(2, 2, 6, 6, color));
    g.add(createLine(6, 2, 2, 6, color));
    return g;
};

export const createShape = (cx = 0, cy = 0, color = "#000", shape) => {
    if (shape === "empty-circle") {
        return createEmptyCircle(cx, cy, color);
    } else if (shape === "x") {
        return createXShape(cx, cy, color);
        // return createXCircleShape(cx, cy, color);
    }else if(shape === "x-circle"){
        return createXCircleShape(cx, cy, color);
    } else {
        return createFullCircle(cx, cy, color);
    }
};

/**
 * 
 * @param {*} x1 起始坐标横坐标
 * @param {*} y1 起始坐标纵坐标
 * @param {*} x2 
 * @param {*} y2 
 * @param {*} color 
 * @param {*} lineWidth 
 */
export const createLine = (x1, y1, x2, y2, color = "#000", lineWidth = 2,zIndex = 2) => {
    return new zrender.Line({
        shape: {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        },
        style: {
            stroke: color,
            lineWidth: lineWidth
        },
        zlevel: zIndex
    });
};

export const createDashLine = (
    x1,
    y1,
    x2,
    y2,
    color = "#000",
    lineDash = [2, 2]
) => {
    return new zrender.Line({
        shape: {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        },
        style: {
            stroke: color,
            lineDash
        }
    });
};
