import {getImagePath} from '../scripts/common';

test('get default image path', () => {
    expect(getImagePath(null)).toBe('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg');
});

test('get image path, use specific image name', () => {
    expect(getImagePath(null, 'square')).toBe('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/square.jpg');
});

test('get image path, use specific path, extension and name', () => {
    expect(getImagePath({path: 'http://site.com', extension: 'jpg'}, 'square')).toBe('http://site.com/square.jpg');
});
