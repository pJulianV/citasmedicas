let tableMedicamento;
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.errMode = 'throw'; //ocultar error del datatable
    tableMedicamento = $('#tablaMedicamento').dataTable({
        "Processing": true,
        "ServerSide": true,
        "ajax": {
            "url": "http://localhost:8080/medicamento",//ruta de la api
            "dataSrc": ""
        },
        "columns": [
            { "data": "idmed" },
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
                    <button onClick="EditarMedica(`+ row.idmd + `,'` + row.descripcion + `',` + row.costo + `);" class="btn btn-primary">Editar</button>
                    <button onClick="eliminarMedica(`+ row.idmd + `);" class="btn btn-danger">Eliminar</button>
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

window.addEventListener('load', function () {
    setTimeout(() => {
        if (document.querySelector("#formMedicamentos")) { 
        var medId = getParameterByName('id');
        var descripcion = getParameterByName('descripcion');
        var costo = getParameterByName('costo');
        if (medId != null || prodId != '' || descripcion != '') {
            document.querySelector('#idmedicamento').value = medId;
            document.querySelector('#textDescripcion').value = descripcion;
            document.querySelector('#numCosto').value = costo;
        }
    }
        GuardarMedicamento();
    }, 500);
}, false);
function GuardarMedicamento() {
    if (document.querySelector("#formMedicamentos")) { //validamos que exista el formulario
        let formMedicamentos = document.querySelector("#formMedicamentos"); //seleccionamos el formulario
        formMedicamentos.onsubmit = function (e) {
            e.preventDefault(); //evitamos que recargue la pagina al precionar el boton
            let id = document.querySelector('#idmedicamento').value;
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
            let ajaxUrl = 'http://localhost:8080/medicamento'; //rutas api metodo post
            let json = JSON.stringify({ idmd: id, descripcion: strDescrip, costo: intCost }) //creamos un json
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(json);
            request.onreadystatechange = function () {
                if (request.status == 200) {
                    let exito = document.getElementById('alertSuccess');  //mensajes de exito
                    exito.innerHTML = 'Muy Bien, Se Guardo un Medicamento Correctamente.'
                    exito.style.display = 'flex';
                    window.location.href = "/Vista/Medicamentos.html";
                } else {
                    let error = document.getElementById('alertError');  //mensajes de error
                    error.innerHTML = 'Error !! No se puedo Guardar el Medicamento'
                    error.style.display = 'flex';
                    return false;
                }
                return false;
            }
        }
    }
}
function EditarMedica(id, descripcion, costo) {
    window.location.href = "/Vista/nuevoMedicamento.html?id=" + id + "&descripcion=" + descripcion + "&costo=" + costo;
}
function eliminarMedica(id) {
    window.confirm("Esta seguro de Eliminar este Medicamento");
    let request = (window.XMLHttpRequest) ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = 'http://localhost:8080/medicamento/' + id; //rutas api metodo post
    request.open("DELETE", ajaxUrl);
    request.setRequestHeader("Accept", "*/*");
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    request.onreadystatechange = function () {
        if (request.status === 4) {
            let error = document.getElementById('alertSuccessmenu');  //mensajes de error
            error.innerHTML = 'Muy Bien , Medicamento Eliminado'
            error.style.display = 'flex';
            window.location.reload();
        }else{
            let error = document.getElementById('alertErrormenu');  //mensajes de error
            error.innerHTML = 'Error !! No se puedo Eliminar el Medicamento'
            error.style.display = 'flex';
            window.location.reload();
        }
        return false;  
   }
}

$("#tablaMedicamento").DataTable();
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}