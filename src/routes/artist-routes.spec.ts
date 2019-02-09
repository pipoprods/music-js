import app from '../music-collection';
import * as request from 'supertest';

describe('Artist API', () => {
    it('GET /artist', async () => {
        const result = await request(app).get('/artist');
        expect(result.statusCode).toEqual(200);
        expect(result.body).toBeInstanceOf(Array);
    });
});