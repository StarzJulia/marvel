export interface CaracterCardInterface {
    id: number;
    name: string;
    realName?: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    }
}

export interface CharacterAppearance {
    name: string;
    resourceURI: string;
}

export interface CharacterAppearanceList {
    
}