let tableInventario;
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.errMode = 'throw'; //ocultar error del datatable
    tableInventario = $('#tablaInventario').dataTable({
        "Processing": true,
        "ServerSide": true,
        "ajax": {
            "url": "http://localhost:8080/inventario",//ruta de la api
            "dataSrc": ""
        },
        "columns": [
            { "data": "idpk" },
            { "data": "producto.descripcion" },
            { "data": "proveedor.nombre" },
            { "data": "stock" },
            { "data": "secursal" },
            { "data": "accion" }
        ], columnDefs: [
            { targets: 5, visible: true },
            { targets: -1,
                orderable: false,
                data: null,
                render: function (data, type, row, meta) {
                    let botones = `
                    <div class="btn-group">
                        <button onClick="ActualizarStock(`+ row.idpk + `,`+
                        row.stock + `);" class="btn btn-danger">Stock</button>
                    </div>`;
                    return botones;}}
        ],
        'dom': 'lBfrtip',
        "resonsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0, "asc"]]
    });
}, false);

window.addEventListener('load', function () {
    setTimeout(() => {
        if (document.querySelector("#formstock")) { 
        var invenId = getParameterByName('id');
        var stock = getParameterByName('stock');
        if (invenId != null ) {
            document.querySelector('#idinvent').value = invenId;
            document.querySelector('#numStock').value = stock;
        }
        Actualizar();
    }
    }, 500);
    GuardarInventario();
}, false);

function GuardarInventario() {
    if (document.querySelector("#formInventario")) { //validamos que exista el formulario
        let formProductos = document.querySelector("#formInventario"); //seleccionamos el formulario
        formProductos.onsubmit = function (e) {
            e.preventDefault(); //evitamos que recargue la pagina al precionar el boton
            let idproducto = document.querySelector('#intproducto').value;
            let idproveedor = document.querySelector('#intproveedor').value;
            let idsucursal = document.querySelector('#numSucursal').value;
            let stock = document.querySelector('#numStock').value;
            if (idproducto == '' || idproveedor == '' || idsucursal == '' || stock == '') {
                let error = document.getElementById('alertError');
                error.innerHTML = 'Todos los campos son obligatorios.'
                error.style.display = 'flex';
                return false;
            } let request = (window.XMLHttpRequest) ?
                new XMLHttpRequest() :
                new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = 'http://localhost:8080/inventario'; //rutas api metodo post
            let json = JSON.stringify({producto:{idpk: parseInt(idproducto)}, 
                proveedor:{idpk:parseInt(idproveedor)}, 
                secursal:parseInt(idsucursal), stock: parseInt(stock) }) //creamos un json
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Accept", "*/*");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(json);
            request.onreadystatechange = function () {
                if (request.status == 200) {
                    let exito = document.getElementById('alertSuccess');  //mensajes de exito
                    exito.innerHTML = 'Muy Bien, Se Guardo el Inventario Correctamente.'
                    exito.style.display = 'flex';
                    window.location.href = "/Vista/Inventario.html";
                } else {
                    let error = document.getElementById('alertError');  //mensajes de error
                    error.innerHTML = 'Error !! No se puedo Guardar el Inventario'
                    error.style.display = 'flex';
                    return false;
                }
                return false;
            }
        }
    }
}


function ActualizarStock(idpk,stock) {
    window.location.href = "/Vista/actualizarStock.html?id="+idpk+"&stock="+stock;
               
}
function Actualizar() {
    if (document.querySelector("#formstock")) { //validamos que exista el formulario
       let formProductos = document.querySelector("#formstock"); //seleccionamos el formulario
       formProductos.onsubmit = function (e) {
           e.preventDefault(); //evitamos que recargue la pagina al precionar el boton
           let idinvent= document.querySelector('#idinvent').value;
           let stock = document.querySelector('#numStock').value;
           if (idinvent == '' ||  stock == '') {
               let error = document.getElementById('alertError');
               error.innerHTML = 'Todos los campos son obligatorios.'
               error.style.display = 'flex';
               return false;
           }
           let request = (window.XMLHttpRequest) ?
               new XMLHttpRequest() :
               new ActiveXObject('Microsoft.XMLHTTP');
           let ajaxUrl = 'http://localhost:8080/inventario'; //rutas api metodo post
           let json = JSON.stringify({idpk:idinvent, stock:stock }) //creamos un json
           request.open("PUT", ajaxUrl, true);
           request.setRequestHeader("Content-Type", "application/json");
           request.send(json);
           request.onreadystatechange = function () {
               if (request.status == 200) {
                   let exito = document.getElementById('alertSuccess');  //mensajes de exito
                   exito.innerHTML = 'Muy Bien, Se Actualizo el Inventario Correctamente.'
                   exito.style.display = 'flex';
                   window.location.href = "/Vista/Inventario.html";
               } else {
                   let error = document.getElementById('alertError');  //mensajes de error
                   error.innerHTML = 'Error !! No se puedo Actualizar el Inventario'
                   error.style.display = 'flex';
                   return false;
               }
               return false;
           }
       }
   }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}