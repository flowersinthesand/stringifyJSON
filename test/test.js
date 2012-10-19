function setup() {
	var i;
	
	this.JSON = window.JSON;
	window.JSON = undefined;
	
	this.toJSON = {
		Boolean: Boolean.prototype.toJSON,
		Number: Number.prototype.toJSON,
		String: String.prototype.toJSON,
		Function: Function.prototype.toJSON,
		Array: Array.prototype.toJSON,
		Date: Date.prototype.toJSON,
		RegExp: RegExp.prototype.toJSON,
		Object: Object.prototype.toJSON
	};
	
	for (i in this.toJSON) {
		if (Object.prototype.hasOwnProperty.call(this.toJSON, i)) {
			window[i].prototype.toJSON = undefined;
		}
	}
}

function teardown() {
	var i;
	
	window.JSON = this.JSON;
	for (i in this.toJSON) {
		if (Object.prototype.hasOwnProperty.call(this.toJSON, i)) {
			window[i].prototype.toJSON = this.toJSON[i];
		}
	}
}

module("stringifyJSON", {setup: setup, teardown: teardown});

$.each({
	chars: {
		value: ["안녕", "Güete Tag", "你好", "Hello"],
		answer: ['"안녕"', '"Güete Tag"', '"你好"', '"Hello"']
	},
	char: {
		value: ['\"', '\\', '\/', '\b', '\f', '\n', '\r', '\t'],
		answer: ['"\\""', '"\\\\"', '"/"', '"\\b"', '"\\f"', '"\\n"', '"\\r"', '"\\t"']
	},
	nonfinite: {
		value: [NaN, Infinity, -NaN, -Infinity],
		answer: ["null", "null", "null", "null"]
	},
	zero: {
		value: [0],
		answer: ["0"]
	},
	integer: {
		value: [1, -2, 3, -4, 5, -6, 7, -8, 9],
		answer: ["1", "-2", "3", "-4", "5", "-6", "7", "-8", "9"]
	},
	fractional: {
		value: [0.1, -0.2, 0.3, -0.4, 0.5, -0.6, 0.7, -0.8, 0.9],
		answer: ["0.1", "-0.2", "0.3", "-0.4", "0.5", "-0.6", "0.7", "-0.8", "0.9"]
	},
	exponential: {
		value: [1e+20, -1E+20, 1e+21, -1E+21, 1e21, -1E21, 1e-6, -1E-6, 1e-7, -1E-7],
		answer: ["100000000000000000000", "-100000000000000000000", "1e+21", "-1e+21", "1e+21", "-1e+21", "0.000001", "-0.000001", "1e-7", "-1e-7"]
	},
	boolean: {
		value: [true, false],
		answer: ["true", "false"]
	},
	date: {
		value: [new Date(1322990436623)],
		answer: ['"2011-12-04T09:20:36Z"']
	},
	misc: {
		value: [null, undefined, $.noop, /regexp/, {toJSON: function() {return "?";}}],
		answer: ["null", undefined, undefined, "{}", '"?"']
	},
	array: {
		value: [[], ["array", 'a', NaN, 0, true, null, undefined, []]],
		answer: ["[]", '["array","a",null,0,true,null,null,[]]']
	},
	object: {
		value: [{}, {string: "array", "NaN": NaN, zero: 0, boolean: true, "null": null, "undefined": undefined, array: [], nested: {}, fn: $.noop}],
		answer: ["{}", '{"string":"array","NaN":null,"zero":0,"boolean":true,"null":null,"array":[],"nested":{}}']
	}
}, function(testName, data) {
	test(testName, function() {
		$.each(data.value, function(i, val) {
			deepEqual(stringifyJSON(val), data.answer[i]);
		});
	});
});