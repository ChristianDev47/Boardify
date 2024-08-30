import request from 'supertest';
import app from '../app.js';

// BOARD
// GET TEST
describe('GET /api/boardActivities', () => {
  it('responds with JSON containing a boardActivity of boardActivities', async () => {
    const response = await request(app)
      .get('/api/boardActivities')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/boardActivities', () => {
  it('adds a new boardActivity to the database', async () => {
    const newBoardActivity = {
      user: `Pedro Flores`,
      activity: `ha creado este tablero`,
      board_id: '663c54b259e3e286d7ef9f56',
    };
    const response = await request(app)
      .post('/api/boardActivities')
      .send(newBoardActivity)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// GETBYID TEST
describe('GET /api/boardActivities/:id', () => {
  it('responds with JSON containing the details of a specific boardActivitie', async () => {
    const response = await request(app)
      .get('/api/boardActivities/663c54b259e3e286d7ef9f56') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

// LIST
// GET TEST
describe('GET /api/listActivities', () => {
  it('responds with JSON containing a listActivity of listActivities', async () => {
    const response = await request(app)
      .get('/api/listActivities')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/listActivities', () => {
  it('adds a new listActivity to the database', async () => {
    const newBoardActivity = {
      user: `Carlos Rodriguez`,
      activity: `ha añadido la lista "Por hacer" a este tablero`,
      list_id: '663c597e3717b3a08b2a5630',
    };
    const response = await request(app)
      .post('/api/listActivities')
      .send(newBoardActivity)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// GETBYID TEST
describe('GET /api/listActivities/:id', () => {
  it('responds with JSON containing the details of a specific listActivitie', async () => {
    const response = await request(app)
      .get('/api/listActivities/663c597e3717b3a08b2a5630') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});


// CARD
// GET TEST
describe('GET /api/cardActivities', () => {
  it('responds with JSON containing a cardActivity of cardActivities', async () => {
    const response = await request(app)
      .get('/api/cardActivities')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/cardActivities', () => {
  it('adds a new cardActivity to the database', async () => {
    const newBoardActivity = {
      user: `Roberto Morales`,
      activity: `ha eliinado la tarjeta #1 (XDD) de por hacer`,
      cardActivity: `ha eliminado esta tarjeta de por hacer`,
      card_id: '663c5a4e4d677b417a412ec2' 
    };
    const response = await request(app)
      .post('/api/cardActivities')
      .send(newBoardActivity)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// GETBYID TEST
describe('GET /api/cardActivities/:id', () => {
  it('responds with JSON containing the details of a specific cardActivitie', async () => {
    const response = await request(app)
      .get('/api/cardActivities/663c5a4e4d677b417a412ec2') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
