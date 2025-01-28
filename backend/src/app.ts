import { createServer } from 'http';
import { CLIENT_PATH, PORT, MONGO_URL, MONGO_DB_NAME } from './config/envs';
import { MongoDatabase } from './db/mongo/mongo-database';
import { AppRoutes } from './routes/routes';
import { Server } from './server';
import { app } from './utils/socket';

async function main() {
  await MongoDatabase.connect({ mongoUrl: MONGO_URL!, dbName: MONGO_DB_NAME! });

  const server = new Server({
    app: app,
    port: +PORT,
    routes: AppRoutes.routes,
    clientPath: CLIENT_PATH,
  });
}

(async () => {
  main();
})();
