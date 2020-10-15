/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export function mergeConfig(target = {}, source) {
    const _source = typeof source === 'string' ? { apiKey: source } : source;

    if (!_source.apiKey) {
        throw new Error('No Apm API Key set');
    }

    // if (!/^[0-9a-f]{32}$/i.test(this.config.apiKey)) {
    // const msg = 'should be a string of 32 hexadecimal characters';
    // }

    for (let i in _source) {
        if (target.hasOwnProperty(i)) {
            target[i] = _source[i];
        }
    }

    return target;
}
