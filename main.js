$(document).ready(function() {    
    $('#example').DataTable({        
        language: {
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sSearch": "Buscar:",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast":"Último",
                    "sNext":"Siguiente",
                    "sPrevious": "Anterior"
			     },
			     "sProcessing":"Procesando...",
            },
        //para usar los botones   
        responsive: "true",
        dom: 'Bfrtilp',       
        buttons:[ 
			{
				extend:    'excelHtml5',
				text:      '<i class="fas fa-file-excel"></i> ',
				titleAttr: 'Exportar a Excel',
				className: 'btn btn-success'
			},
			{
				extend:    'pdfHtml5',
				text:      '<i class="fas fa-file-pdf"></i> ',
				titleAttr: 'Exportar a PDF',
				className: 'btn btn-danger'
			},
			{
				extend:    'print',
				text:      '<i class="fa fa-print"></i> ',
				titleAttr: 'Imprimir',
				className: 'btn btn-info'
			},
		]	        
    });    
	$("#btnAgregar").click(function (e) {
        insert();
      });
      function insert() {
        var datos = new FormData();
        datos.append(`nombre`, $("#txtNombre").val());
        datos.append(`precio`, $("#txtPrecio").val());

        console.log(datos.get("nombre"));
        console.log(datos.get("precio"));

        $.ajax({
          type: "post",
          url: "index.php?accion=insertar",
          data: datos,
          processData: false,
          contentType: false,
          success: function (respuesta) {
            console.log(respuesta);
            consultarDatos();
          },
        });
      } 
	  $("#btnAgregar").click(function (e) {
        insert();
      });
      function insert() {
        var datos = new FormData();
        datos.append(`nombre`, $("#txtNombre").val());
        datos.append(`precio`, $("#txtPrecio").val());

        console.log(datos.get("nombre"));
        console.log(datos.get("precio"));

        $.ajax({
          type: "post",
          url: "index.php?accion=insertar",
          data: datos,
          processData: false,
          contentType: false,
          success: function (respuesta) {
            console.log(respuesta);
            consultarDatos();
          },
        });
      }
      function consultarDatos() {
        $("#registros").empty();
        $.getJSON("index.php", function (registros) {
          var mochilas = [];
          $.each(registros, function (llave, valor) {
            if (llave > 0) {
              var template = "<tr>";
              template += "<td>" + valor.id + "</td>";
              template += "<td>" + valor.nombre + "</td>";
              template += "<td>" + valor.precio + "</td>";
              template +=
                '<td><input class="btn btn-info" type="button" onclick="seleccionar(' +
                valor.id +
                ')"value="Seleccionar" />';
              template +=
                '<input class="btn btn-danger" type="button" onclick="borrar(' +
                valor.id +
                ')"value="Borrar" /></td>';
              template += "</tr>";

              mochilas.push(template);
            }
          });
          $("#registros").append(mochilas.join(""));
          console.log(registros);
        });
      }
      consultarDatos();
      function borrar(id) {
        $.get("index.php?borrar=" + id, function () {
          consultarDatos();
        });
      }
      function seleccionar(id) {
        $.getJSON("index.php?consultar=" + id, function (registros) {
          console.log(registros);
          $("#txtID").val(registros[0]["id"]);
          $("#txtNombre").val(registros[0]["nombre"]);
          $("#txtPrecio").val(registros[0]["precio"]);
        });
      }
      function editar() {
        var datos = new FormData();
        datos.append("id", $("#txtID").val());
        datos.append("nombre", $("#txtNombre").val());
        datos.append("precio", $("#txtPrecio").val());

        $.ajax({
          type: "post",
          url: "index.php?actualizar=1",
          data: datos,
          processData: false,
          contentType: false,
          success: function (respuesta) {
            console.log(respuesta);
            consultarDatos();
          },
        });
	}
});