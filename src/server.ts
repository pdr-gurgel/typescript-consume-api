import fastify from 'fastify';
import Database from './models/database';
import pokemonRoutes from './routes/pokemonRoutes';

const start = async () => {
    const app = fastify({ logger: true });

    try {
        await Database.connect();
        app.register(pokemonRoutes);

        await app.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Servidor rodando em: http://localhost:3000');
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

start();
