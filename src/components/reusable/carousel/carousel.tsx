import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./styles.module.scss";

interface ICarouselItem {
    id: string;
    title: string;
    description?: string;
    preview: string;
}

interface ICarouselProps {
    items: ICarouselItem[];
    className?: string;
}

export function Carousel({ items, className }: ICarouselProps) {
    const [index, setIndex] = useState(0);

    const startXRef = useRef<number | null>(null);
    const isDraggingRef = useRef(false);
    const deltaXRef = useRef(0);

    const prev = () => {
        setIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const next = () => {
        setIndex((prev) => (prev + 1) % items.length);
    };

    const getOffset = (i: number) => {
        const offset = i - index;

        // handle circular wrap visually
        if (offset < -items.length / 2) return offset + items.length;
        if (offset > items.length / 2) return offset - items.length;

        return offset;
    };

    const onPointerDown = (e: React.PointerEvent) => {
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
        deltaXRef.current = 0;
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDraggingRef.current || startXRef.current === null) return;
        deltaXRef.current = e.clientX - startXRef.current;
    };

    const onPointerUp = () => {
        if (!isDraggingRef.current) return;

        const threshold = 20;
        if (deltaXRef.current > threshold) {
            prev();
        } else if (deltaXRef.current < -threshold) {
            next();
        }

        isDraggingRef.current = false;
        startXRef.current = null;
        deltaXRef.current = 0;
    };

    useEffect(() => {
        // const interval = setInterval(() => {
        //     setIndex((prev) => (prev + 1) % items.length);
        // }, 3000);
        //
        // return () => clearInterval(interval);
    }, [items.length]);

    return (
        <div className={`${styles.carousel} ${className || ""}`}>
            <button className={styles.navLeft} onClick={prev}>
                <ChevronLeft size={20} />
            </button>

            <div
              className={styles.viewport}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
                {items.map((item, i) => {
                    const offset = getOffset(i);

                    return (
                        <div
                            key={item.id}
                            className={styles.card}
                            style={{
                                transform: `
                  translateX(${offset * 220}px)
                  scale(${1 - Math.abs(offset) * 0.2})
                  rotateY(${offset * -30}deg)
                `,
                                opacity: Math.abs(offset) > 2 ? 0 : 1,
                                zIndex: 10 - Math.abs(offset),
                            }}
                        >
                            <div
                                className={styles.preview}
                                style={{
                                    backgroundImage: `url(${item.preview})`,
                                }}
                            />

                            <div className={styles.info}>
                                <h3>{item.title}</h3>
                                {item.description && <p>{item.description}</p>}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className={styles.navRight} onClick={next}>
                <ChevronRight size={20} />
            </button>
        </div>
    );
}