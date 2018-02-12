
var matriz = [];
var anagrama=[];

$(document).ready(function(){
            console.log("Iniciando");
});

function procesarTexto(){
    var texto = $("#campo1").val();
    if(texto !=='' && texto!== null){
        if(texto.length==4){
            limpiarArea();
            calcularAnagrama(texto);
        }
        else{
            alert("La palabra debe ser de 4 caracteres");
        }
    }
    else{
        alert("Ingrese un texto");
    }
}

function calcularAnagrama(texto){
    matriz = crearMatriz(texto);
    agregarAnagramas(matriz);
    for(var etapa=0;etapa<2;etapa++){
        for(var cont=1;cont<matriz.length;cont++){
            for(var cont2=cont+1;cont2<matriz.length;cont2++){
                matriz=intercambiarColumnas(matriz,cont,cont2);
                agregarAnagramas(matriz);
            }
        }
    }
    
    imprimir(anagrama);
}

function recorrer(texto){
    var arr = texto.split("");
    
    for(var cont=1;cont<arr.length;cont++){
        var aux = arr[0];
        arr[0]=arr[cont];
        arr[cont]=aux;
    }
    return arr.join("");
}    

function crearMatriz(texto){
    var arr = [];
    arr[0] = texto.split("");
    for(var cont=1;cont<texto.length;cont++){
        texto = recorrer(texto);
        arr[cont] = texto.split("");
    }
    return arr;
}

function contiene(texto){
    return (anagrama.includes(texto));
}

function agregarAnagramas(matriz){
    for(var cont=0;cont<matriz.length;cont++){
        if(!contiene(matriz[cont].join(""))){
            anagrama.push(matriz[cont].join(""));
        }
    }
}

function intercambiarColumnas(matriz,col1,col2){
   
    for(var cont=0;cont<matriz[0].length;cont++){
        var aux = matriz[cont][col1];
        matriz[cont][col1]=matriz[cont][col2];
        matriz[cont][col2]=aux;
    }
    return matriz;
}

function obtenerNumAnagramas(longitud){
    var sum=1;
    for(cont=longitud;cont>=1;cont--){
        sum=sum*cont;
    }
    return sum;
}

function imprimir(matriz){
    var html='<div class="card" style="width: 18rem;text-align:center"><div class="card-header">Anagramas</div><ul class="list-group list-group-flush">';
    for(var cont=0;cont<matriz.length;cont++){
        html=html+'<li class="list-group-item">'+matriz[cont]+'</li>';
    }
    html=html+'</ul></div>';
    $("#resultados").css("overflow-y","scroll");
    $("#resultados").append(html);
}

function limpiarArea(){
    $("#resultados").empty();
    $("#resultados").css("overflow-y","visible");
    matriz = [];
    anagrama = [];
}
