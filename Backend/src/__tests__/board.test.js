import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/boards', () => {
  it('responds with JSON containing a list of boards', async () => {
    const response = await request(app)
      .get('/api/boards')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/boards', () => {
  it('adds a new board to the database', async () => {
    const newBoard = {
      title: 'qweq',
      state: true,
      background: 'from-blue-600 to-violet-600',
      user_id: '663a849dfff15dc8e14a651f',
      members: [
        {
          member_id: '663a849dfff15dc8e14a651f',
          role: 'administrador',
          permissions: [Array]
        }
      ],
      allow_background: true,
      board_permissions: 'Administradores'
    };
    const response = await request(app)
      .post('/api/boards')
      .send(newBoard)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/boards/:id', () => {
  it('updates an existing board in the database', async () => {
      const updatedBoard = {
        title: 'nuevo'
      };
      const response = await request(app)
        .patch('/api/boards/663c54b259e3e286d7ef9f56') 
        .send(updatedBoard)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated Board');
  });
});

// DELETE TEST
describe('DELETE /api/boards/:id', () => {
  it('deletes an existing board from the database', async () => {
    const response = await request(app)
      .delete('/api/boards/663a84abfff15dc8e14a6523') 
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/boards/:id', () => {
  it('responds with JSON containing the details of a specific board', async () => {
    const response = await request(app)
      .get('/api/boards/66385269ec39bfd27675d742') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

// GETBYUSERID TEST
describe('GET /api/boards/user/:id', () => {
  it('responds with JSON containing the details of a specific board', async () => {
    const response = await request(app)
      .get('/api/boards/user/663a849dfff15dc8e14a651f') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

// GETBYMEMBERID TEST
describe('GET /api/boards/ember/:id', () => {
  it('responds with JSON containing the details of a specific board', async () => {
    const response = await request(app)
      .get('/api/boards/member/6633b709288b82ee41b66df2') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});