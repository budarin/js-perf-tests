// https://stackoverflow.com/questions/722668/traverse-all-the-nodes-of-a-json-object-tree-with-javascript

export function* traverse(obj) {
    const memory = new Set();

    function* innerTraversal(obj, path = []) {
        if (memory.has(obj)) {
            // we've seen this object before don't iterate it
            return;
        }

        // add the new object to our memory.
        memory.add(obj);

        for (var i of Object.keys(obj)) {
            const itemPath = path.concat(i);

            yield [i, obj[i], itemPath, obj];

            if (obj[i] !== null && typeof obj[i] == 'object') {
                //going one step down in the object tree!!
                yield* innerTraversal(obj[i], itemPath);
            }
        }
    }

    yield* innerTraversal(obj);
}

// const o = { a: { b: { c: 3 } } };

// for (var [key, value, path, parent] of traverse(o)) {
//     // do something here with each key and value
//     console.log(key, value, path, parent);
// }
