const { main } = require('./shortest-path');

describe('Route Calculation Application', () => {
    describe('Main Function', () => {
        test('should output correct format and route', async () => {  
            const output = await main();
    
            expect(output).toHaveProperty('start');
            expect(output).toHaveProperty('end');
            expect(output).toHaveProperty('route');
            expect(output.start).toHaveProperty('x');
            expect(output.start).toHaveProperty('y');
            expect(output.start).toHaveProperty('direction');
            expect(output.end).toHaveProperty('x');
            expect(output.end).toHaveProperty('y');
            expect(typeof output.route).toBe('string');
        });
        // Add more tests if you want
    });
});
