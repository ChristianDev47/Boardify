import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/invitations', () => {
  it('responds with JSON containing a invitation of invitations', async () => {
    const response = await request(app)
      .get('/api/invitations')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/invitations', () => {
  it('adds a new invitation to the database', async () => {
    const newInvitation = {
      invitation: 'http://localhost:5173/invite/miespaciodetrabajodeuser663a849dfff15dc8e14a651f-240cb86d-c849-4cd5-8ebb-8976059123c9',
      user_id: '663a849dfff15dc8e14a651f',
      board_id: '663a84abfff15dc8e14a6523',
      expiration: '2024-05-09T05:46:29.197Z'
    };
    const response = await request(app)
      .post('/api/invitations')
      .send(newInvitation)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// GETBYID TEST
describe('GET /api/invitations/:id', () => {
  it('responds with JSON containing the details of a specific invitation', async () => {
    const response = await request(app)
      .get('/api/invitations/663ab191fff15dc8e14a8644') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

// GETBYLINK TEST
describe('GET /api/invitations/link/:token', () => {
  it('responds with JSON containing the details of a specific invitation', async () => {
    const response = await request(app)
      .get('/api/invitations/link/http://localhost:5173/invite/miespaciodetrabajodeuser663a849dfff15dc8e14a651f-240cb86d-c849-4cd5-8ebb-8976059123c9') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
