import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/lists', () => {
  it('responds with JSON containing a list of lists', async () => {
    const response = await request(app)
      .get('/api/lists')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/lists', () => {
  it('adds a new list to the database', async () => {
    const newList = { name: 'qwewqe', position: 2, board_id: '663c54b259e3e286d7ef9f56' };
    const response = await request(app)
      .post('/api/lists')
      .send(newList)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/lists/:id', () => {
  it('updates an existing list in the database', async () => {
      const updatedList = {
        name: 'nuevo'
      };
      const response = await request(app)
        .patch('/api/lists/663c597e3717b3a08b2a5630') 
        .send(updatedList)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated List');
  });
});

// DELETE TEST
describe('DELETE /api/lists/:id', () => {
  it('deletes an existing list from the database', async () => {
    const response = await request(app)
      .delete('/api/lists/663a8fd5fff15dc8e14a7319') 
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/lists/:id', () => {
  it('responds with JSON containing the details of a specific list', async () => {
    const response = await request(app)
      .get('/api/lists/663c597e3717b3a08b2a5630') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

// GETBYBOARDID TEST
describe('GET /api/lists/board/:id', () => {
  it('responds with JSON containing the details of a specific list', async () => {
    const response = await request(app)
      .get('/api/lists/board/663c54b259e3e286d7ef9f56') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
