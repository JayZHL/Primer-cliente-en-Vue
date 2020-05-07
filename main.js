let cursos=[];
let asoc=[];
const app = new Vue({
    el:'#uno',
    data: {
        tabla: ""
    },
    methods: {
        creaTabla: function(datos) {
          let cont;

            this.tabla = `
            <div id="wrapper">
               <h1>Estudiantes</h1>
               <table id="keywords" cellspacing="0" cellpadding="0">
                  <thead>
                    <tr>
                      <th><span>Matricula</span></th>
                      <th><span>Nombre</span></th>
                      <th><span>Apellido Paterno</span></th>
                      <th><span>Apellido Materno</span></th>
                      <th><span>Semestre de Ingreso</span></th>
                      <th><span>Créditos Cursados</span></th>
                      <th><span>Cursos asociados</span></th>
                    </tr>
                  </thead>
                  <tbody>
            `;
            datos.forEach( dato => {
              let cadena=[];
                this.tabla += `
                  <tr >
                      <td>${dato.matricula}</td>
                      <td class="lalign">${dato.nombre}</td>
                      <td>${dato.apellidoPaterno}</td>
                      <td>${dato.apellidoMaterno}</td>
                      <td>${dato.semestreIngreso}</td>
                      <td>${dato.creditosCursados}</td>

                `;
                  for(cont=0;cont<dato.Cursos.length;cont++){
                    let c=dato.Cursos[cont].nombre
                    console.log(c);
                    cadena.push(c);
                    // let cursos=${" "};
                    // console.log(cursos);
                  }
                  this.tabla +=`
                      <td>${cadena+" "}</td>

                  `;

            });

            this.tabla += `
                  </tr>
                 </div>
               </tbody>
             </table>
            `;
        }

    },
    mounted: function() {
      fetch("http://localhost:4000/inscripciones")
        .then(response =>{
          return response.json();
        })
        .then(datos =>{
          this.creaTabla(datos);
          console.log(datos);
        });
    },

});

const dos = new Vue({
    el:'#dos',
    data: {
        tabla: ""
    },
    methods: {
        creaTabla:  function(datos,datos2) {
            this.tabla = `
            <div id="wrapper">
               <h1>Cursos</h1>
               <table id="keywords" cellspacing="0" cellpadding="0">
                  <thead>
                    <tr>
                      <th><span>Clave</span></th>
                      <th><span>Nombre</span></th>
                      <th><span>Creditos</span></th>
                    </tr>
                  </thead>
                  <tbody>
            `;
            console.log('Aqui empieza');
            console.log('Aqui empieza');
            datos.forEach( dato => {
                this.tabla += `
                  <tr >
                      <td>${dato.clave}</td>
                      <td>${dato.nombre}</td>
                      <td>${dato.creditos}</td>
                  </tr>
                `;
            });

        }

    },
    mounted:   function() {

      let urls=["http://localhost:4000/cursos","http://localhost:4000/inscripciones"];
      Promise.all(urls.map(u=>fetch(u))).then(responses =>
          Promise.all(responses.map(res => res.json()))
      ).then(datos => {
         //this.creaTabla(datos);
        console.log('Los datos');
        cursos=datos[0];
        console.log(datos)
        this.creaTabla(cursos);
      })
    },
});
