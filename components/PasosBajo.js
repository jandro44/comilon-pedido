import { useRouter } from "next/router"

const pasos = [
    {paso: 1, nombre: 'Menú', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Confirmar', url: '/total'},
]

const Pasos = () => {

    const router = useRouter()

    const calcularProgreso = () => {
        let valor;
        if (router.pathname === "/") {
            valor = 2;
        } else if (router.pathname === "/resumen") {
            valor = 50;
        } else {
            valor = 100;
        }

        return valor
    }

    return (
        <div className="fixed inset-x-0 bottom-0 bg-stone-300">
            <div className="bg-gray-100 mb-3">
                <div 
                    className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
                    style={{ width: `${calcularProgreso()}%` }}
                >
                    
                </div>
            </div>
            <div className="flex justify-around pb-3">
                {pasos.map(paso => (
                    <button
                        onClick={() => {
                            router.push(paso.url)
                        }}
                        className="text-md md:text-lg font-semibold capitalize text-headingColor" 
                        key={paso.paso}
                    >
                        {paso.nombre}
                    </button>
                ))}
            </div>

            
        </div>
    )
}

export default Pasos