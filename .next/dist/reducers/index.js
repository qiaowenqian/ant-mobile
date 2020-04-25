"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

var _project = require("./project");

var _project2 = _interopRequireDefault(_project);

var _task = require("./task");

var _task2 = _interopRequireDefault(_task);

var _label = require("./label");

var _label2 = _interopRequireDefault(_label);

var _feedback = require("./feedback");

var _feedback2 = _interopRequireDefault(_feedback);

var _dynamic = require("./dynamic");

var _dynamic2 = _interopRequireDefault(_dynamic);

var _help = require("./help");

var _help2 = _interopRequireDefault(_help);

var _cache = require("./cache");

var _cache2 = _interopRequireDefault(_cache);

var _statistics = require("./statistics");

var _statistics2 = _interopRequireDefault(_statistics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  user: _user2.default,
  project: _project2.default,
  task: _task2.default,
  label: _label2.default,
  feedback: _feedback2.default,
  dynamic: _dynamic2.default,
  help: _help2.default,
  cache: _cache2.default,
  statistics: _statistics2.default
});