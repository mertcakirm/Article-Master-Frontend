import React, {useEffect, useState} from "react";

const CustomTooltip = () => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        content: '',
        position: {x: 0, y: 0}
    });
    const [hoveredElement, setHoveredElement] = useState(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const element = document.elementFromPoint(e.clientX, e.clientY);

            if (element === hoveredElement) {
                setTooltip(prev => ({
                    ...prev,
                    position: {x: e.clientX, y: e.clientY}
                }));
                return;
            }

            setHoveredElement(element);

            if (element && element.hasAttribute('data-note')) {
                const content = element.getAttribute('data-note');
                setTooltip({
                    visible: true,
                    content,
                    position: {x: e.clientX, y: e.clientY}
                });
            } else {
                setTooltip(prev => ({...prev, visible: false}));
            }
        };

        const handleMouseLeave = () => {
            setTooltip(prev => ({...prev, visible: false}));
            setHoveredElement(null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hoveredElement]);

    if (!tooltip.visible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                left: `${tooltip.position.x + 10}px`,
                top: `${tooltip.position.y + 10}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        >
            {tooltip.content}
        </div>
    );
};

export default CustomTooltip;