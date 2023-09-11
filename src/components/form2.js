import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'

const Form2 = () => {

    const url = 'http://localhost:3000/products'

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")


    const { data: items, httpConfig, loading, error } = useFetch(url)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const products = {
            name,
            price
        }

        httpConfig(products, "POST")

        setName("")
        setPrice("")

    }


    const handleDelete = (id) => {
        httpConfig(id, "DELETE")
    }

    return (
        <>
            <div className="add-products">

                <div className='group'>
                    <h1>Formulário usando hooks</h1>
                    <h2>Lista de produtos</h2>
                    {error && <p>{error}</p>}
                    {loading ?
                        <p>Carregando dados</p>
                        :
                        <ul>
                            {items && items.map((product) => (
                                <li 
                                key={product.id}>{product.name}  -  R$: {product.price}
                                <button onClick={() => handleDelete(product.id)}>Excluir</button>
                                </li>
                            ))}
                        </ul>}

                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Nome:</span>
                            <input
                                type="text"
                                value={name}
                                name='name'
                                onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            <span>Preço:</span>
                            <input
                                type="text"
                                value={price}
                                name='price'
                                onChange={(e) => setPrice(e.target.value)} />
                        </label>
                        <input type="submit" value="Criar" />
                    </form>
                </div>


            </div>
        </>
    )
}

export default Form2