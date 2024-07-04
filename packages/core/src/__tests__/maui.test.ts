import {test, expect} from 'vitest';
import {Maui} from '../maui.js';
import {ContextEntry, ModelConnection, ModelResponse} from '../connection.js';

class MockConnection extends ModelConnection {
    userQuery = '';

    context: ContextEntry[] = [];

    protected async getPrompt(userQuery: string, context: ContextEntry[]): Promise<string> {
        this.userQuery = userQuery;
        this.context = context;
        return '';
    }

    protected async callModel(prompt: string): Promise<ModelResponse> {
        return {
            type: 'action',
            name: prompt,
            arguments: {},
        };
    }
}

test('global page singleton', () => {
    const maui = new Maui();
    maui.getGlobalPage().information.add('foo', 'foo');
    expect(maui.getGlobalPage().information.toArray().length).toBe(1);
});

test('page by name', () => {
    const maui = new Maui();
    maui.getPage('page').information.add('foo', 'foo');
    expect(maui.getPage('page').information.toArray().length).toBe(1);
});

test('dump context', async () => {
    const maui = new Maui();
    maui.getGlobalPage().information.add('foo', 'foo');
    maui.getPage('page').information.add('foo', 'foo');
    const connection = new MockConnection();
    await maui.prompt(connection, 'query');
    expect(connection.userQuery).toBe('query');
    expect(connection.context.length).toBe(2);
});
