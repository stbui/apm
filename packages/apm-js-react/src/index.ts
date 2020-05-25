import { Plugin } from '@apm/js';
// @ts-ignore
class ErrorBoundary extends window.React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            info: null,
        };
    }

    componentDidCatch(error, info) {}

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
    }
}
