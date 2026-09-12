import { NpmRegistryEntityBase } from '../NpmRegistryEntityBase';
import type { NpmRegistrySDK } from '../NpmRegistrySDK';
import type { Control } from '../types';
import type { Search, SearchListMatch } from '../NpmRegistryTypes';
declare class SearchEntity extends NpmRegistryEntityBase<Search> {
    constructor(client: NpmRegistrySDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    list(this: any, reqmatch?: SearchListMatch, ctrl?: Control): Promise<SearchEntity[]>;
}
export { SearchEntity };
