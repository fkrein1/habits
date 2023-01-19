import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

import Fastify from 'fastify';

const app = Fastify();
app.register(cors);

const prisma = new PrismaClient();
const PORT = 3009;

app.get('/habits', async () => {
  const habits = await prisma.habit.findMany();
  return habits;
});

app.listen({ port: PORT }).then(() => console.log(`Running on ${PORT}`));
