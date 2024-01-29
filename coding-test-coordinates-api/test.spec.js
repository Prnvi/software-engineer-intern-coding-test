const request = require('supertest');
const server = require('./index');

afterAll(() => {
    server.close();
});

describe('Coordinates API Tests', () => {
    test('/health should return "ok"', async () => {
        const response = await request(server).get('/health');
        expect(response.status).toBe(200);
        expect(response.text).toBe('ok');
    });

    test('/robot/start should return valid coordinates and direction', async () => {
        const response = await request(server).get('/robot/start');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('x');
        expect(response.body).toHaveProperty('y');
        expect(response.body).toHaveProperty('direction');
        expect(response.body.x).toBeGreaterThanOrEqual(0);
        expect(response.body.x).toBeLessThanOrEqual(15);
        expect(Math.abs(response.body.y % 3)).toBe(0);
        expect(['NORTH', 'EAST', 'SOUTH', 'WEST']).toContain(response.body.direction);
    });

    test.each([[1, {x: 1, y: 1}], [2, {x: 4, y: 4}], [3, {x: 9, y: 9}], [4, {x: 16, y: 16}]])(
        '/robot/end/%i should return %p', async (difficulty, expected) => {
            const response = await request(server).get(`/robot/end/${difficulty}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expected);
        }
    );
});
