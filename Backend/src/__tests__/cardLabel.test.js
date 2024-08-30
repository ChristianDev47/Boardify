import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/cardLabels', () => {
  it('responds with JSON containing a cardLabel of cardLabels', async () => {
    const response = await request(app)
      .get('/api/cardLabels')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/cardLabels', () => {
  it('adds a new cardLabel to the database', async () => {
    const newCardLabel = {
      name: 'qweq',
      background: '#164B35',
      color: '#FFFFFF',
      is_active: true,
      card_id: '663c5a4e4d677b417a412ec2'
    };
    const response = await request(app)
      .post('/api/cardLabels')
      .send(newCardLabel)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/cardLabels/:id', () => {
  it('updates an existing cardLabel in the database', async () => {
      const updatedCardLabel = {
        name: 'nuevo'
      };
      const response = await request(app)
        .patch('/api/cardLabels/663c5f257b6addf81c81b50f') 
        .send(updatedCardLabel)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated CardLabel');
  });
});

// DELETE TEST
describe('DELETE /api/cardLabels/:id', () => {
  it('deletes an existing cardLabel from the database', async () => {
    const response = await request(app)
      .delete('/api/cardLabels/663a86b0fff15dc8e14a671a') 
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/cardLabels/:id', () => {
  it('responds with JSON containing the details of a specific cardLabel', async () => {
    const response = await request(app)
      .get('/api/cardLabels/6636c5d53848da6a45090037') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

// GETBYCARDID TEST
describe('GET /api/cardLabels/card/:id', () => {
  it('responds with JSON containing the details of a specific cardLabel', async () => {
    const response = await request(app)
      .get('/api/cardLabels/card/663c5a4e4d677b417a412ec2') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
