import PokemonModel from '../models/pokemonModels';

export default class PokemonController {
    static async addPokemon(request: any, reply: any) {
        const identifier = request.body.identifier;

        if (!identifier) {
            return reply.status(400).send({ error: 'É necessário o nome do Pokémon desejado.' });
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
            if (!response.ok) {
                return reply.status(404).send({ error: 'Pokémon não encontrado' });
            }

            const data = await response.json();
            const pokemon = {
                name: data.name,
                pokedexNumber: data.id,
                abilities: data.abilities.map((a: any) => a.ability.name).join(', '),
                types: data.types.map((t: any) => t.type.name).join(', ')
            };

            await PokemonModel.savePokemon(pokemon);
            return reply.status(201).send({ message: 'Pokémon salvo com sucesso!', pokemon });
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Erro ao salvar Pokémon' });
        }
    }

    static async listPokemons(request: any, reply: any) {
        try {
            const { type } = request.query;
            const pokemons = await PokemonModel.getPokemons(type);
            return reply.status(200).send(pokemons);
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Erro ao listar Pokémons' });
        }
    }

    static async deletePokemon(request: any, reply: any) {
        try {
            const { id } = request.params;
            const deleted = await PokemonModel.deletePokemon(parseInt(id));
            if (!deleted) {
                return reply.status(404).send({ error: 'Pokémon não encontrado' });
            }
            return reply.status(200).send({ message: 'Pokémon deletado com sucesso' });
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Erro ao deletar Pokémon' });
        }
    }
}
