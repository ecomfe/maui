export interface GenericInformationEntry {
    type: 'information';
    description: string;
    data?: any;
}

export interface DescriptionInformationEntry {
    type: 'description';
    description: string;
}

export interface ReferrerInformationEntry {
    type: 'referrer';
    description: string;
}

export type InformationEntry = GenericInformationEntry | DescriptionInformationEntry | ReferrerInformationEntry;

const DESCRIPTION_KEY = '__maui_internal_information_description';

const REFFERER_KEY = '__maui_internal_information_referrer';

export class InformationContainer {
    private readonly entries = new Map<string, InformationEntry>();

    add(key: string, description: string, data?: any) {
        this.entries.set(key, {type: 'information', description, data});
    }

    remove(key: string) {
        this.entries.delete(key);
    }

    setDescription(description: string) {
        this.entries.set(DESCRIPTION_KEY, {type: 'description', description});
    }

    setReferrer(referrer: string) {
        this.entries.set(REFFERER_KEY, {type: 'referrer', description: referrer});
    }

    toArray() {
        return [...this.entries.values()];
    }

    clear() {
        this.entries.clear();
    }
}
