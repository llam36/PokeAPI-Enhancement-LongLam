import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Exp() {
    const level = 5
    const name = "bulbasaur"
    const { data, error, isLoading, isValidating } = useSWR(`/api/experience/${name}?level=${level}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Must Implement your API. Data is empty</h2>
        </>
    )
    let { experience } = data

    return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Name: {name}</h2>
            <h2>Level: {level}</h2>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Experience: {experience}</h2>
                </>
            )}
        </>
    )
}