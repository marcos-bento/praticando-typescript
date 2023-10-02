export function embaralhar(object) {
    for (let i = object.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [object[i], object[j]] = [object[j], object[i]];
    }
    return object;
}
