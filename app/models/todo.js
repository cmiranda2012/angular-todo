// 'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text: String
});
