import cors from '@fastify/cors';

import Fastify from 'fastify';
import { appRoutes } from './routes';

const PORT = 3009;

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app.listen({ port: PORT }).then(() => console.log(`Running on ${PORT}`));
