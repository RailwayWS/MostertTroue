import { useEffect, useRef } from "react";

/**
 * Reusable scroll-reveal hook using Intersection Observer.
 * Attach the returned ref to any element. When it scrolls into
 * view it receives the `.is-visible` class (once).
 *
 * @param {Object} options
 * @param {number} options.threshold - 0-1 visibility fraction (default 0.15)
 * @param {string} options.rootMargin - CSS margin around root (default "0px")
 */
const useScrollReveal = ({ threshold = 0.15, rootMargin = "0px" } = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("is-visible");
                    observer.unobserve(el); // animate once
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return ref;
};

export default useScrollReveal;
