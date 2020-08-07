class UI {
     constructor() {

          // Instanciar la API
          this._api = new API();

          // Crear los mapas en un grupo
          this._markers = new L.LayerGroup();

          // Iniciar el mapa
          this._mapa = this.inicializarMapa();

     }
    inicializarMapa() {
          // Inicializar y obtener la propiedad del mapa
          const map = L.map('mapa').setView([-2.890922, -79.004886], 15);

          const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

          L.tileLayer(
               'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               attribution: '&copy; ' + enlaceMapa + ' Contributors',
               maxZoom: 18,
          }).addTo(map);

          return map;

     }

     // Mostrar Establecimientos de la api
    mostrarEstablecimientos(mapa,api,markers) {
        var respuestaJSON;
        let clima;

        let nodoEventos = firebase.database().ref('Evento');
        nodoEventos.on('value',function(snapshot) {
            let datos = snapshot.val();

            // Muestra los pines
            markers.clearLayers();
            for (const evento in datos) {
                console.log(datos[evento]);
                const { latitud, longitud, titulo, descripcion, foto ,song} = datos[evento];
                //BOTON Y EVENTO ON CLICK
                const opcionesPopUp = L.popup()
                    .setContent(`<p><b>TÍTULO:</b> ${titulo}</p>
                              <p><b>DESCRIPCIÓN:</b>$ ${descripcion}</p>
                               <center><img src=${foto}  alt="Evento" width="60%" height="60%"></center>
                                <center><iframe width="60%" height="65%" scrolling="no" frameborder="no" allow="autoplay" src=${song}> </iframe></center>

                               <center><button type="button" onclick="evento()" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Ver clima para el Evento.
</button></center>
                              `);

                var myIcon = L.icon({
                    iconUrl: foto,
                    iconSize: [70, 70],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                });
                const marker = new L.marker([
                    parseFloat(latitud),
                    parseFloat(longitud)

                ] , {icon: myIcon})
                    .bindPopup(opcionesPopUp)

                markers.addLayer(marker);
            }
            markers.addTo(mapa)
        });
     }


    get mapa() {
        return this._mapa;
    }

    get api() {
        return this._api;
    }

    get markers() {
        return this._markers;
    }

}
function evento() {

    api = new API();
    api.obtenerClima()
        .then(datos => {
            // Obtener los resultados
            const resultados = datos.respuestaJSON;

            const { main, name} = resultados;

            const resultadosMain = datos.respuestaJSON.main;

            const { temp, feels_like,humidity} = resultadosMain;
            document.getElementById("textoP").innerHTML =
                `Analiando clima de Cuenca <b>${name}</b>:
                <br><ul>
                <li><b>${temp}</b> farenheit </li>
                <li>Se siente como <b>${feels_like}</b> farenheit </li>
                <li>La humedad es: <b>${humidity}</b></li>
                </ul>
            `;

        })



}
