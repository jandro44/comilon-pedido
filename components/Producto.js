import Image from "next/image"
import { formatearDinero } from "@/helpers"
import useKiosko from "@/hooks/useKiosko"

const Producto = ({producto}) => {
    const { handleSetProducto, handleChangeModal } = useKiosko()
    const { nombre, precio, imagen } = producto

    return (

        <div
            className="w-275 h-[185px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
              >
                <Image 
                  src={`/assets/img/${imagen}.jpg`}
                  alt={`Imagen platillo ${nombre}`}
                  width={0}
                  height={0}
                  className="rounded-full w-20 h-20"
              />

              </div>
              <div
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => {
                  handleChangeModal()
                  handleSetProducto(producto)
                }}
              >
                <span className="text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  </svg>
                </span>

              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center -mt-12">
              <p className="text-textColor font-semibold text-base md:text-md">
                {nombre}
              </p>

              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {precio}
                </p>
              </div>
            </div>
          </div>


    )
}

export default Producto