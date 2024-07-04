import {test, expect} from 'vitest';
import {Page} from '../page.js';

test('active', () => {
    const page = new Page();
    page.setActive();
    expect(page.isActive()).toBe(true);
});

test('deactive', () => {
    const page = new Page();
    page.setActive(false);
    expect(page.isActive()).toBe(false);
});

test('destroy to clear', () => {
    const page = new Page();
    page.action.add('foo', 'foo', {});
    page.information.add('bar', 'bar');
    page.destroy();
    expect(page.action.toArray()).toEqual([]);
});
