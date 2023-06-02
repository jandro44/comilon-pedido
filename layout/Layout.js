import Head from "next/head"
import Modal from "react-modal"
// Se coloca el componente de toast en layout para que este disponible en todos los componentes
import ModalProducto from "@/components/Modal";
import Categoria from "@/components/Categoria";
import PasosBajo from "@/components/PasosBajo";
import useKiosko from "@/hooks/useKiosko";

import { Toaster, toast } from 'sonner'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Este es el elemento principal de Next, por ejemplo en vite es root
Modal.setAppElement('#__next');

export default function Layout({children, pagina}) {

    // Este modal es el que va a estar como true o false
    const { categorias, modal } = useKiosko()

    return (
        <>
            <Head>
                <title>Comilon - {pagina}</title>
                <meta name="description" content="Kiosko Cafetería" />
            </Head>
            
            <div className="w-screen h-auto flex flex-col ">
                {/* <Header /> */}
                <main className="px-4 md:px-16 py-4 w-full">

                    {/* MainContainer */}
                    <div className="w-full h-auto flex flex-col items-center justify-center ">

                        {/* Menucontainer */}
                        <section className="w-full my-6" >
                            <div className="w-full flex flex-col items-center justify-center">
                            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
                                    Categorias
                                </p>
                                <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none mb-5">
                                    { categorias.map(categoria => (
                                        <Categoria
                                            key={categoria.id}
                                            categoria={categoria}
                                        />
                                    ))}
                                </div>

                                {children}
                            </div>
                        </section>
                        {/* ***************************************************************************  */}

                    </div>
                </main>
            </div>

            <PasosBajo />

            {/* Si state de modal es true que se muestre el componente Modal */}
            {modal && (
                <Modal
                    isOpen={modal}
                    style={customStyles}
                >
                    <ModalProducto />
                </Modal>
            )}

            <Toaster position="top-center" richColors />
        </>
    )
}