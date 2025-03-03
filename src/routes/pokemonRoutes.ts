import PokemonController from '../controllers/pokemonControllers';

export default async function pokemonRoutes(fastify: any) {
    fastify.post('/pokemon', PokemonController.addPokemon);
    fastify.get('/pokemon', PokemonController.listPokemons);
    fastify.delete('/pokemon/:id', PokemonController.deletePokemon);
}
