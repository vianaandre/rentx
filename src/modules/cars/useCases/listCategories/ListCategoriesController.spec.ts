import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash('rentx', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, password, email, "isAdmin", created_at, driver_license)
          values('${id}', 'rentx', '${password}', 'admin@rentx.com.br', true, 'now()', 'XXXXXX')
      `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/authenticate/session').send({
      email: 'admin@rentx.com.br',
      password: 'rentx',
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Name Category Supertest',
        description: 'Description Category Supertest.',
      }).set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.body.all.length).toBe(1);
    expect(response.body.all[0]).toHaveProperty('id');
    expect(response.body.all[0].name).toEqual('Name Category Supertest');
  });
});
