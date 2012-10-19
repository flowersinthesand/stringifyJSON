stringifyJSON
====================

### The jQuery.parseJSON's best friend

Converts a value to JSON string.

```js
alert(stringifyJSON({name: "Donghwan"}) === '{"name":"Donghwan"}');
```

`stringifyJSON` is useful for those who want to use `JSON.stringify` in browsers which don't implement the JSON object and are reluctant to declare global variable `JSON` and add `toJSON` methods to prototypes, such as plugin developers. In cases where the native `JSON.stringify` is avilable, `stringifyJSON` uses it by default.

Because the JSON standard is frozen and this plugin is heavily based on Douglas Crockford's [reference implementation](https://github.com/douglascrockford/JSON-js/blob/master/json2.js), these sources are unlikely to be modified. So, you may take the latest or copy and paste it freely.