import { useCallback, useEffect } from "react"
import Layout from "@/layout/Layout"
import useKiosko from "@/hooks/useKiosko"
import { formatearDinero } from "@/helpers"

export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useKiosko()

    // Esta funcion se ejecuta cada vez que pedido cambie y tambien se escriba algo en el input de nombre, devuelve true o false
    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3
    }, [pedido, nombre])

    // este effect esta al pendiente de pedido y la funcion de comprobar pedido
    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido]);

    return (
        <Layout pagina="Total y Confirmar Pedido">
            <form
            className="mt-20"
                onSubmit={colocarOrden}
            >
                <div className="bg-gray-50 px-10 pt-8 rounded-lg backdrop-blur-lg hover:drop-shadow-lg">
                    <p className="text-xl font-medium">Total y Confirmar Pedido</p>
                    <p className="text-gray-400">Confirma tu pedido a continuación.</p>
                    <div className="">
                        <label for="nombre" className="mt-4 mb-2 block text-sm font-medium">Nombre</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
                                placeholder="Escriba su nombre para la orden" 
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-gray-400">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    
                        <div className="mt-6 flex items-center justify-between border-t pt-2">
                            <p className="text-sm font-medium text-gray-900">Total a Pagar</p>
                            <p className="text-2xl font-semibold text-gray-900">{formatearDinero(total)}</p>
                        </div>
                    </div>

                    <input 
                        className={`${comprobarPedido() ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer bg-amber-500 hover:bg-amber-700'} mt-4 mb-8 w-full rounded-md px-6 py-3 font-medium text-white`} 
                        type="submit"
                        value='Confirmar Pedido'
                        disabled={comprobarPedido()}
                    />
                </div>

            </form>

        </Layout>
    )
}
