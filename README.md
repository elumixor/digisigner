# Extensions

[![Build](https://github.com/elumixor/extensions/actions/workflows/build.yml/badge.svg)](https://github.com/elumixor/extensions/actions/workflows/build.yml)
[![Latest NPM version](https://img.shields.io/npm/v/@elumixor/extensions.svg)](https://www.npmjs.com/package/@elumixor/extensions)

JavaScript/TypeScript extensions for Array, Set, and String prototypes.

## Installation

```bash
npm install @elumixor/extensions
```

or

```bash
bun add @elumixor/extensions
```

## Usage

Simply import the package to add the extensions to the prototypes:

```typescript
import "@elumixor/extensions";

// Array extensions
const arr = [1, 2, 3, 4, 5];
console.log(arr.first); // 1
console.log(arr.last); // 5
console.log(arr.sum); // 15
console.log(arr.take(3)); // [1, 2, 3]

// Set extensions
const set = new Set([1, 2, 3]);
console.log(set.first); // 1
console.log(set.isEmpty); // false
set.toggle(4); // adds 4
set.toggle(4); // removes 4

// String extensions
console.log("hello".capitalize()); // "Hello"
```

## Array Extensions

### Accessors
- `first` - Get/set first element
- `second` - Get/set second element
- `last` - Get/set last element
- `isEmpty` - Check if array is empty
- `nonEmpty` - Check if array is not empty
- `get(index)` - Get element at index (supports negative indexes)

### Math Operations
- `sum` - Sum all elements
- `prod` - Multiply all elements
- `cumsum` - Cumulative sum
- `add(other)` - Element-wise addition
- `sub(other)` - Element-wise subtraction
- `max` - Get maximum element
- `min` - Get minimum element
- `argmax` - Get index of maximum element
- `argmin` - Get index of minimum element

### Manipulation
- `remove(...elements)` - Remove elements from array
- `removeAt(index)` - Remove element at index
- `insertAt(element, index)` - Insert element at index
- `set(index, value)` - Set element at index (supports negative indexes)
- `clear()` - Clear array
- `toggle(element)` - Add if not present, remove if present
- `shuffle()` - Shuffle array in-place

### Slicing
- `take(n)` - Take first n elements
- `skip(n)` - Skip first n elements
- `takeLast(n)` - Take last n elements

### Utilities
- `count(element)` - Count occurrences of element
- `unique(comparator?)` - Get unique elements
- `binarySplit(predicate)` - Split into two arrays based on condition
- `transposed` - Transpose 2D array
- `pick()` - Pick random element
- `pick(n)` - Pick n random elements with repetition
- `pick(n, {repeat: false})` - Pick n random elements without repetition
- `shuffled` - Generator of shuffled elements
- `mapLazy(callback)` - Lazy map using generator

## Set Extensions

- `first` - Get first element
- `isEmpty` - Check if set is empty
- `nonEmpty` - Check if set is not empty
- `toggle(value)` - Add if not present, remove if present

## String Extensions

- `capitalize()` - Capitalize first letter

## License

ISC
