import PokemonModel from '../models/pokemonModels';

describe('PokemonModel', () => {
    // Antes de cada teste, garantir que o banco esteja no estado esperado
    beforeEach(async () => {
        const pokemon = {
            name: 'pikachu',
            pokedexNumber: 25,
            abilities: 'static',
            types: 'electric'
        };

        // Inserir um Pokémon para garantir que o teste de exclusão funcione
        await PokemonModel.savePokemon(pokemon);
    });

    test('Deve salvar um Pokémon corretamente no banco de dados', async () => {
        const pokemon = {
            name: 'bulbasaur',
            pokedexNumber: 1,
            abilities: 'overgrow',
            types: 'grass, poison'
        };

        // Verifica se o Pokémon é salvo sem erros
        await expect(PokemonModel.savePokemon(pokemon)).resolves.not.toThrow();
    });

    test('Deve listar Pokémons corretamente', async () => {
        const pokemons = await PokemonModel.getPokemons();
        expect(Array.isArray(pokemons)).toBe(true);
    });

    test('Deve listar Pokémons filtrados por tipo', async () => {
        const pokemons = await PokemonModel.getPokemons('electric');
        expect(Array.isArray(pokemons)).toBe(true);
    });

    test('Deve retornar false ao tentar deletar Pokémon inexistente', async () => {
        const result = await PokemonModel.deletePokemon(999);
        expect(result).toBe(false);
    });
});
