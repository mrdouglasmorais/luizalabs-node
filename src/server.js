import app from './app';

const PORT = process.env.PORT;
app.listen(PORT);

console.log(`This server started in port ${process.env.PORT}`)