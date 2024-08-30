const request = require('supertest');
const app = require('../app'); 

describe('Login endpoint', () => {
  it('should return a JWT token when valid email and password are provided', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'example@example.com', password: 'password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
  
  it('should return 401 Unauthorized when invalid email or password is provided', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'example@example.com', password: 'invalidpassword' });

    expect(response.statusCode).toBe(401);
  });

});
