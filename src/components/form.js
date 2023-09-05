import { useEffect, useState } from 'react'
import './form.css'

const url = 'http://localhost:3000/products'

const Form = () => {
  const [products, setProduct] = useState([])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  // Pegar dados da base

  useEffect(() => {

    async function fetchData() {

      const res = await fetch(url)
      const data = await res.json()

      setProduct(data)
    }

    fetchData()
  }, [])

 // Enviar dados para a base

  const handleSubmit = async (e) => {
    e.preventDefault()

    const products = {
      name,
      price
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(products)
    })


    //Carregamento dinâmico

    const addedProduct = await res.json()

    setProduct((prevProducts) => [...prevProducts, addedProduct])

    setName("")
    setPrice("")

  }

  return (
    <>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} -  R$: {product.price}</li>
        ))}
      </ul>
      <div className="add-products">
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
    </>
  )
}

export default Form