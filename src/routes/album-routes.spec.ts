import app from '../music-collection';
import * as request from 'supertest';

describe('Album API', () => {
    it('GET /album/id/cover', async () => {
        const result = await request(app).get('/album/id/cover');
        expect(result.statusCode).toEqual(200);
    });
});