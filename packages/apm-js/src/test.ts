export const Plugin = (): ClassDecorator => {
    return target => {};
};

@Plugin()
export class OnErroExcaptionPlugin {
    constructor() {}

    public resolve() {}
}

export class Test {
    static plugins = [];
    static create(plugins) {}

    static use() {}
}

Test.create([OnErroExcaptionPlugin]);
