declare global {
    interface JQuery {
        accordion(options?: any): JQuery;
    }
}

declare module "jquery-ui/ui/widgets/accordion" {
    const _default: any;
    export default _default;
}

export {};
