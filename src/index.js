const { app } = require('./config/express');

const main = () => {
	app.listen(app.get('port'));
	console.log(`Server running in 
        http://localhost:${app.get('port')}/`);
};

main();
