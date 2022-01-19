export interface CaracterCardInterface {
    id: number;
    name: string;
    realName?: string;
    description: string;
    thumbnail: ThumbnailInterface | null
}

export interface ThumbnailInterface {
    path: string;
    extension: string;
}

export interface ConfigInterface {
    origin: string;
    url: string;
    getParams: {[key: string]: string | number},
    defaultThumbnail: ThumbnailInterface
}

export interface CharacterAppearance {
    name: string;
    resourceURI: string;
}

export interface FilterContentInterface {
    total: number;
    limit: number;
    count: number;
    offset: number;
    change: (params: {}) => void
}