import {getImagePath, createUrl, createSearchPath} from '../scripts/common';

test('get default image path', () => {
    expect(getImagePath(null)).toBe('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg');
});

test('get image path, use specific image name', () => {
    expect(getImagePath(null, 'square')).toBe('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/square.jpg');
});

test('get image path, use specific path, extension and name', () => {
    expect(getImagePath({path: 'http://site.com', extension: 'jpg'}, 'square')).toBe('http://site.com/square.jpg');
});

test('create default url', () => {
    expect(createUrl()).toBe('/v1/public/characters');
});

test('create url', () => {
    expect(createUrl('123')).toBe('/v1/public/characters/123');
});

test('create default search path', () => {
    expect(createSearchPath()).toBe('?ts=1&apikey=b46955bfafac34b02102753c9c17b3cf&hash=3e79cdaa61604a84cea7983f852aeec3');
});

test('create search path', () => {
    expect(createSearchPath({a: '1', b: ''})).toBe('?ts=1&apikey=b46955bfafac34b02102753c9c17b3cf&hash=3e79cdaa61604a84cea7983f852aeec3&a=1');
});
