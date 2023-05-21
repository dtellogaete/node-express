# Desafío Express()

### Servidor

El servidor se ejecutará en el puerto 3000, después de escribir en consola `node index` en la ruta `node-express/backend/` se desplegará el siguiente mensaje:

```
Server is running in port: 3000
```

Para acceder en el navegador de manera local hay que ir la siguiente ruta:

```
http://localhost:3000
```

Detalle del código:
```
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`);
});
```
### GET Página Web

- Ruta: `/`
- Método: GET
- Descripción: Devuelve el `index.html`.
- Acción: Envia el archivo `index.html` al cliente.

```
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`);
});
```

### GET Canciones

- Ruta: `/canciones`
- Método: GET
- Descripción: Obtiene todas las canciones del repertorio (repertorio.json)
- Acción: Retorna un objeto JSON con el repertorio de canciones.

```
app.get('/canciones', (req, res) =>{
    res.json(repertorio)
});
```

### POST Canciones

- Ruta: `/canciones`
- Método: POST
- Descripción: Agrega una nueva canción al repertorio.
- Acción:
  - Obtiene los datos de la canción (título, artista, tono) desde el formulario.
  - Genera un nuevo ID para la canción utilizando la función `getMaxId()` que retorna el ID máximo del repertorio y se le adiciona 1.
  - Crea un objeto `newSong` con el nuevo ID y los datos de la canción.
  - Agrega la nueva canción al repertorio.
  - Guarda el repertorio actualizado en el archivo `repertorio.json`.
  - Retorna un objeto JSON con la nueva canción agregada.

```
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
```

### PUT Canciones

- Ruta: `/canciones/:id`
- Método: PUT
- Descripción: Actualiza una canción existente en el `repertorio.json`.
- Acción:
  - Obtiene el ID de la canción a actualizar desde los parámetros de la URL.
  - Obtiene los datos actualizados de la canción (título, artista, tono) desde el cuerpo de la solicitud.
  - Busca el índice de la canción en el repertorio utilizando el ID.
  - Si se encuentra la canción, actualiza los datos de la canción en el repertorio y guarda el repertorio actualizado en el archivo `repertorio.json`.
  - Retorna un objeto JSON con la canción actualizada.
  
```
const PORT = 3000;
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
```

### DELETE Canciones

- Ruta: `/canciones/:id`
- Método: DELETE
- Descripción: Elimina una canción del repertorio.
- Acción:
  - Obtiene el ID de la canción a eliminar desde los parámetros de la URL.
  - Busca el índice de la canción en el repertorio utilizando el ID.
  - Si se encuentra la canción, la elimina del repertorio y guarda el repertorio actualizado en el archivo `repertorio.json`

```
const PORT = 3000;
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
  
```
