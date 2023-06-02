import { useState, useEffect } from "react"
import { formatearDinero } from "@/helpers"
import useKiosko from "@/hooks/useKiosko"
import Image from "next/image"

const ModalProducto = () => {

    const { producto, handleChangeModal, handleAgregarPedido, pedido } = useKiosko()
    // State local, no va a viajar por ningun componente, es unicamente necesario aqui
    const [cantidad, setCantidad] = useState(1)
    // State para cuando se edite un pedido
    const [edicion, setEdicion] = useState(false)

    // effect para cada vez que cambie el producto quiero comprobarlo
    useEffect(() => {
        // Comprobar si el modal actual esta en el pedido, el some solamente itera y retorna true o false no nos da el objeto que se ha encontrado
        if(pedido.some(pedidoState => pedidoState.id === producto.id)) {
            // El find si va a retornar el objeto completo y se usa el mismo codigo para localizar el producto
            const productoEdicion = pedido.find(pedidoState => pedidoState.id === producto.id)
            // este state es cuando ya se crea un producto y se habilita el boton para editar enves de agregar
            setEdicion(true)
            // Se actualiza la propiedad de cantidad
            setCantidad(productoEdicion.cantidad)
        }
    }, [producto, pedido]);

    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={handleChangeModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div
                className="w-275 h-[185px] min-w-[275px] md:w-300 md:min-w-[300px]  rounded-lg py-2 px-4  my-12 backdrop-blur-lg  flex flex-col items-center justify-evenly relative"
            >
            
                <div
                    className="w-40 h-40 drop-shadow-2xl"
                >
                    <img
                    src={`/assets/img/${producto.imagen}.jpg`}
                    alt={`Imagen platillo ${producto.nombre}`}
                    className="rounded-full w-20 h-20 mx-auto"
                    />
                    
                </div>

                <div className="w-full flex flex-col items-center justify-center mt-8">
                    <p className="text-textColor font-semibold text-base md:text-md">
                        {producto.nombre}
                    </p>

                    <div className="flex items-center">
                        <p className="text-lg text-headingColor font-semibold">
                            <span className="text-sm text-red-500">$</span> {producto.precio}
                        </p>
                    </div>
                </div>

                <div className="block">
                    <div className="flex gap-4 my-5 ml-10">
                        <button
                            type="button"
                            onClick={() => {
                                if( cantidad <= 1 ) return
                                setCantidad(cantidad - 1)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>

                        <p className="text-3xl">{cantidad}</p>

                        <button
                            type="button"
                            onClick={() => {
                                if( cantidad >= 5 ) return
                                setCantidad(cantidad + 1)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>

                    <button 
                        type="button"
                        className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 border border-amber-700 rounded"
                        onClick={() => handleAgregarPedido({...producto, cantidad})}
                    >
                        {/* Si edicion esta como true */}
                        {edicion ? 'Guardar Cambios' : 'Agregar al Pedido'}
                    </button>
                </div>
            
            </div>
        </>
    )
}

export default ModalProducto