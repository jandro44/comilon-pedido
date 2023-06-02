import Producto from '@/components/Producto'
import useKiosko from '@/hooks/useKiosko'
import Layout from '@/layout/Layout';

export default function nuevo() {

    const { categoriaActual } = useKiosko()


    return (

        <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 ">
                {categoriaActual?.nombre}
            </p>

            <div className="w-full">
                <div className="w-full flex items-center gap-3 my-12 scroll-smooth overflow-x-hidden flex-wrap justify-center">
                    {/* ACA VAN LAS CARD DE PRODUCTOS */}
                    {categoriaActual?.productos?.map(producto => (
                        <Producto
                            key={producto.id} 
                            producto={producto} 
                        />
                    ))}
                </div>
            </div>

        </Layout>
    )
}
