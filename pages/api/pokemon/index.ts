import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IPokemon } from '../../../interfaces/IPokemon'

type Data =
| { error: boolean }
| IPokemon

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getPokemonByName( req, res );

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