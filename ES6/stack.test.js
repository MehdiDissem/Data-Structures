const Stack = require('./stack');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  test('should push elements onto the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.getSize()).toBe(3);
  });

  test('should pop elements off the stack', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.getSize()).toBe(0);
  });

  test('should return undefined when popping from an empty stack', () => {
    expect(stack.pop()).toBeUndefined();
  });
});