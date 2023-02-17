'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const{ sequelizeDatabase } = require('../src/models');
const request = supertest(app);

beforeAll( async () => {
  await sequelizeDatabase.sync();
});

afterAll( async () => {
  await sequelizeDatabase.drop();
});

describe('Food route', () => {
  it('create a food item', async () => {
    let response = await (await request.post('/food')).send({
      name: 'tacos',
      type: 'Mexican',
    });

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual('tacos');
    expect(response.body.type).toEqual('Mexican');
    expect(responseTwo.body.name).toEqual('teriyaki');
    expect(responseTwo.body.type).toEqual('Japanese');
  });

    it('gets all food', async () => {
      let response = await request.get('/food');

      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(2);
      expect(response.body[0].name).toEqual('tacos');
      expect(response.body[1].type).toEqual('Japanese');
    });

    it('gets a single food item by id', async ()=> {
      let response = await request.get('./food/1');

      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(2);
      expect(response.body[0].name).toEqual('tacos');
      expect(response.body[1].type).toEqual('Japanese');
    });

    it('updates as expected', async () => {
      let response = await (await request.put('/food/1')).send({
        name: 'burritos',
        type: 'Mexican',
      });

      // expect(response.status).toEqual(200);
      // expect(response.body.id).toBeTruthy();
      // expect(response.body.name).toEqual('burritos');
      // expect(response.body.type).toEqual('Mexican');

      // if use base postgres functionality
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(1);
    });
    it('deletes as expected', async () => {
      let responseTwo = await (await request.put('/food/1'));
      
      expect(responseTwo.status).toEqual(200);
      // expect(response.text).toEqual([1]);
      expect(responseTwo.body[0].type).toEqual('Japanese');
    });
  
});

