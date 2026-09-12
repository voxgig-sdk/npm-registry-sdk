export interface GetPackage {
    email?: string;
    id?: string;
    name?: string;
}
export interface GetPackageListMatch {
    id: string;
}
export interface Search {
    package?: Record<string, any>;
    score?: Record<string, any>;
    searchScore?: number;
}
export interface SearchListMatch {
    from?: number;
    maintenance?: number;
    popularity?: number;
    quality?: number;
    size?: number;
    text: string;
}
