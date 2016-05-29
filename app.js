var App = function () {
    var g,h,y;
    var i = function () {

        g = document.getElementById('g-array').value.split(",").map( Number );
        console.log(g);

        h = document.getElementById('h-array').value.split(",").map( Number );
        console.log(h);
    },

    a = function () {
        console.log("funcion a");
    },

    e = function (array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            newArray.push(i)
        }
        console.log(newArray)
        return newArray;
    },

    t = function () {
        console.log("funcion t");
        var itemsX = [];
        var itemsY = [];
        for (var i = 0; i < 100; i++) {
            itemsX.push(i);
            itemsY.push(-50 + (Math.random() * -50));
        }
        var traceG = { x: e(g), y: g, mode: 'markers' };
        var traceH = { x: e(h), y: h, mode: 'markers' };
        var traceY = { x: itemsX, y: itemsY, mode: 'markers' };
        var dataG = [traceG], dataH = [traceH], dataY = [traceY];
        Plotly.newPlot('graph-g', dataG);
        Plotly.newPlot('graph-h', dataH);
        Plotly.newPlot('graph-y', dataY);
    }
    return {
        init: function () {
            a()
        },
        getValues: function(){
            i()
        },
        plot: function(){
            t()
        }
    }
}();
jQuery(document).ready(function () {
    App.init()
});
