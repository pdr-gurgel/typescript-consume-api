import { Connection, ResultSetHeader } from 'mysql2/promise';  // Importando ResultSetHeader
import Database from './database';  // Importando a classe Database

export default class PokemonModel {
    static async savePokemon(pokemon: any) {
        const query = `INSERT INTO pokemons (name, pokedexNumber, abilities, types) VALUES (?, ?, ?, ?)`;
        const values = [pokemon.name, pokemon.pokedexNumber, pokemon.abilities, pokemon.types];
        const connection: Connection = await Database.connect();
        await connection.query(query, values);
    }

    static async getPokemons(type?: string) {
        let query = 'SELECT * FROM pokemons';
        const values: string[] = [];

        if (type) {
            query += ' WHERE types LIKE ?';
            values.push(`%${type}%`);
        }

        const connection: Connection = await Database.connect();
        const [results] = await connection.query(query, values);
        return results;
    }

    static async deletePokemon(id: number): Promise<boolean> {
        const query = 'DELETE FROM pokemons WHERE id = ?';
        const connection: Connection = await Database.connect();
        
        // Ajuste na desestruturação do resultado da query
        const [result]: [ResultSetHeader, any[]] = await connection.query(query, [id]);
        
        // Verificando a propriedade affectedRows
        return result.affectedRows > 0;
    }
}
