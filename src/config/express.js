const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(
	cors({
		origins: '*',
	})
);
app.use(
	express.json({
		limit: '50mb',
	})
);

app.get('/', (request, response) => {
	response.send('Welcome to SAVIT API');
});

module.exports = {
	app,
};
