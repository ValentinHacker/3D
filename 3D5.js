/**
 * REIMPLEMENT D3CONNECTGROUPs
*/

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var P2 = Math.PI * 2;

function mod(n) {
	var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var M = arguments[2];

	var _sort = [m, M].sort();

	var _sort2 = _slicedToArray(_sort, 2);

	m = _sort2[0];
	M = _sort2[1];

	var d = M - m;
	return n < m ? n + d : n > M ? n - d : n;
} //mod
function inherit(a, b) {
	for (var i in b) {
		a[i] = b[i];
	}
	return a;
} //inherit

var D3Map = function () {
	function D3Map() {
		var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
		var pen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.getElementsByTagName("canvas")[0].getContext("2d");

		_classCallCheck(this, D3Map);

		this.surface = [0, 0, d]; //coordinates
		this.camera = [0, 0, -d]; //coordinates
		this.size = [pen.canvas.width, pen.canvas.height]; //sizes
		this.orientation = [0, 0, 0]; //angles - radians
		this.vertices = [];
		this.Vertex = D3Map.Vertex;
		this.Cube = D3Map.Cube;
		this.RENDER_MODES = D3Map.RENDER_MODES;
	} //ctor

	_createClass(D3Map, [{
		key: "rotate",
		//g-field

		value: function rotate() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -this.orientation[0];
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
			var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			this.orientation[0] = mod(this.orientation[0] + x, 0, P2);
			this.orientation[1] = mod(this.orientation[1] + y, 0, P2);
			this.orientation[2] = mod(this.orientation[2] + z, 0, P2);
			return this;
		} //rotate

	}, {
		key: "translate",
		value: function translate() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -this.camera[0];
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
			var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			this.camera[0] += x;
			this.camera[1] += y;
			this.camera[2] += z;
			return this;
		} //translate

	}, {
		key: "display",
		value: function display() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
			var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.surface[2];

			inherit(this.surface, [x, y, z]);
			return this;
		} //display

	}, {
		key: "reset",
		value: function reset() {
			this.orientation = [0, 0, 0];
			this.camera = [0, 0, 0];
			return this;
		} //reset

	}, {
		key: "add",
		value: function add() {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			if (args.every(function (arg) {
				return arg instanceof _this.Vertex;
			})) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var arg = _step.value;

						this.add(arg.x, arg.y, arg.z);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return this;
			}
			var p = new (Function.prototype.bind.apply(this.Vertex, [null].concat(args, [this])))();
			this.vertices.push(p);
			return p;
		} //add

	}, {
		key: "segmentConnect",
		value: function segmentConnect() {
			var _this2 = this;

			var verticeArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.vertices;
			var pen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.getElementsByTagName("canvas")[0].getContext("2d");

			if (!(verticeArray instanceof Array && verticeArray.every(function (vtex) {
				return vtex instanceof _this2.Vertex;
			}))) {
				throw "ENOVERTEX";
			}

			for (var i = 0; i < verticeArray.length; i++) {
				if (i && verticeArray[i].coords[2] > 0) {
					pen.lineTo.apply(pen, _toConsumableArray(verticeArray[i].coord2d));
				} else if (!i && verticeArray[i].coords[2] >= 0) {
					pen.moveTo.apply(pen, _toConsumableArray(verticeArray[i].coord2d));
				} else {
					try {
						var chk = verticeArray[i].clip(verticeArray[i ? i - 1 : i + 1]).coord2d;
						if (Number.isNaN(chk[0]) || Number.isNaN(chk[1]) || !Number.isFinite(chk[0]) || !Number.isFinite(chk[1])) break;
						if (i) {
							pen.lineTo.apply(pen, _toConsumableArray(chk));
						} else {
							pen.moveTo.apply(pen, _toConsumableArray(chk));
						}
					} catch (r) {
						break;
					}
				}
			}

			return this;
		} //segmentConnect

	}, {
		key: "v0",
		get: function get() {
			// Point on Plane
			return new D3Vertex(0, 0, this.camera[2], this);
		} //g-v0

	}, {
		key: "n",
		get: function get() {
			//https://stackoverflow.com/questions/10781639/how-to-compute-normal-vector-to-least-square-plane-in-povray-only

			var pts = [new this.Vertex(-this.size[0] / 2, -this.size[1] / 2, this.camera[2], this), //C
			new this.Vertex(-this.size[0] / 2, this.size[1] / 2, this.camera[2], this), //B
			new this.Vertex(this.size[0] / 2, -this.size[1] / 2, this.camera[2], this) //A
			],
			    a = pts[2].sub(pts[0]),
			    b = pts[1].sub(pts[0]),
			    xvec = a.cross(b);

			return xvec;
		} //g-n

	}, {
		key: "field",
		get: function get() {
			return 2 * Math.atan(1 / this.surface[2]);
		}
	}]);

	return D3Map;
}(); //D3Map

