import { NpmRegistryEntityBase } from '../NpmRegistryEntityBase';
import type { NpmRegistrySDK } from '../NpmRegistrySDK';
import type { Control } from '../types';
import type { GetPackage, GetPackageListMatch } from '../NpmRegistryTypes';
declare class GetPackageEntity extends NpmRegistryEntityBase<GetPackage> {
    constructor(client: NpmRegistrySDK, entopts: any);
    make(this: GetPackageEntity): GetPackageEntity;
    list(this: any, reqmatch?: GetPackageListMatch, ctrl?: Control): Promise<GetPackageEntity[]>;
}
export { GetPackageEntity };
