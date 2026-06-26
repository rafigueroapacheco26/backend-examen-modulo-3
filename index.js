import express from 'express'
import cors from 'cors'
import productos from './productos.json' with { type: 'json' }

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/productos', (req, res) => {
  res.send(productos)
})

app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body
  if (!nombre || !precio) 
    return res.status(400).send({ error: 'Faltan datos' })
  if( productos.find( (producto) => producto.nombre === nombre ) )
    return res.status(400).send({ error: 'El producto ya existe' })
  const id = productos.length + 1
  productos.push({ id, nombre, precio })
  res.send({ mensaje: 'Producto creado correctamente' })
})

app.listen(PORT, (error) => {
  if (error) return console.error(error)
  console.log("Server running on http://localhost:" + PORT)
})