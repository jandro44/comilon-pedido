import useKiosko from "@/hooks/useKiosko";
import Image from "next/image"

export default function Categoria2({categoria}) {
    const { categoriaActual, handleClickCategoria } = useKiosko()
    const { nombre, icono, id } = categoria;

    return (


        <div
            className={`group ${
                categoriaActual?.id === id ? 'bg-amber-500' : 'bg-card'
            } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-amber-500`}
            onClick={() => handleClickCategoria(id)} 
        >
            <div
                className="w-10 h-10 rounded-full shadow-lg bg-amber-500 group-hover:bg-white flex items-center justify-center"
            >
            <Image 
                src={`/assets/img/icono_${icono}.svg`}
                alt="Imagen Icono"
                width={0}
                height={0}
            />
            </div>
            <p
                className="text-textColor text-sm group-hover:text-white overflow-hidden truncate w-20 text-center"
            > {nombre}
            </p>
        </div>


    )
}
