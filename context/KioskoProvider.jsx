import { useState, useEffect, createContext } from "react";
import axios from "axios";
// Esta funcion manda a llamar al toast en ciertos eventos
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/router";

const KioskoContext = createContext()

const KioskoProvider = ({children}) => {

    // State que guarda las categorias de la API
    const [categorias, setCategorias] = useState([]);
    // State para saber en que categoria estamos cuando le damos click
    const [categoriaActual, setCategoriaActual] = useState({})
    // State que guarda el producto seleccionado
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    // State del pedido, se inicia como un arreglo vacio yaque se pueden agregar multiples elementos
    const [pedido, setPedido] = useState([])
    // State para almacenar el nombre del pedido
    const [nombre, setNombre] = useState('')
    // State para el total del pedido
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect( () => {
        obtenerCategorias()
    }, [])

    useEffect( () => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido]);

    const handleClickCategoria = id => {
        // Se obtiene el id de la categoria que se esta seleccionando y vamos a filtrar 
        // Si cat.id que son las que estan en el state, es igual a el id que se esta presionando, pues esa sera la categoria actual
        const categoria = categorias.filter( cat => cat.id === id )
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    // Funcion para setear el producto asi no se pasa directamente con el setProducto, esto es mejor evitarlo creando funciones que lo hagan
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    // Funcion para agregar y actualizar un pedido
    // Se le aplica destructuring y se le saca categoriaId y luego se le toma una copia de producto sin las primeras propiedades
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        // some va a iterar en todos los elementos del array y retorna true o false si un elemento cumple con la condicion
        if(pedido.some(productoState => productoState.id === producto.id)) {
            // Si el producto existe actualizar la cantidad
            const pedidoActualizado = pedido.map( productoState => productoState.id === producto.id ? producto : productoState )
            setPedido(pedidoActualizado)
            toast.success('Pedido Actualizado')

        } else { // Si el producto no existe
            // Se le pasa una copia del pedido y despues el producto para que lo vaya agregando al final del arreglo
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }

    const handleEditarCantidades = id => {
        // Busca en el pedido y lo extrae
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])

        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        // Igual que en el editar busca en el pedido pero lo sacara del arreglo
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    // Esta funcion es asincrona porque va a interactuar con la API
    const colocarOrden = async (e) => {
        e.preventDefault()

        // Se usa try catch porque puede fallar la conexion al servidor
        try {
            // Data es la respuesta de la funcion en ordenes.js
            // Siempre se debe pasar como objeto
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            // Resetear la App
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/')
            }, 1500);

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <KioskoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal, 
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </KioskoContext.Provider>
    )
}

export {
    KioskoProvider
}
export default KioskoContext