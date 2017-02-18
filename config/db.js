require('dotenv').config();

module.exports = {
	'database': `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds153239.mlab.com:53239/todolist`
};
