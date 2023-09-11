// custom hook 

import { useEffect, useState } from "react"

export const useFetch = (url) => {

    const [data, setData] = useState(null)  // resgata os dados da base

    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const [itemId, setItemId] = useState(null)



    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        }
        if (method === "DELETE") {
            setConfig({
                method,
                headers: {
                    "content-type": "aplication/json"
                }
            })
            setMethod(method)
            setItemId(data)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url)
                const data = await res.json()
                setData(data)
                setLoading(false)
            } catch (error) {
                console.log(error.message)
                setError("Houve algum erro erro ao carregar os dados")
                setLoading(false)
            }
        }
        fetchData()

    }, [url, callFetch])

    useEffect(() => {
        const send = async () => {

            if (method === "POST") {

                let fetchOptions = [url, config]

                const res = await fetch(...fetchOptions)

                const json = await res.json()

                setCallFetch(json)

            } else if (method === "DELETE") {
                const deleteUrl = `${url}/${itemId}`

                const res = await fetch(deleteUrl, config)

                const json = await res.json()

                setCallFetch(json)
            }
           
        }
        send()
    }, [config, method, url])



    return { data, httpConfig, loading, error }

}

