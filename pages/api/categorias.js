import { PrismaClient } from "@prisma/client"


export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const categorias = await prisma.categoria.findMany({
    // include va a traerse los datos que esten relacionados en este caso el campo se llama productos
    include: {
      productos: true
    }
  })

  res.status(200).json(categorias)
}
