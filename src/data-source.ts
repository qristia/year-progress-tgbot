import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/db/db.sqlite',
  logging: false,
  entities: ['./src/db/entity/**.{ts,js}'],
  migrations: ['./src/db/migration/**.{ts,js}'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
