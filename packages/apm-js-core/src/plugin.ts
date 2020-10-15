export abstract class Plugin {
    abstract onInit?(): void;
    abstract onDestory?(): void;
    abstract apply(): void;
}
