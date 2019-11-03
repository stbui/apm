import { h } from '../core';

export default () => {
    return (
        <div className="table">
            <div className="table-header">
                <div className="table-column">Status</div>
                <div className="table-column">Method</div>
                <div
                    className="table-column"
                    style={{ flex: '0 1 428.05px', minWidth: '428.05px' }}
                >
                    URL
                </div>
            </div>
            <div className="table-body">
                <div className="table-row">
                    <div className="table-column">200</div>
                    <div className="table-column">GET</div>
                    <div
                        className="table-column"
                        style={{ flex: '0 1 428.05px', minWidth: '428.05px' }}
                    >
                        http://localhost:9000/
                    </div>
                </div>

                <div className="table-row">
                    <div className="table-column">200</div>
                    <div className="table-column">GET</div>
                    <div
                        className="table-column"
                        style={{ flex: '0 1 428.05px', minWidth: '428.05px' }}
                    >
                        http://localhost:9000/
                    </div>
                </div>
            </div>
        </div>
    );
};
