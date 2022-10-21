/* $(document).ready( function () {
    $('#tablaProducto').DataTable();
} ); */

let tableProducto;
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.errMode = 'throw'; //ocultar error del datatable
    tableProducto = $('#tablaProducto').dataTable({
        "Processing": true,
        "ServerSide": true,
        "ajax": {
            "url": "http://localhost:8080/producto",//ruta de la api
            "dataSrc": ""
        },
        "columns": [
            { "data": "idpk" },
            { "data": "descripcion" },
            { "data": "costo" },
            { "data": "accion" }
        ],
        columnDefs: [
            { targets: 3, visible: true },
            {
                targets: -1,
                orderable: false,
                data: null,
                render: function (data, type, row, meta) {
                    let botones = `
                    <div class="btn-group">
                    <button onClick="EditarProdu(`+ row.idpk + `,'` + row.descripcion + `',` + row.costo + `);" class="btn btn-primary">Editar</button>
                    <button onClick="eliminarProd(`+ row.idpk + `);" class="btn btn-danger">Eliminar</button>
                    </div>`;
                    return botones;
                }
            }
        ],
        'dom': 'lBfrtip',
        "resonsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0, "asc"]]
    });


}, false);

/* function EditarProdu() {
    alert("Editar Producto");
}

function eliminarProd() {
    alert("Eliminar Producto");
}
$("#tablaProducto").Database(); */



window.addEventListener('load', function () {
    setTimeout(() => {
        if (document.querySelector("#formProductos")) { 
        var prodId = getParameterByName('id');
        var descripcion = getParameterByName('descripcion');
        var costo = getParameterByName('costo');
        if (prodId != null || prodId != '' || descripcion != '') {
            document.querySelector('#idproducto').value = prodId;
            document.querySelector('#textDescripcion').value = descripcion;
            document.querySelector('#numCosto').value = costo;
        }
    }
        GuardarProducto();
    }, 500);
}, false);
function GuardarProducto() {
    if (document.querySelector("#formProductos")) { //validamos que exista el formulario
        let formProductos = document.querySelector("#formProductos"); //seleccionamos el formulario
        formProductos.onsubmit = function (e) {
            e.preventDefault(); //evitamos que recargue la pagina al precionar el boton
            let id = document.querySelector('#idproducto').value;
            let strDescrip = document.querySelector('#textDescripcion').value;
            let intCost = document.querySelector('#numCosto').value;

            if (strDescrip == '' || intCost == '') {
                let error = document.getElementById('alertError');
                error.innerHTML = 'Todos los campos son obligatorios.'
                error.style.display = 'flex';
                return false;
            }
            let request = (window.XMLHttpRequest) ?
                new XMLHttpRequest() :
                new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = 'http://localhost:8080/producto'; //rutas api metodo post
            let json = JSON.stringify({ idpk: id, descripcion: strDescrip, costo: intCost }) //creamos un json
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(json);
            request.onreadystatechange = function () {
                if (request.status == 200) {
                    let exito = document.getElementById('alertSuccess');  //mensajes de exito
                    exito.innerHTML = 'Muy Bien, Se Guardo un Producto Correctamente.'
                    exito.style.display = 'flex';
                    window.location.href = "/Vista/Productos.html";
                } else {
                    let error = document.getElementById('alertError');  //mensajes de error
                    error.innerHTML = 'Error !! No se puedo Guardar el Producto'
                    error.style.display = 'flex';
                    return false;
                }
                return false;
            }
        }
    }
}
function EditarProdu(id, descripcion, costo) {
    window.location.href = "/Vista/nuevoProducto.html?id=" + id + "&descripcion=" + descripcion + "&costo=" + costo;
}
function eliminarProd(id) {
    window.confirm("Esta seguro de Eliminar este Producto");
    let request = (window.XMLHttpRequest) ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = 'http://localhost:8080/producto/' + id; //rutas api metodo post
    request.open("DELETE", ajaxUrl);
    request.setRequestHeader("Accept", "*/*");
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    request.onreadystatechange = function () {
        if (request.status === 4) {
            let error = document.getElementById('alertSuccessmenu');  //mensajes de error
            error.innerHTML = 'Muy Bien , Producto Eliminado'
            error.style.display = 'flex';
            window.location.reload();
        }else{
            let error = document.getElementById('alertErrormenu');  //mensajes de error
            error.innerHTML = 'Error !! No se puedo Eliminar el Producto'
            error.style.display = 'flex';
            window.location.reload();
        }
        return false;  
   }
}

$("#tablaProducto").DataTable();
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}