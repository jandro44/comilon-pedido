import { categorias } from "./data/categorias"; 
import { productos } from "./data/productos";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const main = async () : Promise<void> => {
    // esta funcion es de tipo Promise y no retorna nada
    try {
        // A la espera que se inserten todos los datos, createMany es para crear muchos datos, y data va si o si porque lo pide prisma
        await prisma.categoria.createMany({
            data: categorias
        })
        await prisma.producto.createMany({
            data: productos
        })
    } catch (error) {
        console.log(error)
    }
}
main()