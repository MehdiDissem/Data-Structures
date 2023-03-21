const Queue = require('./Queue');

describe('Queue', () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  test('enqueue method should add an item to the queue', () => {
    queue.enqueue('apple');
    expect(queue.size()).toBe(1);
  });

  test('dequeue method should remove and return the first item in the queue', () => {
    queue.enqueue('apple');
    queue.enqueue('banana');
    expect(queue.dequeue()).toBe('apple');
    expect(queue.size()).toBe(1);
  });

  test('size method should return the current size of the queue', () => {
    queue.enqueue('apple');
    queue.enqueue('banana');
    expect(queue.size()).toBe(2);
  });
});