class API {
     async obtenerDatos() {
          // Obtener desde la API
          const datos = await fetch('https://api.datos.gob.mx/v1/precio.gasolina.publico');

          // Retornar como JSON
          const respuestaJSON = await datos.json();

          // Retornar el objeto
          return {
               respuestaJSON
          }
     }
     async obtenerClima(){
          const datos = await fetch('https://api.openweathermap.org/data/2.5/weather?id=3658666&appid=161de5e0e093bc332b4e8ccdaa52b834');
          const respuestaJSON = await datos.json();
          console.log(respuestaJSON)
          return {
               respuestaJSON
          }
     }

}