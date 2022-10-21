let tableCitas;
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.errMode = 'throw'; //ocultar error del datatable
    tableCitas = $('#tablaCitas').dataTable({
        "Processing": true,
        "ServerSide": true,
        "ajax": {
            "url": "http://localhost:8080/citas",//ruta de la api
            "dataSrc": ""
        },
        "columns": [
            { "data": "idmd" },
            { "data": "medicamento.descripcion" },
            { "data": "paciente.nombre" },
            { "data": "consultorio" },
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
                        <button onClick="ActualizarConsultorio(`+ row.idmd + `,`+
                        row.consultorio + `);" class="btn btn-danger">Consultorio</button>
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
        if (document.querySelector("#formconsultorio")) { 
        var citId = getParameterByName('id');
        var consultorio = getParameterByName('consultorio');
        if (citId != null ) {
            document.querySelector('#idcit').value = citId;
            document.querySelector('#numConsultorio').value = consultorio;
        }
        Actualizar();
    }
    }, 500);
    GuardarCitas();
}, false);

function GuardarCitas() {
    if (document.querySelector("#formCitas")) { //validamos que exista el formulario
        let formMedicamento = document.querySelector("#formCitas"); //seleccionamos el formulario
        formMedicamento.onsubmit = function (e) {
            e.preventDefault(); //evitamos que recargue la pagina al precionar el boton
            let idmedicamento = document.querySelector('#intmedicamento').value;
            let idpaciente = document.querySelector('#intpaciente').value;
            let idsucursal = document.querySelector('#numSucursal').value;
            let consultorio = document.querySelector('#numConsultorio').value;
            if (idmedicamento == '' || idpaciente == '' || idsucursal == '' || consultorio == '') {
                let error = document.getElementById('alertError');
                error.innerHTML = 'Todos los campos son obligatorios.'
                error.style.display = 'flex';
                return false;
            } let request = (window.XMLHttpRequest) ?
                new XMLHttpRequest() :
                new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = 'http://localhost:8080/citas'; //rutas api metodo post
            let json = JSON.stringify({medicamento:{idpk: parseInt(idmedicamento)}, 
                paciente:{idpk:parseInt(idpaciente)}, 
                secursal:parseInt(idsucursal), consultorio: parseInt(consultorio) }) //creamos un json
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Accept", "*/*");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(json);
            request.onreadystatechange = function () {
                if (request.status == 200) {
                    let exito = document.getElementById('alertSuccess');  //mensajes de exito
                    exito.innerHTML = 'Muy Bien, Se Guardo la Cita Correctamente.'
                    exito.style.display = 'flex';
                    window.location.href = "/Vista/Citas.html";
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


function ActualizarConsultoriok(idpk,consultorio) {
    window.location.href = "/Vista/actualizarConsultorio.html?id="+idpk+"&consultorio="+consultorio;
               
}
function Actualizar() {
    if (document.querySelector("#formcolsutorio")) { //validamos que exista el formulario
       let formMedicamento = document.querySelector("#formconsultorio"); //seleccionamos el formulario
       formMedicamento.onsubmit = function (e) {
           e.preventDefault(); //evitamos que recargue la pagina al precionar el boton
           let idcit= document.querySelector('#idcit').value;
           let consultorio = document.querySelector('#numColsultorio').value;
           if (idcit == '' ||  consultorio == '') {
               let error = document.getElementById('alertError');
               error.innerHTML = 'Todos los campos son obligatorios.'
               error.style.display = 'flex';
               return false;
           }
           let request = (window.XMLHttpRequest) ?
               new XMLHttpRequest() :
               new ActiveXObject('Microsoft.XMLHTTP');
           let ajaxUrl = 'http://localhost:8080/citas'; //rutas api metodo post
           let json = JSON.stringify({idpk:idcit, consultorio:consultorio }) //creamos un json
           request.open("PUT", ajaxUrl, true);
           request.setRequestHeader("Content-Type", "application/json");
           request.send(json);
           request.onreadystatechange = function () {
               if (request.status == 200) {
                   let exito = document.getElementById('alertSuccess');  //mensajes de exito
                   exito.innerHTML = 'Muy Bien, Se Actualizo la Cita Correctamente.'
                   exito.style.display = 'flex';
                   window.location.href = "/Vista/Citas.html";
               } else {
                   let error = document.getElementById('alertError');  //mensajes de error
                   error.innerHTML = 'Error !! No se puedo Actualizar la Cita'
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