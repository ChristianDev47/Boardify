import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/cards', () => {
  it('responds with JSON containing a card of cards', async () => {
    const response = await request(app)
      .get('/api/cards')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/cards', () => {
  it('adds a new card to the database', async () => {
    const newCard = {
      name: 'XDD',
      is_active: true,
      is_completed: false,
      background: '',
      position: 1,
      list_id: '663c597e3717b3a08b2a5630'
    };
    const response = await request(app)
      .post('/api/cards')
      .send(newCard)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/cards/:id', () => {
  it('updates an existing card in the database', async () => {
      const updatedCard = {
        name: 'nuevo'
      };
      const response = await request(app)
        .patch('/api/cards/663c5a4e4d677b417a412ec2') 
        .send(updatedCard)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated Card');
  });
});

// DELETE TEST
describe('DELETE /api/cards/:id', () => {
  it('deletes an existing card from the database', async () => {
    const response = await request(app)
      .delete('/api/cards/663a9078fff15dc8e14a754e') 
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/cards/:id', () => {
  it('responds with JSON containing the details of a specific card', async () => {
    const response = await request(app)
      .get('/api/cards/663c5a4e4d677b417a412ec2') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

// GETBYLISTID TEST
describe('GET /api/cards/list/:id', () => {
  it('responds with JSON containing the details of a specific card', async () => {
    const response = await request(app)
      .get('/api/cards/list/663a8de9fff15dc8e14a719b') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
