import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import 'express-async-errors';

import { errorHandler, NotFoundError } from '@zeon_dev/common';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // We disable encryption because JWT token is already encrypted. Also the encryption algorithm will make it hard for other
    // microservices to decrypt it
    signed: false,
    secure: process.env.NODE_ENV !== 'test' // supertest can only make http request so we set secure to false for testing
  })
);

// Routes

// No route matches
app.all('*', async () => {
  throw new NotFoundError();
});

// Error handler
app.use(errorHandler);

export { app };
