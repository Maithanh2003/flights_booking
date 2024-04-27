import { useState, useEffect } from 'react'

const useFetch = (url) => {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        // console.log('accessToken:', accessToken);

        if (!accessToken) {
            console.log('Access token not found');
        }
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                })
                if (!res.ok) {
                    setError('Failed to fetch')
                }
                const result = await res.json()
                setData(result.data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return {
        data,
        error,
        loading
    }
}
export default useFetch