import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';

let codeMirror;
export const CodeMirrorTextEditor = ({ value, className }) => {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            codeMirror = new CodeMirror(ref.current, { value, mode: 'javascript', lineNumbers: true });
        }
    }, [ref]);

    return <div ref={ref}></div>;
};

export default CodeMirrorTextEditor;
