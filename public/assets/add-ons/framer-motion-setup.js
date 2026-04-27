import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm";

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const heroElements = document.querySelectorAll(
        ".hero-content h1, .hero-content p, .hero-content .hero-cta-btn, .page-hero-content h1, .page-hero-content p"
    );

    if (heroElements.length > 0) {
        animate(
            heroElements,
            { opacity: [0, 1], y: [16, 0] },
            { duration: 0.7, ease: "ease-out", delay: stagger(0.08) }
        );
    }

    const revealSelector = [
        ".feature-card",
        ".step",
        ".comparison-card",
        ".faq-item",
        ".team-member-card",
        ".value-card",
        ".stat-card",
        ".partnership-type-card",
        ".sponsor-benefit-card",
        ".sponsor-return-item"
    ].join(", ");

    inView(
        revealSelector,
        (element) => {
            animate(
                element,
                { opacity: [0, 1], y: [24, 0], filter: ["blur(4px)", "blur(0px)"] },
                { duration: 0.6, ease: "ease-out" }
            );
        },
        { amount: 0.2 }
    );
}
