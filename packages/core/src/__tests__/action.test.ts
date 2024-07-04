import {test, expect} from 'vitest';
import {ActionContainer} from '../action.js';

test('add and remove', () => {
    const container = new ActionContainer();
    container.add('foo', 'foo', {});
    expect(container.toArray().length).toBe(1);
    container.remove('foo');
    expect(container.toArray().length).toBe(0);
});

test('no duplicate', () => {
    const container = new ActionContainer();
    container.add('foo', 'foo', {});
    container.add('foo', 'foo', {});
    expect(container.toArray().length).toBe(1);
});

test('redirect', () => {
    const container = new ActionContainer();
    container.addRedirectTarget('/foo', 'foo', {});
    expect(container.toArray().length).toBe(1);
    container.removeRedirectTarget('/foo');
    expect(container.toArray().length).toBe(0);
});

test('view', () => {
    const container = new ActionContainer();
    container.addView('foo', 'foo', {});
    expect(container.toArray().length).toBe(1);
    container.removeView('foo');
    expect(container.toArray().length).toBe(0);
});

test('clear', () => {
    const container = new ActionContainer();
    container.add('foo', 'foo', {});
    container.add('bar', 'bar', {});
    container.clear();
    expect(container.toArray().length).toBe(0);
});
