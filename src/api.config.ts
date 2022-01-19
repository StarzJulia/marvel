//export const hashLink: string = 'ts=1&apikey=a1123188cb19baca3ec84c4e395e0d7f&hash=04ed533740d4a11545644862255a849d';
import {ConfigInterface} from './interfaces/interfaces';

export const config: ConfigInterface = {
    origin : '',
    url: '/v1/public/characters',
    getParams: {
        ts: 1,
        apikey: 'b46955bfafac34b02102753c9c17b3cf',
        hash: '3e79cdaa61604a84cea7983f852aeec3'
    },
    defaultThumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
        extension: 'jpg'
    }
}