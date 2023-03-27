import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { IPokemon } from '../interfaces/IPokemon'

const Home: NextPage = () => {

  const [pokeRes, setPokeRes] = useState<IPokemon | undefined>( undefined );
  const [name, setName] = useState('');

  const requestPokeApi = async () => {
    try {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name);

      console.log( data )
      
      setPokeRes( data );
    } catch( error ) {
      console.log({ error })
      window.alert('No pokemon named ' + name)
    }
  }

  const requestIndirectPokeApi = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/pokemon?name=' + name);

      console.log( data )
      
      setPokeRes( data );
    } catch( error ) {
      console.log({ error })
      window.alert('No pokemon named ' + name)
    }
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input type="text" name="PokemonName" onChange={ ({ target }) => setName( target.value.toLocaleLowerCase() ) } />

      <hr />
      
      <button onClick={ requestPokeApi }>Peticion directa de PokeApi</button>
      <br />
      <button onClick={ requestIndirectPokeApi }>Peticion INdirecta de PokeApi</button>

      <div>
        <h2>Content response:</h2>
        {
          !pokeRes
            ? <p>Not requested yet</p>
            : (
              <div>
                <p>Pokedex ID: { pokeRes.id }</p>
                <p>Name: { pokeRes.name }</p>
                <p>Types: { pokeRes.types.map(( t, i ) => <span key={ i }>{ t.type.name }</span>) }</p>
                <p>Abilities: { pokeRes.abilities.map(( a, i ) => <span key={ i }>{ a.ability.name }</span>) }</p>
              </div>
            )
        }
      </div>

    </div>
  )
}

export default Home
