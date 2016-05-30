var App = function () {
    var g = [], h = [], y = [], g_origen = 0, h_origen = 0, y_origen = 0, matriz = [];
    var getValues = function () {

        g = document.getElementById('g-array').value.split(",").map( Number );
        g_origen = parseInt(document.getElementById('g-origen').value);
        console.log("secuencias originales");
        console.log(g);

        h = document.getElementById('h-array').value.split(",").map( Number );
        h_origen = parseInt(document.getElementById('h-origen').value);
        console.log(h);
        console.log("\n");
    },

    rellenarConCeros = function(array,opt){
        switch (opt) {
            case 1:
            for (var i = array.length; i < h.length; i++) {
                g.push(0);
            }
            break;
            case 2:
            for (var i = array.length; i < g.length; i++) {
                h.push(0);
            }
            break;
        }
        console.log("secuencias complementos a ceros");
        console.log(g);
        console.log(h);
        console.log("\n");

    },
    llenarMatriz = function(){
        console.log("matriz");
        for (var i = 0; i < h.length; i++) {
            var c = [];
            for (var j = 0, k = h.length; j < h.length; j++, k--) {
                var a = h[i-j], b, q = i;
                while ( j != i && i == q){
                    q++;
                    b = h[ k + i ];
                }
                c.push( a != undefined ? a : b );
            }
            matriz.push(c);
            console.log(matriz[i]);
        }
        convolucion();
    },
    convolucion = function(){
        console.log("resultado");
        var elemento = document.getElementById('y-array');
        for (var i = 0; i < g.length; i++) {
            var operacion = 0;
            for (var j = 0; j < g.length; j++)
                operacion += g[i]*matriz[j][i];
            y.push(operacion);
        }

        console.log(y);
        elemento.value = y;
    },
    i = function () {
        g = [];h = []; y=[]; g_origen = 0; h_origen = 0; y_origen = 0; matriz = [];
        getValues();
        g.length >= h.length ? rellenarConCeros(h,2) : rellenarConCeros(g,1);
        llenarMatriz('h');
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

        var itemsX = [], itemsY = [];
        for (var i = 0; i < 100; i++) {
            itemsX.push(i);
            itemsY.push(-50 + (Math.random() * -50));
        }
        var traceG = { x: e(g), y: g, mode: 'markers' };
        var traceH = { x: e(h), y: h, mode: 'markers' };
        var traceY = { x: e(y), y: y, mode: 'markers' };

        var dataG = [traceG], dataH = [traceH], dataY = [traceY];

        Plotly.newPlot('graph-g', dataG);
        Plotly.newPlot('graph-h', dataH);
        Plotly.newPlot('graph-y', dataY);
    }
    return {
        init: function () {

        },
        hacerConvolucion: function(){
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
