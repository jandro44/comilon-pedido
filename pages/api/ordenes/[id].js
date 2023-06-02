import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {

    const prisma = new PrismaClient()

    if(req.method === 'POST') {
        // req.query.id -> identifica el id que se va a actualizar
        const { id } = req.query

        const ordenActualizada = await prisma.orden.update({
            where: {
                id: parseInt(id)
            },
            // Este data es obligatorio cuando se quiere hacer una actualizacion
            data: {
                estado: true
            }
        })
        res.status(200).json(ordenActualizada);
    }
}