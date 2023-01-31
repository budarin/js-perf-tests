# Analysis of performance test results

🇷🇺 [На русском языке](./readme.ru.md)

The main platform for performance analysis is `linux`, since all containerization environments use this operating system. The rest of the platforms are only needed to confirm trends.

The results can be viewed in the file [node.v19.2.0.json](node.v19.2.0.json)

## Arrays

### Includes vs indexOf

Example:

```js
if (arr.indexOf(item) > -1) {...}  // arr.includes(item)

if (arr.indexOf(item) >= 0) {...}  // arr.includes(item)

if (arr.indexOf(item) !== -1) {...}  // arr.includes(item)

if (arr.indexOf(item) === -1) {...}  // !arr.includes(item)

if (~arr.indexOf(item) ) {...}   // arr.includes(item)

if (!~arr.indexOf(item) ) {...}   // !arr.includes(v)
```

On all platforms, there is obviously a huge performance advantage of `includes` over `indexOf` - hundreds and thousands of percent!

`Conclusion`: It is necessary to transform `indexOf` to `includes` in cases where `indexOf` is used as `includes`

### Accessing array elements by destructuring them into variables

Example:

```js
const [a, b c] = arr;
```

vs

```js
const a = arr[0];
const b = arr[1];
const c = arr[2];
```

Obviously, destructuring array elements into variables is much less productive than index access - several hundred percent!

`Conclusion`: it is necessary to transform destructuring into accessing array elements by index

### Creating an inline array by destructuring other arrays

Example:

```js
const y = [...arr]; // arr.slice()
```

Creating an array by destructuring a single element is equivalent to using the `slice` method on this array. `slice` wins in performance

`Conclusion`: transform the destructuring of a single element when creating an array into a `slice` call for it.

Example:

```js
const x = [...arr, 1, 2, 3, ...arr1];
```

In most cases, destructuring is faster than calling the `concat` method for arrays.
But the implementation of creating an array based on the `for` loop in cases where destructuring is used is many times more productive than destructuring.

`Conclusion`: transform the creation of arrays by destructuring elements into a `for` loop

### Map vs for

The implementation of the `map` method using the `for` loop is more productive due to the fact that

-   we can immediately create an array of the required length, and not add an element per iteration
-   do not use checks for rarely used scenarios
-   we use predicates only with the first 2 parameters

The implementation of the loop-based method shows a linear growth with an increase in the number of elements in the array.
A particularly large performance gain is seen when processing arrays with `float` - creating an array element is the most expensive operation in time.

`Conclusion`: it is necessary to transform the `map` method into a `for` loop call

### ForEach, reduce

The implementation based on the `for` loop shows a linear increase in performance with an increase in the number of elements in the array
On arrays with a size of 3 elements, the custom implementation shows an increase of 2% and grows up to 700% on arrays with 10_000 elements.

`Conclusion`: transformation is expedient

### Join

The implementation based on the `for` loop shows better performance compared to the native implementation

`Conclusion`: transformation is expedient

### Join.trim

The implementation based on the `for` loop shows better performance compared to the native implementation

`Conclusion`: transformation is expedient

### Filter, find, some, every

Native implementations either outperform the implementation using the `for` loop in performance or are not much inferior

`Conclusion`: there is no point in transformation

### Chains of cyclic method calls

Filter:

-   <array>.filter.map
-   <array>.filter.map.join
-   <array>.filter.map.join.trim

-   <array>.filter.reduce
-   <array>.filter.foreEach

Map:

-   <array>.map.map. ..

-   <array>.map.reduce
-   <array>.map.forEach

-   <array>.map.filter
-   <array>.map.filter.join
-   <array>.map.filter.join.trim

Join:

-   <array>.join.trim

By combining several cycles into one, the resulting performance will always be higher than the original one
In addition to higher performance when implemented in one cycle, the production of "garbage" is reduced due to the fact that we do not create temporary arrays

`Conclusion`: it is necessary to transform the call chains into a single `for` loop

## Strings

### Template vs string concatenation

There is no big difference between using templates and concatenation using the `+` operator and the `concat` method.

`Conclusion`: transformation is impractical

### Substring search using includes vs indexOf

There is no particular difference when using these methods

`Conclusion`: transformation is impractical

## Numbers

### Converting strings to numbers

The `Number()` constructor shows a huge performance advantage over using the `parseInt` and `parseFloat` methods

`Conclusion`: it is necessary to transform the calls `parseInt` and `parseFloat` into a call `Number()`

## Objects

### Creating inline objects by destructuring other objects

Example:

```js
const obj = { ...obj1, a: '1', b: true, ...obj2 };
```

vs

```js
const obj = Object.assign({}, obj1, { a: '1', b: true }, obj2);
```

`Object.assign` shows a huge performance advantage over using destructuring - hundreds of percent

`Conclusion`: transformation of destructurization into a call to `Object.assign` is required
