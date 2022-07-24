import { v4 as uuidv4 } from 'uuid';
export default {

    lerp: (x, y, a) => x * (1 - a) + y * a,
    clamp: (a, min = 0, max = 1) => Math.min(max, Math.max(min, a)),
    invlerp: (x, y, a) => utils.clamp((a - x) / (y - x)),
    sleep: async function (time) {

        return new Promise(resolve => setTimeout(resolve, time))

    },
    trackTransforms(ctx) {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        let xform = svg.createSVGMatrix();
        ctx.getTransform = function () { return xform; };

        let savedTransforms = [];
        let save = ctx.save;
        ctx.save = function () {
            savedTransforms.push(xform.translate(0, 0));
            return save.call(ctx);
        };
        let restore = ctx.restore;
        ctx.restore = function () {
            xform = savedTransforms.pop();
            return restore.call(ctx);
        };

        let scale = ctx.scale;
        ctx.scale = function (sx, sy) {
            xform = xform.scaleNonUniform(sx, sy);
            return scale.call(ctx, sx, sy);
        };
        let rotate = ctx.rotate;
        ctx.rotate = function (radians) {
            xform = xform.rotate(radians * 180 / Math.PI);
            return rotate.call(ctx, radians);
        };
        let translate = ctx.translate;
        ctx.translate = function (dx, dy) {
            xform = xform.translate(dx, dy);
            return translate.call(ctx, dx, dy);
        };
        let transform = ctx.transform;
        ctx.transform = function (a, b, c, d, e, f) {
            let m2 = svg.createSVGMatrix();
            m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
            xform = xform.multiply(m2);
            return transform.call(ctx, a, b, c, d, e, f);
        };
        let setTransform = ctx.setTransform;
        ctx.setTransform = function (a, b, c, d, e, f) {
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;
            return setTransform.call(ctx, a, b, c, d, e, f);
        };
        let pt = svg.createSVGPoint();
        ctx.transformedPoint = function (x, y) {
            pt.x = x; pt.y = y;
            return pt.matrixTransform(xform.inverse());
        }
    },
    getMouseCoords(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        return [x, y]
    },
    getUniqueId: function () {

        return String(uuidv4())
    },
    getRandomColor() {
        var letters = '0123456789ABCDEF',
            color = '#';

        for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];

        return color;
    },
    checckInsidePoints(point, boundary) {
        if (
            point[0] > boundary[0] &&
            point[0] < boundary[1] &&
            point[1] > boundary[2] &&
            point[1] < boundary[3]
        ) return true
        else false
    }
}