import ResumenProducto from "@/components/ResumenProducto"
import useKiosko from "@/hooks/useKiosko"
import Layout from "@/layout/Layout"
import Image from "next/image"

export default function Resumen() {

    const { pedido } = useKiosko()
    console.log(pedido)

    return (
        <Layout pagina="Resumen">
            <h1 className="text-4xl font-black">Resumen</h1>

            <div className="w-full">
                <div className="w-full flex items-center gap-3 my-12 scroll-smooth overflow-x-hidden flex-wrap justify-center">
                    {pedido.length === 0 ? (
                        <div className="block">
                            <p className="text-center text-lg text-red-600 font-bold uppercase mb-5">No hay elementos en tu pedido</p>
                            <Image
                                src='/assets/plato-vacio.png'
                                alt="plato vacio"
                                width={0}
                                height={0}
                            />
                        </div> 
                    ) : (
                        pedido.map(producto => (
                            <ResumenProducto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </div>
            </div>

            
        </Layout>
    )
}
