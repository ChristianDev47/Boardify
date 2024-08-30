import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/checkItems', () => {
  it('responds with JSON containing a checkItem of checkItems', async () => {
    const response = await request(app)
      .get('/api/checkItems')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/checkItems', () => {
  it('adds a new checkItem to the database', async () => {
    const newCheckItem = {
      title: 'qweq',
      is_checked: false,
      card_id: '663c5a4e4d677b417a412ec2'
    };
    const response = await request(app)
      .post('/api/checkItems')
      .send(newCheckItem)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/checkItems/:id', () => {
  it('updates an existing checkItem in the database', async () => {
      const updatedCheckItem = {
        name: 'nuevo'
      };
      const response = await request(app)
        .patch('/api/checkItems/663a8814fff15dc8e14a6728') 
        .send(updatedCheckItem)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated CheckItem');
  });
});

// DELETE TEST
describe('DELETE /api/checkItems/:id', () => {
  it('deletes an existing checkItem from the database', async () => {
    const response = await request(app)
      .delete('/api/checkItems/6634ec539391599b7e492387') 
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/checkItems/:id', () => {
  it('responds with JSON containing the details of a specific checkItem', async () => {
    const response = await request(app)
      .get('/api/checkItems/66344d2a288b82ee41b68474') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

// GETBYCARDID TEST
describe('GET /api/checkItems/card/:id', () => {
  it('responds with JSON containing the details of a specific checkItem', async () => {
    const response = await request(app)
      .get('/api/checkItems/card/663c5a4e4d677b417a412ec2') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
