# Coding Test - Route Calculation Application

## Introduction
Your task is to create a new application from scratch that interacts with the existing Coordinates API (which you developed in the previous test). This application will calculate and display the shortest route between two points provided by the API.

### Task Overview
Your application should make HTTP requests to the Coordinates API to retrieve start and end coordinates and then calculate the shortest route between these points. You are not modifying the API itself in this test; instead, you're building a client that consumes the API.

### Requirements

#### Features
1. **Fetch Start and End Coordinates**:
   - When calling the `main` function, make HTTP requests to the Coordinates API to get the start coordinates from `/robot/start` and the end coordinates from `/robot/end/3`.

2. **Calculate Shortest Route**:
   - After fetching the coordinates, calculate the shortest route from the start to the end point.
   - The shortest route needs to be represented as a string containing the letters `R`, `L` and `A`. Respectively meaning: turn `right`, turn `left`, `advance`.
   - For example: 
```
   The letter-string "RAALAL" means:

      Turn right
      Advance twice
      Turn left
      Advance once
      Turn left yet again
```

3. **Display the Route**:
   - Return the calculated route. The expected output is a JSON object containing the following: start, end, route.

### Implementation Notes
- Ensure your application has error handling for network requests.
- While now using your own API, the application should also work in scenarios where the API is less stable. Make sure the API requests retry when they fail.

## Tests

There is a test file that tests the format of your output, it should help you in creating the application.

Good luck!