var D3Vertex = function () {
	function D3Vertex(x, y, z, map) {
		_classCallCheck(this, D3Vertex);

		if (x instanceof D3Vertex) {
			var _ref = [x.x, x.y, x.z, x.map];
			x = _ref[0];
			y = _ref[1];
			z = _ref[2];
			map = _ref[3];
		}

		this.x = x;
		this.y = y;
		this.z = z;
		this.map = map;
		this._id = this.map.Vertex.idcnt++;
	} //ctor

	_createClass(D3Vertex, [{
		key: "clip",
		//g-coord2d

		value: function clip(p0) {
			//http://geomalgorithms.com/a05-_intersect-1.html

			if (!(p0 instanceof D3Vertex)) {
				throw "ENOVERTEX";
			}

			var s = this.map.v0.sub(p0).dot(this.map.n) / this.sub(p0).dot(this.map.n),
			    pd = this.sub(p0);

			if (s < 0 || s > 1 || !this.map.n.dot(pd)) {
				throw "ENOINTERSCT";
			}

			return p0.add(pd.mult(s));
		} //clip

	}, {
		key: "add",
		value: function add(p1) {
			if (!(p1 instanceof D3Vertex)) {
				throw "ENOVERTEX";
			}

			var p0 = new D3Vertex(this);
			p0.x += p1.x;
			p0.y += p1.y;
			p0.z += p1.z;

			return p0;
		} //add

	}, {
		key: "sub",
		value: function sub(p1) {
			if (!(p1 instanceof D3Vertex)) {
				throw "ENOVERTEX";
			}

			var p0 = new D3Vertex(this);
			p0.x -= p1.x;
			p0.y -= p1.y;
			p0.z -= p1.z;

			return p0;
		} //sub

	}, {
		key: "dot",
		value: function dot(p1) {
			if (!(p1 instanceof D3Vertex)) {
				throw "ENOVERTEX";
			}

			return this.x * p1.x + this.y * p1.y + this.z * p1.z;
		} //dot

	}, {
		key: "mult",
		value: function mult(num) {
			if (typeof num === "string" && /^[0-9]+$/.test(num)) {
				num = num * 1;
			} else if (typeof num === "number") {
				num = [num, num, num];
			} else if (!(num instanceof Array)) {
				throw "EINVALNUM";
			}

			var p0 = new D3Vertex(this);
			p0.x *= num[0];
			p0.y *= num[1];
			p0.z *= num[2];

			return p0;
		} //mult

	}, {
		key: "cross",
		value: function cross(vtex) {
			if (!(p1 instanceof D3Vertex)) {
				throw "ENOVERTEX";
			}

			var out = new D3Vertex(0, 0, 0, this.map);

			out.x = this.y * vtex.z - this.z * vtex.y;
			out.y = this.x * vtex.z - this.z * vtex.x;
			out.z = this.x * vtex.y - this.y * vtex.x;

			return out;
		} //cross

	}, {
		key: "coords",
		get: function get() {
			var c1 = Math.cos(this.map.orientation[0]),
			    c2 = Math.cos(this.map.orientation[1]),
			    c3 = Math.cos(this.map.orientation[2]),
			    s1 = Math.sin(this.map.orientation[0]),
			    s2 = Math.sin(this.map.orientation[1]),
			    s3 = Math.sin(this.map.orientation[2]),
			    x = this.x - this.map.camera[0],
			    y = this.y - this.map.camera[1],
			    z = this.z - this.map.camera[2],
			    s3y = s3 * y,
			    s3x = s3 * x,
			    c3x = c3 * x,
			    c3y = c3 * y,
			    s2z = s2 * z,
			    c2z = c2 * z;

			return [c2 * (s3y + c3x) - s2z, s1 * (c2z + s2 * (s3y + c3x)) + c1 * (c3y - s3x), c1 * (c2z + s2 * (s3y + c3x)) - s1 * (c3y - s3x)];
		} //g-coords

	}, {
		key: "scoords",
		get: function get() {
			return new (Function.prototype.bind.apply(D3Vertex, [null].concat(_toConsumableArray(this.coords), [this.map])))();
		} //g-scoords

	}, {
		key: "coord2d",
		get: function get() {
			var tmp = this.coords,
			    p = this.map.surface[2] / tmp[2];

			return [p * tmp[0] + this.map.surface[0], p * tmp[1] + this.map.surface[1]];
		}
	}]);

	return D3Vertex;
}(); //D3Vertex

var D3Cube = function () {
	function D3Cube(points8) {
		var map6_4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : D3Cube.matrix;

		_classCallCheck(this, D3Cube);

		this.points = points8;
		this.matrix = map6_4;
		this.trans = [0, 0, 0];
		this.middlew = function () {};
	} //ctor

	_createClass(D3Cube, [{
		key: "render",
		value: function render() {
			var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new D3Map();

			var _this3 = this;

			var pen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.getElementsByTagName("canvas")[0].getContext("2d");
			var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : map.RENDER_MODES.BOTH;

			pen.save();

			var pts = this.points.map(function (pt) {
				return new map.Vertex(pt.x + _this3.trans[0], pt.y + _this3.trans[1], pt.z + _this3.trans[2], map);
			});

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.matrix[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var i = _step2.value;


					pen.beginPath();
					map.segmentConnect(i.map(function (idx) {
						return pts[idx];
					}), pen);
					this.middlew();
					pen.closePath();

					if ((mode & map.RENDER_MODES.STROKE) == map.RENDER_MODES.STROKE) {
						pen.stroke();
					}
					if ((mode & map.RENDER_MODES.FILL) == map.RENDER_MODES.FILL) {
						pen.fill();
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			pen.restore();

			return this;
		} //render

	}]);

	return D3Cube;
}(); //D3Cube

D3Cube.matrix = [[0, 1, 2, 3], //FRONT
[4, 5, 6, 7], //BACK
[0, 1, 5, 4], //UP
[3, 2, 6, 7], //DOWN
[0, 4, 7, 3], //LEFT
[1, 5, 6, 2] //RIGHT
];
D3Vertex.idcnt = 0;
D3Map.Vertex = D3Vertex;
D3Map.Cube = D3Cube;
D3Map.RENDER_MODES = {
	FILL: 1,
	STROKE: 2,
	BOTH: 3
};

/*
	https://en.m.wikipedia.org/wiki/D3_projection
	
	Orthographic: coords.x  coords.y
	Perspective: coord2d.x  coord2d.y
*/