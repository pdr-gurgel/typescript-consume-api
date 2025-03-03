import PokemonController from '../controllers/pokemonControllers';
import PokemonModel from '../models/pokemonModels';

describe('PokemonController', () => {
    test('Deve adicionar um Pokémon com sucesso', async () => {
        const request = {
            body: { identifier: 'pikachu' }
        };
        const reply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await PokemonController.addPokemon(request, reply);

        expect(reply.status).toHaveBeenCalledWith(201);
        expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Pokémon salvo com sucesso!'
        }));
    });

    test('Deve retornar erro 400 ao adicionar Pokémon sem identificador', async () => {
        const request = {
            body: {}
        };
        const reply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await PokemonController.addPokemon(request, reply);

        expect(reply.status).toHaveBeenCalledWith(400);
        expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({
            error: 'É necessário o nome do Pokémon desejado.'
        }));
    });

    test('Deve listar os Pokémons com sucesso', async () => {
        const request = { query: {} };
        const reply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await PokemonController.listPokemons(request, reply);

        expect(reply.status).toHaveBeenCalledWith(200);
        expect(reply.send).toHaveBeenCalled();
    });

    test('Deve deletar um Pokémon com sucesso', async () => {
        // Mock direto do método delete no modelo
        PokemonModel.deletePokemon = jest.fn().mockResolvedValue(1); // Simula sucesso ao deletar
    
        const request = {
            params: { id: '1' }
        };
        const reply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    
        await PokemonController.deletePokemon(request, reply);
    
        expect(PokemonModel.deletePokemon).toHaveBeenCalledWith(1);
        expect(reply.status).toHaveBeenCalledWith(200);
        expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Pokémon deletado com sucesso'
        }));
    });

    test('Deve retornar erro 404 ao tentar deletar Pokémon inexistente', async () => {
        const request = {
            params: { id: '999' }
        };
        const reply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    
        // Mock para simular exclusão falha (nenhuma linha afetada)
        jest.spyOn(PokemonModel, 'deletePokemon').mockResolvedValue(false);
    
        await PokemonController.deletePokemon(request, reply);
    
        expect(reply.status).toHaveBeenCalledWith(404);
        expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({
            error: 'Pokémon não encontrado'
        }));
    });
});
