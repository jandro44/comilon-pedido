import { PrismaClient } from "@prisma/client"

// Endpoint para las ordenes
// Como esta parte corre en el servidor tiene acceso al request y el response
// request: lo que envias hacia el servidor
// response: la respuesta que se obtiene del servidor

export default async function handler(req, res) {

    const prisma = new PrismaClient()

    // Obtener ordenes
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    })
    res.status(200).json(ordenes);

    // Crear ordenes
    if(req.method === 'POST') {

        // orden es lo que me va a regresar prisma
        const orden = await prisma.orden.create({
            // data son los datos que voy a ingresar
            data: {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha,
            }
        })

        res.status(200).json(orden)
    } 
}