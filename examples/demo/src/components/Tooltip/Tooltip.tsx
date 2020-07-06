import React, { useEffect } from 'react';

export default ({ children }) => {
    const _mouseMove = () => {};

    useEffect(() => {
        document.addEventListener('mousemove', _mouseMove, true);
        document.addEventListener('mousedown', _mouseMove, true);
        document.addEventListener('mouseleave', _mouseMove, true);

        return () => {
            document.removeEventListener('mousemove', _mouseMove);
            document.removeEventListener('mousedown', _mouseMove);
            document.removeEventListener('mouseleave', _mouseMove);
        };
    }, []);

    return <div className="widget vbox panel resources">{children}</div>;
};
