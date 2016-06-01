var App = function () {
    var g = [], h = [], y = [], g_origen = 0, h_origen = 0, y_origen = 0, h_periodo = 2, matriz = [];
    var CONVOLUCION_FINITA = 1, CONVOLUCION_PERIODICA = 2, CONVOLUCION_CIRCULAR = 3, convolucion_a_realizar = CONVOLUCION_FINITA;
    var getValues = function () {

        g = document.getElementById('g-array').value.split(",").map( Number );
        g_origen = parseInt(document.getElementById('g-origen').value);
        console.log("secuencias originales");
        console.log(g);

        h = document.getElementById('h-array').value.split(",").map( Number );
        h_origen = parseInt(document.getElementById('h-origen').value);
        console.log(h);
        console.log("\n");

        h_periodo = parseInt(document.getElementById('h-periodo').value);

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
        multiplicacion();
    },
    multiplicacion = function(){
        console.log("resultado");
        var elemento = document.getElementById('y-array');
        for (var i = 0; i < g.length; i++) {
            var operacion = 0;
            for (var j = 0; j < g.length; j++)
                operacion += g[j]*matriz[i][j];
            y.push(operacion);
        }

        y_origen = g_origen + h_origen;

        document.getElementById('y-origen').value = y_origen;
        console.log(y);
        switch (convolucion_a_realizar) {
            case CONVOLUCION_FINITA:
                convolucionFinita(elemento);
                break;
            case CONVOLUCION_PERIODICA:
                convolucionPeriodica(elemento);
                break;
            case CONVOLUCION_CIRCULAR:
                convolucionCircular(elemento);
                break;
        }
    },
    convolucionFinita = function(elemento){
        elemento.value = y;
    },
    convolucionPeriodica = function(elemento){

        if(h_origen % y.length != 0)
            return;

        var nuevoY = [];

        for (var i = 0; i < h_periodo; i++) {
            nuevoY[i] = 0;

        }

        for (var i = 0, j = 1; i < y.length; i++,j++) {
            if (j <= h_periodo)
                {
            //        nuevoY[j-1] += y[j];

                    console.log("entró a if " + j);
                }
            else{
                j = 1;
                console.log("entró a else " + j);
            }

            nuevoY[j-1] += y[i];
            if (j == 1) {
                console.log(nuevoY[j-1]);
            }

        }

        y = nuevoY;
        console.log(nuevoY);
        elemento.value = y;
    },
    convolucionCircular = function(elemento){

        elemento.value = y;
    },
    resetValues = function(){
        g = [];h = []; y=[]; g_origen = 0; h_origen = 0; y_origen = 0, h_periodo = 2; matriz = [];
    },
    i = function () {
        resetValues();
        getValues();
        g.length >= h.length ? rellenarConCeros(h,2) : rellenarConCeros(g,1);
        llenarMatriz();
    },

    e = function (array, origen) {
        var newArray = [];
        for (var i = -origen; i < array.length; i++)
        newArray.push(i)
        console.log(newArray)
        return newArray;
    },

    t = function () {

        var itemsX = [], itemsY = [];
        for (var i = 0; i < 100; i++) {
            itemsX.push(i);
            itemsY.push(-50 + (Math.random() * -50));
        }

        var traceG = { x: e(g, g_origen), y: g, mode: 'markers' };
        var traceH = { x: e(h, h_origen), y: h, mode: 'markers' };
        var traceY = { x: e(y, y_origen), y: y, mode: 'markers' };

        var dataG = [traceG], dataH = [traceH], dataY = [traceY];

        Plotly.newPlot('graph-g', dataG);
        Plotly.newPlot('graph-h', dataH);
        Plotly.newPlot('graph-y', dataY);
    },
    j = function(){
        $('input[name="optradio"]').change(function(e) {
            switch ($(this).val()) {
                case "finita":
                    convolucion_a_realizar = CONVOLUCION_FINITA;
                    break;
                case "periodica":
                    convolucion_a_realizar = CONVOLUCION_PERIODICA;
                    break;
                case "circular":
                    convolucion_a_realizar = CONVOLUCION_CIRCULAR;
                    break;
            }
            resetValues();
        });
    }
    return {
        init: function () {
            j()
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
