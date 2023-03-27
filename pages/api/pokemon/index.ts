import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IPokemon, MyFavorite } from '../../../interfaces/IPokemon';

type Data =
| { error: boolean }
| IPokemon
| MyFavorite

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getPokemonByName( req, res );
            
        case 'POST':
            return getMyFavoritePokemon( req, res );

        default:
            return res.status(400).json({ error: true });
    }

}

const getPokemonByName = async ( req: NextApiRequest, res: NextApiResponse ) => {
 
    try {
        const { name } = req.query;

        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name);

        return res.status(200).json( data );
    } catch( error ) {
        return res.status(400).json({ error: true });
    }

}

const getMyFavoritePokemon = async ( req: NextApiRequest, res: NextApiResponse ) => {
 
    try {
        return res.status(200).json({
            id: 6,
            name: 'Charizard',
            types: [
                { slot: 1, type: { name: 'Fire', url: 'http://localhost222' } },
                { slot: 2, type: { name: 'Flying', url: 'http://localhost222' } },
            ],
            abilities: [
                { ability: { name: 'Fire body', url: 'http://localhost' }, is_hidden: false, slot: 1 },
            ]
        } as MyFavorite);
    } catch( error ) {
        return res.status(400).json({ error: true });
    }

}