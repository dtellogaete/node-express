/*Express */
const express = require('express');
const app = express();

const fs = require('fs');
const cors = require('cors');

/* Obtiene repertorio de canciones inicial */
const repertorio = require('./repertorio.json');

app.use(express.json());
app.use(cors());

/* Levantar el servidor con puerto 3000 */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`);
});

/* GET Index */
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

/* GET Canciones */
app.get('/canciones', (req, res) =>{
    res.json(repertorio)
});

/* POST Canciones */
/* Función que retorna el id máximo del json Repertorio */
const getMaxId = () => {
    let maxId = 0;
    for (const song of repertorio) {
      if (song.id > maxId) {
        maxId = song.id;
      }
    }
    return maxId;
}

app.post('/canciones', (req, res) => {
    const { titulo, artista, tono } = req.body;     
    const newSong = {
      id: getMaxId()+1, 
      titulo,
      artista,
      tono
    };  
    repertorio.push(newSong); 
    fs.writeFileSync('./repertorio.json', JSON.stringify(repertorio));  
    res.status(201).json(newSong);
    console.log(`Nueva canción agregada`)
  });

/* PUT Canciones */
app.put('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, artista, tono } = req.body;  
    const index = repertorio.findIndex(song => song.id.toString() === id);
    //Valida que encuentre un index  
    if (index !== -1) {
      repertorio[index].titulo = titulo;
      repertorio[index].artista = artista;
      repertorio[index].tono = tono;
  
      fs.writeFileSync('./repertorio.json', JSON.stringify(repertorio));
  
      res.status(200).json(repertorio[index]);
      console.log(`Canción "${id}" ha sido actualizada`)
    } else {
      res.status(404).json({ error: 'Canción no encontrada' });
      console.log(error, "Canción no encontrada");
    }
});  

/* DELETE Canciones */
app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const songs = repertorio;
    const index = songs.findIndex(song => song.id.toString() === id);  
    if (index !== -1) {      
      songs.splice(index, 1);
      fs.writeFileSync('./repertorio.json', JSON.stringify(songs));
      res.status(200).send(`Cancion "${id}" ha sido eliminada`);
      console.log(`Canción "${id}" ha sido eliminada`)
    } else {
      res.status(404).send(`No se encontró ninguna canción con el ID "${id}"`);
      console.log(`No se encontró ninguna canción con el ID "${id}"`);
    }
  });
  

