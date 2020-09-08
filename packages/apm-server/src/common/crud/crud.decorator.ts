export class CrudRoutesFactory {
    protected options;
    constructor(private target, options) {
        this.options = options;
    }
    static create(target, options) {
        return new CrudRoutesFactory(target, options);
    }

    private get targetProto(): any {
        return this.target.prototype;
    }
}

export const Crud = options => (target: Object) => {
    console.log(target, options);

    let factory = CrudRoutesFactory.create(target, options);

    factory = undefined;
};
