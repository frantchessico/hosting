if (process.env.NODE_ENV !== 'procuction') {
    require('dotenv').config();
}

const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('Oi')
    console.log('Enviroment: ', process.env.NODE_ENV)
});




