import {JSONSchema7Definition} from 'json-schema';

export type ParameterSchema = JSONSchema7Definition;

export interface GenericActionEntry {
    type: 'action';
    name: string;
    description: string;
    parameters: ParameterSchema;
}

export interface RedirectActionEntry {
    type: 'redirect';
    url: string;
    description: string;
    parameters: ParameterSchema;
}

export interface ViewActionEntry {
    type: 'view';
    name: string;
    description: string;
    parameters: ParameterSchema;
}

export type ActionEntry = GenericActionEntry | RedirectActionEntry | ViewActionEntry;

const REDIRECT_KEY_PREFIX = '__maui_internal_action_redirect_';

const VIEW_KEY_PREFIX = '__maui_internal_action_view';

export class ActionContainer {
    private readonly entries = new Map<string, ActionEntry>();

    add(name: string, description: string, parameters: ParameterSchema) {
        this.entries.set(name, {type: 'action', name, description, parameters});
    }

    remove(name: string) {
        this.entries.delete(name);
    }

    addRedirectTarget(url: string, description: string, parameters: ParameterSchema) {
        this.entries.set(REDIRECT_KEY_PREFIX + url, {type: 'redirect', url, description, parameters});
    }

    removeRedirectTarget(url: string) {
        this.entries.delete(REDIRECT_KEY_PREFIX + url);
    }

    addView(name: string, description: string, parameters: ParameterSchema) {
        this.entries.set(VIEW_KEY_PREFIX + name, {type: 'view', name, description, parameters});
    }

    removeView(name: string) {
        this.entries.delete(VIEW_KEY_PREFIX + name);
    }

    toArray() {
        return [...this.entries.values()];
    }

    clear() {
        this.entries.clear();
    }
}
