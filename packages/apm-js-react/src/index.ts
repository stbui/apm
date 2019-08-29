export class Reactjs {
    private instance: any;

    constructor(client) {
        this.instance = client;

        this.catch();
    }

    catch() {
        // @ts-ignore
        if (!window.React) {
            throw new Error('Error');
        }

        // // @ts-ignore
        // class Boundary extends React.Component {
        //     constructor(props) {
        //         super(props);
        //         this.state = {
        //             error: null,
        //             info: null,
        //         };
        //     }

        //     componentDidCatch(error, info) {}
        //     render() {}
        // }
    }
}
