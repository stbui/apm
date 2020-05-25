import { Plugin } from '@apm/js';

export class ReactjsPlugin extends Plugin {
    static pluginName: string = 'ReactjsPlugin';

    constructor(kernel) {
        super(kernel);
    }

    apply() {
        // @ts-ignore
        if (!window.React) {
            throw new Error('Error');
        }

        const dispatcher = this.dispatcher

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

                dispatcher.dispatch('notify', event);
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
