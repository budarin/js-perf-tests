export function* traverse(obj) {
  const memory = new Set();

  function* innerTraversal(obj, path = []) {
    if (memory.has(obj)) {
      return;
    }

    memory.add(obj);

    for (var i of Object.keys(obj)) {
      const itemPath = path.concat(i);

      yield [i, obj[i], itemPath, obj];

      if (obj[i] !== null && typeof obj[i] == "object") {
        yield* innerTraversal(obj[i], itemPath);
      }
    }
  }

  yield* innerTraversal(obj);
}
