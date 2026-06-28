import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './graphql/schemas/index.js';
import { resolvers } from './graphql/resolvers/index.js';

// connect to link variables
dotenv.config();

// connect to express server
const app = express();
const expressapp = express();

// middleware
app.use(cors());

const schema = createSchema({
  typeDefs,
  resolvers,
});

const Yoga = createYoga({
  schema,
});

app.use('/graphql', Yoga);

const MONGODB = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB as string)
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server running on port ${port}.....`));
  })
  .catch((err) => console.log(err.message));
