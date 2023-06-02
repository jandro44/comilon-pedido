import Image from "next/image"
import axios from "axios"
import { Toaster, toast } from 'sonner'
import { formatearDinero } from "@/helpers"

export default function Ordenes({orden}) {

    const { id, nombre, total, pedido } = orden

    const completarOrden = async () => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden Despachada con Éxito')
        } catch (error) {
            toast.error('Hubo un Error')
        }
    }

    return (

        <div className="mt-4 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="ml-5">
                <span className="mt-2 font-semibold">Orden N° {id}</span>
                <p className="text-slate-500 text-sm leading-6">Cliente: {nombre}</p>
            </div>

            {pedido.map(platillo => (
                <div key={platillo.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <Image 
                        src={`/assets/img/${platillo.imagen}.jpg`}
                        alt={`Imagen platillo ${platillo.nombre}`}
                        width={0}
                        height={0}
                        className="m-2 h-20 w-20 rounded-md border object-cover object-center"
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                        <span className="font-semibold">{platillo.nombre}</span>
                        <span className="float-right text-gray-400">Cantidad: {platillo.cantidad}</span>
                        <p className="text-lg font-bold"></p>
                    </div>
                </div>
            ))}


            <div className="group flex justify-end items-center gap-2 ml-auto ">
                <div className="text-lg font-semibold text-gray-900">
                    <span className="font-semibold">Total: </span>{formatearDinero(total)}
                    <button 
                        className="bg-amber-500 hover:bg-amber-700 mt-3 w-full rounded-md py-3 font-medium text-white text-sm cursor-pointer"
                        type="button"
                        onClick={completarOrden}
                    >
                        Completar
                    </button>
                </div>
            </div>
        </div>

    )
}
