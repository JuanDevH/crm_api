import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerCliente = () => {
    
    const [ cliente, setCliente ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    const { nombre, empresa, email, telefono, notas } = cliente

    const {id} = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                setCargando(!cargando);
            }, 2000);
        }
        obtenerClienteAPI();
    }, []);

    return (
        cargando ? <Spinner /> : 
            Object.keys(cliente).length === 0 ? 
            <p>No hay resultados</p> : (
                <div> 
                    <>
                        <h1 className="font-black text-4xl text-blue-900 ">Ver Cliente: {nombre}</h1>
                        <p className="mt-3">Información del Cliente </p>

                        <p className="text-4xl text-gray-600 mt-10">
                            <span className=" text-gray-800 uppercase font-bold">Cliente: </span> 
                            {nombre}
                        </p>
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className=" text-gray-800 uppercase font-bold">Email: </span> 
                            {email}
                        </p>

                        {telefono && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className=" text-gray-800 uppercase font-bold">Teléfono: </span> 
                                {telefono}
                            </p>
                        )}

                        <p className="text-2xl text-gray-600 mt-4">
                            <span className=" text-gray-800 uppercase font-bold">Empresa: </span> 
                            {empresa}
                        </p>

                        {notas && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className=" text-gray-800 uppercase font-bold">Notas: </span> 
                                {notas}
                            </p>
                        )}
                    </>
                </div>
        )
    );
}
 
export default VerCliente;