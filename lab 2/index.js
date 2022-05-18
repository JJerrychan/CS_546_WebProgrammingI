const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

// Mean Tests
try {
  console.log('1. Mean Tests');
  // Should Pass
  console.log(arrayUtils.mean([2, 3, 4]));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(arrayUtils.mean('banana'));
} catch (e) {
  console.error(e);
}

// medianSquared Tests
try {
  console.log('\n2. medianSquared Tests');
  // Should Pass
  console.log(arrayUtils.medianSquared([4, 1, 2]));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(arrayUtils.medianSquared(['guitar', 1, 3, 'apple']));
} catch (e) {
  console.error(e);
}

// maxElement Tests
try {
  console.log('\n3. maxElement Tests');
  // Should Pass
  console.log(arrayUtils.maxElement([5, 6, 7]));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(arrayUtils.maxElement([1, 2, 'nope']));
} catch (e) {
  console.error(e);
}

// fill Tests
try {
  console.log('\n4. fill Tests');
  // Should Pass
  console.log(arrayUtils.fill(7));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(arrayUtils.fill(-4));
} catch (e) {
  console.error(e);
}

// countRepeating Tests
try {
  console.log('\n5. countRepeating Tests');
  // Should Pass
  console.log(
    arrayUtils.countRepeating([
      7,
      '7',
      13,
      true,
      true,
      true,
      'Hello',
      'Hello',
      'hello',
    ])
  );
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(arrayUtils.countRepeating('foobar'));
} catch (e) {
  console.error(e);
}

// isEqual Tests
try {
  console.log('\n6. isEqual Tests');
  // Should Pass
  console.log(
    arrayUtils.isEqual(
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      [
        [3, 1, 2],
        [5, 4, 6],
        [9, 7, 8],
      ]
    )
  );
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(arrayUtils.isEqual([], {}));
} catch (e) {
  console.error(e);
}

// camelCase Tests
try {
  console.log('\n7. camelCase Tests');
  // Should Pass
  console.log(stringUtils.camelCase('How now brown cow'));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(stringUtils.camelCase(123));
} catch (e) {
  console.error(e);
}

// replaceChar Tests
try {
  console.log('\n8. replaceChar Tests');
  // Should Pass
  console.log(stringUtils.replaceChar('babbbbble'));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(stringUtils.camelCase(''));
} catch (e) {
  console.error(e);
}

// mashUp Tests
try {
  console.log('\n9. mashUp Tests');
  // Should Pass
  console.log(stringUtils.mashUp('Patrick', 'Hill'));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(stringUtils.mashUp('h', 'Hello'));
} catch (e) {
  console.error(e);
}

// makeArrays Tests
const first = { x: 2, y: 3 };
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
try {
  console.log('\n10. makeArrays Tests');
  // Should Pass
  console.log(objUtils.makeArrays([first, second, third]));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(objUtils.makeArrays([{}, {}]));
} catch (e) {
  console.error(e);
}

// isDeepEqual Tests
const f = { a: 2, b: 3 };
const s = { a: 2, b: 4 };
const t = { a: 2, b: 3 };
const forth = {
  a: { sA: 'Hello', sB: 'There', sC: 'Class' },
  b: 7,
  c: true,
  d: 'Test',
};
const fifth = {
  c: true,
  b: 7,
  d: 'Test',
  a: { sB: 'There', sC: 'Class', sA: 'Hello' },
};
try {
  console.log('\n11. isDeepEqual Tests');
  // Should Pass
  console.log(objUtils.isDeepEqual(forth, fifth));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(objUtils.isDeepEqual('foo', 'bar'));
} catch (e) {
  console.error(e);
}

// computeObject Tests
try {
  console.log('\n12. computeObject Tests');
  // Should Pass
  console.log(objUtils.computeObject({ a: 3, b: 7, c: 5 }, (n) => n * 2));
} catch (e) {
  console.error(e);
}
try {
  // Should Fail
  console.log(objUtils.computeObject({ a: 'w', b: 7, c: 5 }, (n) => n + 10));
} catch (e) {
  console.error(e);
}
