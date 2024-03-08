const fetcher = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Erro ao buscar os dados')
    }
    return response.json()
}

export default fetcher

