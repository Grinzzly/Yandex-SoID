const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const pagesRoutes = require('./pages/routes');
const graphqlRoutes = require('./graphql/routes');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'pages/pugs'));

app.use('/', pagesRoutes);
app.use(graphqlRoutes);

app.listen(PORT, () => console.log(
  `Running an Express server at localhost:${PORT}` +
  '\r\n' +
  `Running a GraphQL API server at localhost:${PORT}/graphiql`
));
