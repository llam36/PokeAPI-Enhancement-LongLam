import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = async (url) => {
    const res = await axios.get(url)
    console.log(res.data)
    return res.data
}

export default function Name() {
    let pokemon = "shuppet"
    let { data, error, isLoading, isValidating } = useSWR("/api/pokemon/"+pokemon, fetcher)

    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Must Implement your API. Data is empty</h2>
        </>
    )

    let { pokemonName, sprite, types } = data


    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Name: {pokemonName}</h2>
                    <img src={sprite} />
                    <h2>Types: {types.map(type => <span>{type} </span>)}</h2>
                </>
            )}
        </>
    )
}