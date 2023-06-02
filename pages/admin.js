import useSWR from 'swr'
import axios from 'axios'
import Ordenes from '@/components/Ordenes'
import Head from "next/head";
import { Toaster, toast } from 'sonner'
import Image from "next/image"

export default function Admin() {

    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)

    // data: son los datos una vez que hace la consulta hacia la API
    // error: en caso de que haya un error en la consulta se podra debuggear e identificar en donde esta el error
    // isLoading: va a estar como true pero una vez que haya hecho la consulta va a estar como false, de esta forma se puede mostrar un spinner mientras se hace la consulta
    // refreshInterval: cada cuanto se va a estar actualizando la informacion
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100})


    return (
        <>
            <Head>
                <title>Comilon - Admin</title>
                <meta name="description" content="Kiosko Cafetería" />
            </Head>

            <div className="px-4 pt-8">
                <p className="text-xl font-medium">Ordenes Disponibles</p>
                <p className="text-gray-400">Revisa todas las ordenes para completarlas.</p>
                
                {/* condicion de que exista data y que tambien tenga algo */}
                { data && data.length ? data.map(orden => 
                    <Ordenes
                        key={orden.id}
                        orden={orden}
                    />
                ) : <>
                        <p className="text-center text-lg text-red-600 font-bold uppercase mt-20 mb-5">No hay ordenes pendientes</p>

                        <div className="flex justify-center">
                            <Image
                                src='/assets/plato-vacio.png'
                                alt='Plato vacio'
                                width={400}
                                height={400}
                            />
                        </div> 
                    </>
                }
            </div>

            <Toaster position="top-center" richColors />
        </>
    )
}

/* 
    useSWR (Stale While Revalidate) -> Hook para consultar API's
    SWR primero retorna los datos del cache(Stale) es la ultima informacion que estubo disponible, 
    despues envia un request a la API (Revalidate) para obtener los datos mas nuevos 
    y finalmente obtiene la informacion nueva

    Incluye consultas en tiempo real, paginacion, es una excelente forma de mantener los datos actualizados de la app
    y tener un buen performance

    Instalar SWR
    npm i swr
*/