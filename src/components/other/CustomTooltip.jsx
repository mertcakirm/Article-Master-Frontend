import React, {useLayoutEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

const CustomTooltip = ({containerRef}) => {
    const tooltipRef = useRef(null);
    const [activeNote, setActiveNote] = useState(null);
    const [position, setPosition] = useState({left: 0, top: 0});

    useLayoutEffect(() => {
        if (!activeNote || !tooltipRef.current) return;

        const updatePosition = () => {
            const noteRect = activeNote.element.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const sidePadding = 12;
            const left = Math.min(
                Math.max(noteRect.left + noteRect.width / 2 - tooltipRect.width / 2, sidePadding),
                window.innerWidth - tooltipRect.width - sidePadding
            );
            const top = noteRect.top - tooltipRect.height - 10 >= sidePadding
                ? noteRect.top - tooltipRect.height - 10
                : Math.min(noteRect.bottom + 10, window.innerHeight - tooltipRect.height - sidePadding);

            setPosition({left, top: Math.max(sidePadding, top)});
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [activeNote]);

    useLayoutEffect(() => {
        const container = containerRef?.current;
        if (!container) return;

        const handlePointerOver = (event) => {
            if (!(event.target instanceof Element)) return;

            const noteElement = event.target.closest("[data-note]");
            if (!noteElement || !container.contains(noteElement)) return;

            setActiveNote({
                element: noteElement,
                content: noteElement.getAttribute("data-note") || ""
            });
        };

        const handlePointerOut = (event) => {
            if (!(event.target instanceof Element)) return;

            const noteElement = event.target.closest("[data-note]");
            if (!noteElement) return;

            const nextElement = event.relatedTarget instanceof Element ? event.relatedTarget : null;
            if (nextElement?.closest("[data-note]") === noteElement) return;

            setActiveNote((current) => current?.element === noteElement ? null : current);
        };

        container.addEventListener("pointerover", handlePointerOver);
        container.addEventListener("pointerout", handlePointerOut);

        return () => {
            container.removeEventListener("pointerover", handlePointerOver);
            container.removeEventListener("pointerout", handlePointerOut);
        };
    }, [containerRef]);

    if (!activeNote) return null;

    return createPortal(
        <div
            ref={tooltipRef}
            className="note-tooltip"
            role="tooltip"
            style={{left: `${position.left}px`, top: `${position.top}px`}}
        >
            {activeNote.content}
        </div>,
        document.body
    );
};

export default CustomTooltip;
