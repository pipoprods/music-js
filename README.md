# Music-JS

This project is a Web API to [https://www.musicpd.org/](Music Player Daemon)
based on [https://expressjs.com/](ExpressJS).

It requires a running MPD to be reachable on localhost.

## Design rules

- written in TypeScript
- class inheritance
- modular design
- comes with tests through [https://jestjs.io/](Jest)
  & [https://github.com/visionmedia/supertest](Supertest)
- API-wide data pagination system

## Running

```
npm install
npm start
```

## Testing

```
npm test
```
