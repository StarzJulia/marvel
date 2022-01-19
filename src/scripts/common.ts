import {config} from '../api.config';
import {ThumbnailInterface} from '../interfaces/interfaces';

export function createUrl(param?: string): string {
    let {origin, url} = config;
    let requestUrl = origin + url;

    if (param) {
        requestUrl += `/${param}`;
    }
    
    return requestUrl;
}

export function createSearchPath(additionalParams?: {}) {
    const {getParams} = config;
    let hashLine = destructureParamsIntoSearch(getParams);

    if (additionalParams) {
        hashLine += destructureParamsIntoSearch(additionalParams, 1);
    }

    return hashLine;
}

function destructureParamsIntoSearch(obj: {[key: string]: string | number}, i: number = 0) {
    let result = '';

    for (let key in obj) {
        if (obj[key] !== '') {
            result += `${(i == 0 ? '?' : '&')}${key}=${obj[key]}`;
            i += 1;
        }
    } 

    return result;
}

export function getImagePath(
    thumbnail: ThumbnailInterface | null, 
    type: string = ''
) {
    if (!thumbnail) {
        thumbnail = config.defaultThumbnail;
    }
    
    let {path, extension} = thumbnail;
    if (type) {
        type = '/' + type;
    }
    return `${path}${type}.${extension}`
}