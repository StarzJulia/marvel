export function getImagePath(
    thumbnail: {path: string, extension: string} | null, 
    type: string = ''
) {
    if (!thumbnail) {
        thumbnail = {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
            extension: 'jpg'
        }
    }
    
    let {path, extension} = thumbnail;
    if (type) {
        type = '/' + type;
    }
    return `${path}${type}.${extension}`
}