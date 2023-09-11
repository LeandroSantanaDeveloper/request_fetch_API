import { useEffect, useState } from 'react'
import './form.css'

const url = 'http://localhost:3000/products'

const Form = () => {
  const [products, setProduct] = useState([])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)

  const [btnError, setBtnError] = useState(false)

  // Pegar dados da base

  useEffect(() => {

    async function fetchData() {
      setLoading(true)
      try {
        const res = await fetch(url)
        const data = await res.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        setError("Houve algum erro ao carregar os dados")
        setLoading(false)
        setBtnError(true)
      }
    }

    fetchData()
  }, [])

  // Enviar dados para a base

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

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
    setLoading(false)

  }

  return (
    <>
      <div className="add-products">

        <div className='group'>
          <h1>Formulário simples</h1>
          <h2>Lista de Produtos</h2>
          {error && <p>{error}</p>}
          {loading ?
            <p>Carregando dados</p>
            :
            <ul>
              {products.map((product) => (
                <li key={product.id}>{product.name} -  R$: {product.price}</li>
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
            {loading || btnError ? <input type="submit" value="Criar" disabled /> : <input type="submit" value="Criar" />}

          </form>
        </div>


      </div>
    </>
  )
}

export default Form