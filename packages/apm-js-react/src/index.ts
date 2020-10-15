export class ReactjsPlugin {
    static pluginName: string = 'ReactjsPlugin';

    constructor(kernel) {}

    apply() {
        // @ts-ignore
        if (!window.React) {
            throw new Error('Error');
        }

        const hooks = this.kernel;
        // @ts-ignore
        class ErrorBoundary extends window.React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    error: null,
                    info: null,
                };
            }

            componentDidCatch(error, info) {
                const event = {
                    errorClass: error.name,
                    errorMessage: error.message,
                    type: 'unhandledException',
                };

                hooks.trigger('notify', event);
            }

            render() {
                const { error }: any = this.state;
                if (error) {
                    const { FallbackComponent }: any = this.props;
                    if (FallbackComponent) return window.React.createElement(FallbackComponent, this.state);
                    return null;
                }

                return this.props.children;
            }
        }
    }
}
