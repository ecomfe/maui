import {test, expect} from 'vitest';
import {InformationContainer} from '../information.js';

test('add and remove', () => {
    const container = new InformationContainer();
    container.add('foo', 'foo', {});
    expect(container.toArray().length).toBe(1);
    container.remove('foo');
    expect(container.toArray().length).toBe(0);
});

test('no duplicate', () => {
    const container = new InformationContainer();
    container.add('foo', 'foo', {});
    container.add('foo', 'foo', {});
    expect(container.toArray().length).toBe(1);
});

test('description', () => {
    const container = new InformationContainer();
    container.setDescription('foo');
    expect(container.toArray().length).toBe(1);
});

test('referrer', () => {
    const container = new InformationContainer();
    container.setReferrer('foo');
    expect(container.toArray().length).toBe(1);
});

test('clear', () => {
    const container = new InformationContainer();
    container.add('foo', 'foo', {});
    container.add('bar', 'bar');
    container.clear();
    expect(container.toArray().length).toBe(0);
});
