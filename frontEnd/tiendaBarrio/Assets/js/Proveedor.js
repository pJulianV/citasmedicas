let tablaProveedor;
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.errMode = 'throw'; //ocultar error del datatable
    tablaProveedor = $('#tablaProveedor').dataTable({
        "Processing": true,
        "ServerSide": true,
        "ajax": {
            "url": "http://localhost:8080/proveedor",//ruta de la api
            "dataSrc": ""
        },
        "columns": [
            { "data": "idpk" },
            { "data": "nombre" },
            { "data": "nit" },
            { "data": "telefono" },
            { "data": "accion" }
        ], columnDefs: [
            { targets: 4, visible: true },
            {
                targets: -1,
                orderable: false,
                data: null,
                render: function (data, type, row, meta) {
                    let botones = `
                    <div class="btn-group">
                    <button onClick="EditarProv(`+ row.idpk + `,'` + row.nombre + `','` +
                     row.nit + `','` + row.telefono + `');" class="btn btn-primary">Editar</button>
                    <button onClick="eliminarProv(`+ row.idpk + `);" class="btn btn-danger">Eliminar</button>
                    </div>`;
                    return botones; } }
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
        if (document.querySelector("#formProveedor")) { 
        var id = getParameterByName('id');
        var nom = getParameterByName('nom');
        var nit = getParameterByName('nit');
        var tel = getParameterByName('tel');
        if (id != '' || nom != '' || nit != '' || tel != '') {
            document.querySelector('#idproveedor').value = id;
            document.querySelector('#textnombre').value = nom;
            document.querySelector('#textNit').value = nit;
            document.querySelector('#telefono').value = tel;
        }
    }
  
    }, 500);
    GuardarProveedor();
}, false);

function GuardarProveedor() {
    if (document.querySelector("#formProveedor")) { //validamos que exista el formulario
        let formProductos = document.querySelector("#formProveedor"); //seleccionamos el formulario
        formProductos.onsubmit = function (e) {
            e.preventDefault(); //evitamos que recargue la pagina al precionar el boton
            let id = document.querySelector('#idproveedor').value;
            let nombre = document.querySelector('#textnombre').value;
            let nit = document.querySelector('#textNit').value;
            let tel = document.querySelector('#telefono').value;
            if (nombre == '' || nit == '') {
                let error = document.getElementById('alertError');
                error.innerHTML = 'Todos los campos son obligatorios.'
                error.style.display = 'flex';
                return false; }
            let request = (window.XMLHttpRequest) ?
                new XMLHttpRequest() :
                new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = 'http://localhost:8080/proveedor'; //rutas api metodo post
            let json = JSON.stringify({ idpk: id, nombre: nombre, nit: nit,telefono:tel }) //creamos un json
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(json);
            request.onreadystatechange = function () {
                if (request.status == 200) {
                    let exito = document.getElementById('alertSuccess');  //mensajes de exito
                    exito.innerHTML = 'Muy Bien, Se Guardo un Proveedor Correctamente.'
                    exito.style.display = 'flex';
                    window.location.href = "/Vista/Proveedores.html";
                } else {
                    let error = document.getElementById('alertError');  //mensajes de error
                    error.innerHTML = 'Error !! No se puedo Guardar el Proveedor'
                    error.style.display = 'flex';
                    return false;
                }
                return false;
            }
        }
    }
}

function EditarProv(id,nom,nit,tel){
    window.location.href = "/Vista/nuevoProveedor.html?id=" + id + "&nom=" + nom + "&nit=" + 
                            nit+ "&tel=" + tel;
}
function eliminarProv(idpk){
        window.confirm("Esta seguro de Eliminar este Proveedor?");
        let request = (window.XMLHttpRequest) ?
            new XMLHttpRequest() :
            new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = 'http://localhost:8080/proveedor/' + idpk; //rutas api metodo post
        request.open("DELETE", ajaxUrl);
        request.setRequestHeader("Accept", "*/*");
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
        request.onreadystatechange = function () {
            if (request.status === 200) {
                let error = document.getElementById('alertSuccessmenu');  //mensajes de error
                error.innerHTML = 'Muy Bien , Proveedor Eliminado'
                error.style.display = 'flex';
                Window.confirm('Proveedor Eliminado');
                window.location.reload();
            }else{
                let error = document.getElementById('alertErrormenu');  //mensajes de error
                error.innerHTML = 'Error !! No se puedo Eliminar el Proveedor'
                error.style.display = 'flex';    
            }
            return false;  
       }
    
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}