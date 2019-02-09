import app from '@root/music-collection';
import * as request from 'supertest';

describe('Status API', () => {
    it('GET /status', async () => {
        const result = await request(app).get('/status');
        expect(result.statusCode).toEqual(200);
        expect(result.body).toBeInstanceOf(Object);
    });
    it('GET /status/playing', async () => {
        const result = await request(app).get('/status/playing');
        expect(result.statusCode).toEqual(200);
        expect(result.body).toBe(false);
    });
});