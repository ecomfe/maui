import {ModelConnection} from './connection.js';
import {Page} from './page.js';

export class Maui {
    private readonly globalPage = new Page();

    private readonly pages = new Map<string, Page>();

    getGlobalPage() {
        return this.globalPage;
    }

    getPage(name: string) {
        const page = this.pages.get(name) ?? new Page();
        this.pages.set(name, page);
        return page;
    }

    prompt(connection: ModelConnection, userQuery: string) {
        const pages = [
            ...[...this.pages.values()].filter(v => v.isActive()).reverse(),
            this.globalPage,
        ];
        const context = pages.map(v => v.toContext()).flat();
        return connection.request(userQuery, context);
    }
}
