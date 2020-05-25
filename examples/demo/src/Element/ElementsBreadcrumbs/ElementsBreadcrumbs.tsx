import React, { useState } from 'react';

export const Crumb = ({ label, id, cls, selected, extra }: any) => {
    // const [selected] = useState(false);
    // const [extra] = useState(false);

    const nodeLabelName = `node-label-name${extra ? ' extra' : ''}`;
    const nodeLabelClass = `${extra ? 'extra ' : ''}node-label-class`;

    return (
        <span className={`crumb${selected ? ' selected' : ''}`}>
            <span className={nodeLabelName}>{label}</span>
            {id ? <span className="node-label-id">#{id}</span> : null}
            {cls ? <span className={nodeLabelClass}>{cls}</span> : null}
        </span>
    );
};

export default () => {
    return (
        <div className="widget hbox">
            <div className="crumbs">
                <Crumb label="html" />
                <Crumb label="body" />
                <Crumb label="div" id="wrapper" extra />
                <Crumb label="div" id="head" extra />
                <Crumb label="div" id="bottom_layer" cls=".s-bottom-layer.s-isindex-wrap" extra />
                <Crumb label="div" id="s-bottom-layer-right" cls=".s-bottom-layer-right" extra selected />
            </div>
        </div>
    );
};
