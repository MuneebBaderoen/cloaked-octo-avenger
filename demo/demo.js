var _ = require('underscore'),
	Tetris = require('./tetris/tetris.js');

var demo = [];
demo.push(Tetris);

Tetris.start();

module.exports = demo;