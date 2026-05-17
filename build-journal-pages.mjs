// Synthica Journal — page generator.
// Generates every journal-*.html sibling page from a single content map
// so the shared header/footer stays in sync. Run: `node build-journal-pages.mjs`.

import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const SITE = "https://www.synthica.org";
const TODAY = "2026-05-17";

// -----------------------------------------------------------------------------
// Shared chrome
// -----------------------------------------------------------------------------

const head = ({ title, description, slug }) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Synthica Journal</title>
    <meta name="description" content="${description}">
    <meta name="author" content="Synthica Journal">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
    <link rel="canonical" href="${SITE}/${slug}">

    <meta property="og:title" content="${title} — Synthica Journal">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${SITE}/${slug}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Synthica Journal">
    <meta property="og:image" content="${SITE}/src/logo/Synthica Preview Image.png">
    <meta property="og:locale" content="en_US">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} — Synthica Journal">
    <meta name="twitter:description" content="${description}">

    <link rel="icon" type="image/png" href="src/logo/Synthica Favicon.png">
    <link rel="sitemap" type="application/xml" href="sitemap.xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="journal.css?v=20260517">
</head>
<body>
<a class="jskip" href="#jmain">Skip to main content</a>

<div class="j-utility">
    <div class="j-utility-inner">
        <div class="j-utility-left">
            <span class="j-util-item"><span class="j-util-key">ISSN</span> pending</span>
            <span class="j-util-sep" aria-hidden="true"></span>
            <span class="j-util-item j-util-oa">Open Access · CC BY 4.0</span>
        </div>
        <div class="j-utility-right">
            <a href="index.html" class="j-util-link">← synthica.org</a>
        </div>
    </div>
</div>

<header class="j-header" id="j-top">
    <div class="j-header-inner">
        <a href="journal.html" class="j-logo" aria-label="Synthica Journal home">
            <img src="src/logo/Synthica Logo.png" alt="" class="j-logo-img">
            <span class="j-logo-text">
                <span class="j-logo-name">Synthica</span>
                <span class="j-logo-sub">Journal</span>
            </span>
        </a>
        <nav aria-label="Primary navigation">
            <ul class="j-nav">
                <li class="j-nav-item">
                    <button class="j-nav-btn" aria-expanded="false" aria-haspopup="true">Articles
                        <svg class="j-caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <ul class="j-dropdown" role="menu">
                        <li><a href="journal-issues.html" role="menuitem">Current Issue</a></li>
                        <li><a href="journal-issues.html" role="menuitem">All Issues</a></li>
                        <li><a href="journal-announcements.html" role="menuitem">Announcements</a></li>
                        <li class="j-dropdown-sep" role="separator"></li>
                        <li><a href="journal-search.html" role="menuitem">Search Articles</a></li>
                    </ul>
                </li>
                <li class="j-nav-item">
                    <button class="j-nav-btn" aria-expanded="false" aria-haspopup="true">For Authors
                        <svg class="j-caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <ul class="j-dropdown" role="menu">
                        <li><a href="journal-for-authors.html" role="menuitem">Author Hub</a></li>
                        <li><a href="journal-for-authors-submission-guidelines.html" role="menuitem">Submission Guidelines</a></li>
                        <li><a href="journal-for-authors-formatting-guide.html" role="menuitem">Formatting Guide</a></li>
                        <li><a href="journal-for-authors-article-types.html" role="menuitem">Article Types</a></li>
                        <li><a href="journal-for-authors-author-checklist.html" role="menuitem">Pre-Submission Checklist</a></li>
                        <li class="j-dropdown-sep" role="separator"></li>
                        <li><a href="journal-for-authors-faq.html" role="menuitem">Author FAQ</a></li>
                        <li><a href="journal-for-reviewers.html" role="menuitem">For Reviewers</a></li>
                    </ul>
                </li>
                <li class="j-nav-item">
                    <button class="j-nav-btn" aria-expanded="false" aria-haspopup="true">About
                        <svg class="j-caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <ul class="j-dropdown" role="menu">
                        <li><a href="journal-about.html" role="menuitem">About the Journal</a></li>
                        <li><a href="journal-aims-and-scope.html" role="menuitem">Aims &amp; Scope</a></li>
                        <li><a href="journal-about-team.html" role="menuitem">Editorial Team</a></li>
                        <li><a href="journal-about-advisory-board.html" role="menuitem">Advisory Board</a></li>
                        <li><a href="journal-about-reviewers.html" role="menuitem">Reviewers</a></li>
                        <li><a href="journal-about-history.html" role="menuitem">History &amp; Milestones</a></li>
                        <li class="j-dropdown-sep" role="separator"></li>
                        <li><a href="journal-contact.html" role="menuitem">Contact</a></li>
                    </ul>
                </li>
                <li class="j-nav-item">
                    <button class="j-nav-btn" aria-expanded="false" aria-haspopup="true">Policies
                        <svg class="j-caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <ul class="j-dropdown j-dropdown-wide" role="menu">
                        <li><a href="journal-policies.html" role="menuitem">All Policies</a></li>
                        <li class="j-dropdown-sep" role="separator"></li>
                        <li><a href="journal-policies-peer-review.html" role="menuitem">Peer Review</a></li>
                        <li><a href="journal-policies-open-access.html" role="menuitem">Open Access &amp; Licensing</a></li>
                        <li><a href="journal-policies-ethics.html" role="menuitem">Publication Ethics</a></li>
                        <li><a href="journal-policies-authorship.html" role="menuitem">Authorship &amp; CRediT</a></li>
                        <li><a href="journal-policies-ai-disclosure.html" role="menuitem">AI Disclosure</a></li>
                        <li><a href="journal-policies-data-sharing.html" role="menuitem">Data Availability</a></li>
                        <li><a href="journal-policies-corrections.html" role="menuitem">Corrections &amp; Retractions</a></li>
                        <li><a href="journal-policies-conflicts-of-interest.html" role="menuitem">Conflicts of Interest</a></li>
                        <li><a href="journal-policies-human-subjects.html" role="menuitem">Human Subjects Research</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div class="j-header-actions">
            <a href="journal-search.html" class="j-icon-btn" aria-label="Search articles">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9 2a7 7 0 015.29 11.55l4.08 4.08-1.41 1.41-4.08-4.08A7 7 0 119 2zm0 2a5 5 0 100 10 5 5 0 000-10z" fill="currentColor"/></svg>
            </a>
            <a href="journal-submit.html" class="j-submit-btn">Submit Manuscript</a>
            <button type="button" class="j-burger" aria-label="Open menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>
    </div>
    <div class="j-mobile" hidden>
        <ul>
            <li><a href="journal-issues.html">Current Issue</a></li>
            <li><a href="journal-for-authors.html">For Authors</a></li>
            <li><a href="journal-about.html">About</a></li>
            <li><a href="journal-policies.html">Policies</a></li>
            <li><a href="journal-search.html">Search</a></li>
            <li><a href="journal-contact.html">Contact</a></li>
            <li class="j-mobile-cta"><a href="journal-submit.html">Submit Manuscript</a></li>
        </ul>
    </div>
</header>

<main id="jmain">`;

const footer = `</main>

<footer class="j-footer">
    <div class="j-footer-inner">
        <div class="j-footer-brand">
            <a href="journal.html" class="j-footer-logo">
                <img src="src/logo/Synthica Logo.png" alt="">
                <span>
                    <span class="j-footer-logo-name">Synthica</span>
                    <span class="j-footer-logo-sub">Journal</span>
                </span>
            </a>
            <p>Independent, open-access, peer-reviewed STEM journal for student researchers. Published under CC BY 4.0.</p>
            <a href="mailto:editorial@synthicajournal.org" class="j-footer-email">editorial@synthicajournal.org</a>
        </div>
        <div class="j-footer-col">
            <h3>About</h3>
            <a href="journal-about.html">About Synthica</a>
            <a href="journal-about-team.html">Editorial Team</a>
            <a href="journal-about-advisory-board.html">Advisory Board</a>
            <a href="journal-contact.html">Contact</a>
        </div>
        <div class="j-footer-col">
            <h3>For Authors</h3>
            <a href="journal-for-authors-submission-guidelines.html">Submission Guidelines</a>
            <a href="journal-for-authors-formatting-guide.html">Formatting Guide</a>
            <a href="journal-for-authors-article-types.html">Article Types</a>
            <a href="journal-for-authors-faq.html">Author FAQ</a>
        </div>
        <div class="j-footer-col">
            <h3>Policies</h3>
            <a href="journal-policies-peer-review.html">Peer Review</a>
            <a href="journal-policies-ethics.html">Ethics</a>
            <a href="journal-policies-open-access.html">Open Access</a>
            <a href="journal-policies-ai-disclosure.html">AI Disclosure</a>
            <a href="journal-policies-corrections.html">Corrections</a>
        </div>
        <div class="j-footer-col">
            <h3>Explore</h3>
            <a href="journal-issues.html">Current Issue</a>
            <a href="journal-issues.html">All Issues</a>
            <a href="journal-search.html">Search</a>
            <a href="journal-announcements.html">Announcements</a>
        </div>
    </div>
    <div class="j-footer-bottom">
        <div class="j-footer-bottom-inner">
            <p>© 2026 Synthica Journal. Content licensed under
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>.
                ISSN pending.
            </p>
            <p class="j-footer-links">
                <a href="journal-contact.html">Contact</a>
                <span aria-hidden="true">·</span>
                <a href="journal-policies.html">Policies</a>
                <span aria-hidden="true">·</span>
                <a href="index.html">Synthica.org</a>
            </p>
        </div>
    </div>
</footer>

<script>
(function() {
    const navItems = document.querySelectorAll('.j-nav-item');
    function closeAll() {
        navItems.forEach(i => {
            i.classList.remove('open');
            const b = i.querySelector('.j-nav-btn');
            if (b) b.setAttribute('aria-expanded', 'false');
        });
    }
    navItems.forEach(item => {
        const btn = item.querySelector('.j-nav-btn');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasOpen = item.classList.contains('open');
            closeAll();
            if (!wasOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.j-nav-item')) closeAll();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAll();
    });
    const header = document.querySelector('.j-header');
    const onScroll = () => {
        if (window.scrollY > 8) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const burger = document.querySelector('.j-burger');
    const mobile = document.querySelector('.j-mobile');
    if (burger && mobile) {
        burger.addEventListener('click', () => {
            const open = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', String(!open));
            burger.classList.toggle('is-open', !open);
            if (open) mobile.setAttribute('hidden', '');
            else mobile.removeAttribute('hidden');
        });
        mobile.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                burger.setAttribute('aria-expanded', 'false');
                burger.classList.remove('is-open');
                mobile.setAttribute('hidden', '');
            }
        });
    }
})();
</script>
</body>
</html>`;

// -----------------------------------------------------------------------------
// Building blocks
// -----------------------------------------------------------------------------

const pageHero = ({ eyebrow, h1, lede }) => `
<section class="j-pageheader" aria-labelledby="page-title">
    <div class="j-pageheader-inner">
        ${eyebrow ? `<p class="j-eyebrow">${eyebrow}</p>` : ""}
        <h1 id="page-title" class="j-page-h1">${h1}</h1>
        ${lede ? `<p class="j-page-lede">${lede}</p>` : ""}
    </div>
</section>`;

const breadcrumbs = (items) => `
<nav class="j-crumbs" aria-label="Breadcrumb">
    <ol>
        ${items
          .map((it, i) =>
            it.href && i < items.length - 1
              ? `<li><a href="${it.href}">${it.label}</a></li>`
              : `<li aria-current="page">${it.label}</li>`
          )
          .join("")}
    </ol>
</nav>`;

const section = ({ id, alt, inner }) => `
<section class="j-sec${alt ? " j-sec-alt" : ""}"${id ? ` id="${id}"` : ""}>
    <div class="j-sec-inner">${inner}</div>
</section>`;

const policyMeta = ({ effective, version }) => `
<p class="j-policy-meta">
    <span><strong>Effective:</strong> ${effective}</span>
    <span aria-hidden="true">·</span>
    <span><strong>Version:</strong> ${version}</span>
    <span aria-hidden="true">·</span>
    <span><strong>Aligned with:</strong> IEEE · COPE · Society for Science</span>
</p>`;

const ctaBlock = `
<section class="j-cta">
    <div class="j-cta-inner">
        <p class="j-eyebrow j-eyebrow-light">Ready to publish?</p>
        <h2>Submit your research to Synthica Journal.</h2>
        <p>A credible, citable, open-access venue for student STEM research — at zero cost to authors or readers.</p>
        <div class="j-cta-actions">
            <a href="journal-submit.html" class="j-btn j-btn-primary">Submit Your Manuscript</a>
            <a href="journal-for-authors-submission-guidelines.html" class="j-btn j-btn-ghost-dark">Read submission guidelines</a>
        </div>
    </div>
</section>`;

// -----------------------------------------------------------------------------
// Page definitions
// -----------------------------------------------------------------------------

const pages = [];

// ============================== ABOUT ==============================

pages.push({
  slug: "journal-about",
  title: "About Synthica Journal",
  description:
    "Synthica is an independent, open-access, peer-reviewed STEM journal for student researchers worldwide — modeled on IEEE publication ethics, COPE guidelines, and Society for Science safeguards.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "About" }])}
${pageHero({
  eyebrow: "About Synthica Journal",
  h1: "An open record for student science.",
  lede:
    "Synthica is an independent, open-access, peer-reviewed STEM journal. We publish original research, reviews, methods, and perspectives from student researchers — under professional editorial standards, with zero charges to authors or readers.",
})}

${section({
  inner: `
<div class="j-about-grid">
    <div>
        <p class="j-eyebrow">Mission</p>
        <h2 class="j-h2">Make student research credible and findable.</h2>
        <p class="j-lead">Synthica exists because rigorous high-school and undergraduate research deserves the same discoverability, citation infrastructure, and editorial accountability as professional science. We are designed to function like a junior <em>Nature</em> or <em>PLOS&nbsp;ONE</em>: full Google Scholar metadata, registered DOIs, structured abstracts, declarations, and a transparent peer-review record on every article.</p>
        <p class="j-lead">We are not affiliated with IEEE as an organizational branch, but we follow IEEE publication ethics and target IEEE-adjacent conference pathways for our strongest authors.</p>
    </div>
    <ul class="j-trust">
        <li><span class="j-trust-num">01</span><h3>Double-blind peer review</h3><p>Two independent reviewers, written editorial rationale, four-week target turnaround.</p></li>
        <li><span class="j-trust-num">02</span><h3>IEEE-aligned ethics</h3><p>Authorship, conflicts, AI disclosure, and corrections policies modeled on IEEE and COPE.</p></li>
        <li><span class="j-trust-num">03</span><h3>Fully open access</h3><p>Immediate CC BY 4.0 publication. No charges to authors. No charges to readers.</p></li>
        <li><span class="j-trust-num">04</span><h3>Scholar-ready pages</h3><p>Citation metadata, stable DOI URLs, crawlable HTML abstracts, downloadable PDFs.</p></li>
    </ul>
</div>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd">
    <p class="j-eyebrow">Identity</p>
    <h2 class="j-h2">What Synthica is — and what it is not.</h2>
</header>
<div class="j-twocol">
    <div>
        <h3 class="j-h3">What Synthica is</h3>
        <ul class="j-bullets">
            <li>An independent, open-access scholarly journal for STEM research authored by students.</li>
            <li>Peer-reviewed (double-blind, two reviewers minimum, four-week target).</li>
            <li>Designed from day one to satisfy Google Scholar's automatic crawling requirements.</li>
            <li>Designed to qualify for DOAJ indexing after the required publishing history.</li>
            <li>Free to publish, free to read — no article processing charges, no paywalls.</li>
        </ul>
    </div>
    <div>
        <h3 class="j-h3">What Synthica is not</h3>
        <ul class="j-bullets">
            <li>Not affiliated with IEEE as an organizational branch.</li>
            <li>Not a school newsletter or a class project portfolio.</li>
            <li>Not a venue that publishes unreviewed work, opinion pieces without scholarly framing, or AI-generated submissions.</li>
            <li>Not a paywalled or login-gated venue at any point in the reader workflow.</li>
        </ul>
    </div>
</div>`,
})}

${section({
  inner: `
<header class="j-sec-hd">
    <p class="j-eyebrow">Governance</p>
    <h2 class="j-h2">Who makes editorial decisions.</h2>
    <p>The Editorial Chair makes routine editorial decisions, with Faculty Advisor sign-off on borderline cases. Editors and advisory-board members who co-author submitted articles are excluded from handling those manuscripts. Author-to-reviewer matching avoids institutional conflicts.</p>
</header>
<ul class="j-gov">
    <li>
        <h3>Editorial Chair</h3>
        <p>Owns desk review, reviewer assignment, decision letters, and publication scheduling. The Editorial Chair recuses on any manuscript involving an institutional or personal conflict; the Faculty Advisor reassigns.</p>
    </li>
    <li>
        <h3>Faculty Advisor</h3>
        <p>Provides adult academic supervision. Reviews borderline editorial decisions, ethics escalations, and conflict-of-interest recusals. Final authority on contested cases.</p>
    </li>
    <li>
        <h3>Technical Lead</h3>
        <p>Maintains the publishing platform, citation metadata infrastructure, accessibility compliance, and Google Scholar / DOAJ indexing readiness.</p>
    </li>
    <li>
        <h3>Advisory Board</h3>
        <p>External researchers (≥ 5 members, ≥ 2 with terminal research qualifications) provide field expertise on scope, ethics escalations, and reviewer recruitment.</p>
    </li>
</ul>
<p class="j-sec-foot"><a href="journal-about-team.html" class="j-text-link">Meet the editorial team →</a> &nbsp;<a href="journal-about-advisory-board.html" class="j-text-link">See the advisory board →</a></p>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd">
    <p class="j-eyebrow">At a glance</p>
    <h2 class="j-h2">Synthica in one table.</h2>
</header>
<div class="j-table-wrap">
<table class="j-table">
    <tbody>
        <tr><th scope="row">Category</th><td>Independent open-access STEM research journal</td></tr>
        <tr><th scope="row">Target authors</th><td>Student researchers worldwide</td></tr>
        <tr><th scope="row">Peer review</th><td>Double-blind, two reviewers minimum</td></tr>
        <tr><th scope="row">Access model</th><td>Fully open access — no paywalls, no login walls</td></tr>
        <tr><th scope="row">License</th><td>Creative Commons Attribution 4.0 International (CC BY 4.0)</td></tr>
        <tr><th scope="row">Indexing target</th><td>Google Scholar (primary) · DOAJ (after eligibility)</td></tr>
        <tr><th scope="row">Ethics alignment</th><td>IEEE · COPE · Society for Science</td></tr>
        <tr><th scope="row">DOI registration</th><td>Crossref (resolves to HTML landing page)</td></tr>
        <tr><th scope="row">ISSN</th><td>Pending (applied via U.S. ISSN Center)</td></tr>
        <tr><th scope="row">APC / fees</th><td>None. Free to publish. Free to read.</td></tr>
    </tbody>
</table>
</div>`,
})}

${ctaBlock}
`,
});

pages.push({
  slug: "journal-about-team",
  title: "Editorial Team",
  description:
    "Synthica's editorial team — Faculty Advisor, Editorial Chair, Technical Lead, and Associate Editors recruited by discipline area.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "About", href: "journal-about.html" },
  { label: "Editorial Team" },
])}
${pageHero({
  eyebrow: "Editorial Team",
  h1: "Who runs Synthica.",
  lede:
    "The editorial team is responsible for every step from desk review to publication. Each role is named, scoped, and accountable. Associate Editor positions are open by discipline area — see below.",
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Leadership</h2></header>
<div class="j-team">
    <article class="j-person">
        <div class="j-avatar" aria-hidden="true">FA</div>
        <h3>Faculty Advisor</h3>
        <p class="j-person-role">Academic oversight &amp; ethics escalation</p>
        <p>Provides adult academic supervision for editorial decisions and research safeguards. Final authority on contested editorial decisions, conflicts of interest, and ethics referrals.</p>
        <p class="j-person-cred">Position currently held under recruitment. <a href="journal-contact.html">Contact editorial</a> for details.</p>
    </article>
    <article class="j-person">
        <div class="j-avatar" aria-hidden="true">EC</div>
        <h3>Editorial Chair</h3>
        <p class="j-person-role">Peer review &amp; publication workflow</p>
        <p>Manages desk review, reviewer assignment, decision letters, author communication, and publication scheduling for every manuscript.</p>
        <p class="j-person-cred"><a href="mailto:editorial@synthicajournal.org">editorial@synthicajournal.org</a></p>
    </article>
    <article class="j-person">
        <div class="j-avatar" aria-hidden="true">TL</div>
        <h3>Technical Lead</h3>
        <p class="j-person-role">Metadata, platform &amp; accessibility</p>
        <p>Owns the publishing platform, citation metadata infrastructure, accessibility compliance (WCAG 2.1 AA), and Google Scholar and DOAJ indexing readiness.</p>
        <p class="j-person-cred"><a href="mailto:editorial@synthicajournal.org">editorial@synthicajournal.org</a></p>
    </article>
</div>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd" id="associate-editors">
    <p class="j-eyebrow">Associate Editors</p>
    <h2 class="j-h2">By discipline area</h2>
    <p>Associate Editors serve as primary contacts for manuscripts in their field. They are recruited from advanced undergraduate, graduate, or early-career researchers with subject expertise. Positions below are open for applications.</p>
</header>
<ul class="j-assoc">
    <li><span class="j-assoc-field">Biology &amp; Life Sciences</span><a href="mailto:editorial@synthicajournal.org?subject=Associate%20Editor%20Application%20-%20Biology">Apply →</a></li>
    <li><span class="j-assoc-field">Computer Science &amp; AI</span><a href="mailto:editorial@synthicajournal.org?subject=Associate%20Editor%20Application%20-%20CS">Apply →</a></li>
    <li><span class="j-assoc-field">Physics &amp; Engineering</span><a href="mailto:editorial@synthicajournal.org?subject=Associate%20Editor%20Application%20-%20Physics">Apply →</a></li>
    <li><span class="j-assoc-field">Chemistry &amp; Materials</span><a href="mailto:editorial@synthicajournal.org?subject=Associate%20Editor%20Application%20-%20Chemistry">Apply →</a></li>
    <li><span class="j-assoc-field">Earth &amp; Environmental Science</span><a href="mailto:editorial@synthicajournal.org?subject=Associate%20Editor%20Application%20-%20Earth">Apply →</a></li>
    <li><span class="j-assoc-field">Mathematics &amp; Statistics</span><a href="mailto:editorial@synthicajournal.org?subject=Associate%20Editor%20Application%20-%20Math">Apply →</a></li>
    <li><span class="j-assoc-field">Neuroscience &amp; Cognitive Science</span><a href="mailto:editorial@synthicajournal.org?subject=Associate%20Editor%20Application%20-%20Neuro">Apply →</a></li>
    <li><span class="j-assoc-field">Public Health &amp; Epidemiology</span><a href="mailto:editorial@synthicajournal.org?subject=Associate%20Editor%20Application%20-%20PH">Apply →</a></li>
</ul>`,
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h3">Recusal and conflict policy</h2></header>
<p>Editors and Associate Editors who co-author or share an institutional affiliation with the authors of a submitted manuscript are recused from handling that manuscript. The Editorial Chair reassigns. If the conflict involves the Editorial Chair, the Faculty Advisor reassigns. Reviewer matching is performed to avoid institutional and personal conflicts; reviewers with disclosed conflicts are not assigned. See the <a href="journal-policies-conflicts-of-interest.html">Conflicts of Interest policy</a>.</p>`,
})}

${ctaBlock}
`,
});

pages.push({
  slug: "journal-about-advisory-board",
  title: "Advisory Board",
  description:
    "Synthica's external advisory board provides field expertise, ethics oversight, and reviewer-network access. DOAJ requires at least two members with terminal research qualifications.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "About", href: "journal-about.html" },
  { label: "Advisory Board" },
])}
${pageHero({
  eyebrow: "Advisory Board",
  h1: "External oversight and field expertise.",
  lede:
    "Synthica's Advisory Board is an independent body of external researchers. They advise on scope, ethics escalations, and reviewer recruitment, and they hold the editorial team accountable to professional standards. The board has at least five members; at least two hold terminal research qualifications (PhD or equivalent).",
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Role of the board</h2></header>
<ul class="j-bullets">
    <li>Reviews journal-level decisions on scope, ethics, and policy.</li>
    <li>Advises on reviewer recruitment in their field.</li>
    <li>Provides escalation path for ethics complaints that cannot be resolved by the Editorial Chair and Faculty Advisor.</li>
    <li>Does not vote on individual editorial decisions for manuscripts.</li>
    <li>Members who co-author a submission are excluded from any handling of that submission.</li>
</ul>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd"><h2 class="j-h2">Current members</h2>
<p>Advisory Board recruitment is in progress. The roster below will be populated with full names, credentials, institutional affiliations, fields of expertise, and ORCID iDs as members are confirmed.</p></header>
<ul class="j-team">
    <li class="j-person j-person-tba">
        <div class="j-avatar" aria-hidden="true">TBA</div>
        <h3>Seat 1 — Life Sciences</h3>
        <p class="j-person-role">Terminal research qualification</p>
        <p>Field expertise in biology, biomedical, or life-science research. ORCID iD required.</p>
    </li>
    <li class="j-person j-person-tba">
        <div class="j-avatar" aria-hidden="true">TBA</div>
        <h3>Seat 2 — Physical Sciences</h3>
        <p class="j-person-role">Terminal research qualification</p>
        <p>Field expertise in physics, chemistry, earth sciences, or engineering. ORCID iD required.</p>
    </li>
    <li class="j-person j-person-tba">
        <div class="j-avatar" aria-hidden="true">TBA</div>
        <h3>Seat 3 — Computer Science &amp; Mathematics</h3>
        <p class="j-person-role">Research or industry expertise</p>
        <p>Field expertise in computer science, machine learning, applied or pure mathematics.</p>
    </li>
    <li class="j-person j-person-tba">
        <div class="j-avatar" aria-hidden="true">TBA</div>
        <h3>Seat 4 — Research Ethics</h3>
        <p class="j-person-role">IRB / ethics experience</p>
        <p>Expertise in human subjects research ethics, IRB oversight, or research integrity.</p>
    </li>
    <li class="j-person j-person-tba">
        <div class="j-avatar" aria-hidden="true">TBA</div>
        <h3>Seat 5 — Open Science / Indexing</h3>
        <p class="j-person-role">Scholarly publishing experience</p>
        <p>Expertise in open-access publishing, metadata, indexing, or scholarly communication.</p>
    </li>
</ul>`,
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Nominate a board member</h2>
<p>Synthica welcomes nominations for the Advisory Board, including self-nominations from qualified researchers. Send a short bio and CV to <a href="mailto:editorial@synthicajournal.org?subject=Advisory%20Board%20Nomination">editorial@synthicajournal.org</a>.</p></header>`,
})}

${ctaBlock}
`,
});

pages.push({
  slug: "journal-about-reviewers",
  title: "Become a Reviewer",
  description:
    "How to volunteer as a peer reviewer for Synthica Journal — eligibility, expectations, training, and recognition.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "About", href: "journal-about.html" },
  { label: "Reviewers" },
])}
${pageHero({
  eyebrow: "Reviewers",
  h1: "Help review student STEM research.",
  lede:
    "Synthica depends on a network of independent reviewers — graduate students, postdocs, faculty, and senior undergraduates with subject expertise. Reviewing for Synthica is unpaid academic service; reviewer contributions can be added to your Web of Science / ORCID record on request.",
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Eligibility</h2></header>
<ul class="j-bullets">
    <li>Subject expertise in at least one discipline area Synthica accepts.</li>
    <li>Graduate-level coursework or research experience in that area.</li>
    <li>No conflicts of interest with the manuscript or its authors.</li>
    <li>Willing to commit to a four-week review turnaround.</li>
    <li>ORCID iD recommended (free at <a href="https://orcid.org" target="_blank" rel="noopener">orcid.org</a>).</li>
</ul>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">What you'll do</h2></header>
<ol class="j-steps">
    <li><span class="j-step-num">01</span><h3>Receive invitation</h3><p>The Editorial Chair invites you to review a specific manuscript matched to your stated expertise. You may decline or recuse for conflicts.</p></li>
    <li><span class="j-step-num">02</span><h3>Read &amp; evaluate</h3><p>Assess methodology, originality, clarity, ethics compliance, and contribution. Use the reviewer rubric.</p></li>
    <li><span class="j-step-num">03</span><h3>Write a report</h3><p>Structured report: summary, major issues, minor issues, recommendation (Accept / Minor / Major / Reject).</p></li>
    <li><span class="j-step-num">04</span><h3>Submit by deadline</h3><p>Four weeks from assignment. Extensions available on request.</p></li>
</ol>
<p class="j-sec-foot"><a href="journal-for-reviewers-guidelines.html" class="j-text-link">Read the full reviewer guidelines →</a></p>`,
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Confidentiality and integrity</h2></header>
<p>Manuscripts under review are confidential. You may not share, cite, or use the manuscript content for any purpose other than the review. AI tools (including large language models) <strong>must not</strong> be used to read, analyze, or generate review content — uploading a confidential manuscript to an AI tool is a breach of confidentiality. See the <a href="journal-policies-ai-disclosure.html">AI Disclosure policy</a> for details.</p>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Recognition</h2></header>
<ul class="j-bullets">
    <li>Reviewer contributions can be exported to ORCID and Web of Science on request.</li>
    <li>Annual list of reviewers is published in the journal (initials only by default; full names by opt-in).</li>
    <li>Outstanding Reviewer awards each volume.</li>
</ul>
<p class="j-sec-foot"><a href="journal-for-reviewers-sign-up.html" class="j-btn j-btn-primary">Apply to review →</a></p>`,
})}

${ctaBlock}
`,
});

pages.push({
  slug: "journal-about-history",
  title: "History & Milestones",
  description:
    "Synthica Journal milestones — from founding through ISSN registration, pilot issue, Crossref membership, and DOAJ application.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "About", href: "journal-about.html" },
  { label: "History" },
])}
${pageHero({
  eyebrow: "History",
  h1: "How Synthica was built.",
  lede:
    "Synthica was designed from day one to satisfy Google Scholar's automatic indexing criteria and DOAJ's open-access standards. The timeline below records the operational milestones — not editorial decisions on individual manuscripts.",
})}

${section({
  inner: `
<ol class="j-timeline">
    <li>
        <p class="j-timeline-date">2026 · Q1</p>
        <h3>Editorial framework drafted</h3>
        <p>Spec v1.0 produced. IEEE / COPE / Society for Science alignment confirmed. Policy drafts circulated.</p>
    </li>
    <li>
        <p class="j-timeline-date">2026 · Q2</p>
        <h3>Domain, hosting, and platform stood up</h3>
        <p>synthicajournal.org domain registered. HTTPS configured. OJS / static framework deployed. robots.txt and sitemap.xml in place.</p>
    </li>
    <li>
        <p class="j-timeline-date">2026 · Q2</p>
        <h3>ISSN application submitted</h3>
        <p>Submitted via the U.S. ISSN Center (Library of Congress). eISSN expected within 2–4 weeks of application.</p>
    </li>
    <li>
        <p class="j-timeline-date">2026 · Q3</p>
        <h3>Pilot issue (Volume 1, Issue 1) — in preparation</h3>
        <p>First call for submissions. Reviewer onboarding. Pilot manuscripts in review.</p>
    </li>
    <li>
        <p class="j-timeline-date">2026 · Q3</p>
        <h3>Crossref membership</h3>
        <p>DOI assignment infrastructure live. Every published article assigned a Crossref-registered DOI resolving to its HTML landing page.</p>
    </li>
    <li>
        <p class="j-timeline-date">2026 · Q4 — planned</p>
        <h3>Volume 1, Issue 1 publishes</h3>
        <p>First open-access articles. Citation metadata, declarations, references, and PDF on every article.</p>
    </li>
    <li>
        <p class="j-timeline-date">2027 · planned</p>
        <h3>DOAJ application</h3>
        <p>Submitted once Synthica has 12 months of publishing history and a minimum of 10 published research articles.</p>
    </li>
    <li>
        <p class="j-timeline-date">2027 · planned</p>
        <h3>PKP Preservation Network enrollment</h3>
        <p>Long-term archival ingest into PKP PN (or Portico, depending on platform).</p>
    </li>
</ol>`,
})}

${ctaBlock}
`,
});

// ============================== AIMS & SCOPE ==============================

pages.push({
  slug: "journal-aims-and-scope",
  title: "Aims & Scope",
  description:
    "Synthica publishes original research, reviews, methods, perspectives, commentaries, data reports, and case studies across the full STEM spectrum, authored by student researchers.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "Aims & Scope" }])}
${pageHero({
  eyebrow: "Aims & Scope",
  h1: "What Synthica publishes.",
  lede:
    "Synthica publishes peer-reviewed STEM research from student researchers worldwide. We welcome interdisciplinary and cross-disciplinary work, and we accept multiple article types — provided each meets our editorial, ethics, and reproducibility standards.",
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Aims</h2></header>
<ul class="j-bullets">
    <li>Provide a credible, citable, open-access publication venue for STEM research authored by students.</li>
    <li>Apply professional editorial standards — double-blind peer review, transparent declarations, reproducibility requirements.</li>
    <li>Make student research discoverable via Google Scholar, DOI, and (post-eligibility) DOAJ.</li>
    <li>Remove the cost barrier that excludes most students from existing open-access venues — no APCs, no submission fees.</li>
</ul>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd"><h2 class="j-h2">Disciplines covered</h2>
<p>Synthica accepts submissions in any of the following discipline areas, plus interdisciplinary work that spans them.</p></header>
<ul class="j-scope">
    <li>Astronomy &amp; Astrophysics</li>
    <li>Biology — Cellular &amp; Molecular</li>
    <li>Biology — Ecology &amp; Environmental</li>
    <li>Biology — Genetics &amp; Genomics</li>
    <li>Biomedical Engineering</li>
    <li>Chemistry — Inorganic</li>
    <li>Chemistry — Organic</li>
    <li>Chemistry — Physical</li>
    <li>Computer Science — Algorithms</li>
    <li>Computer Science — Machine Learning &amp; AI</li>
    <li>Computer Science — Systems &amp; Networks</li>
    <li>Earth &amp; Atmospheric Sciences</li>
    <li>Electrical Engineering</li>
    <li>Environmental Science &amp; Sustainability</li>
    <li>Mathematics — Applied</li>
    <li>Mathematics — Pure</li>
    <li>Mechanical Engineering</li>
    <li>Neuroscience &amp; Cognitive Science</li>
    <li>Physics — Classical Mechanics</li>
    <li>Physics — Quantum Mechanics</li>
    <li>Physics — Optics &amp; Photonics</li>
    <li>Public Health &amp; Epidemiology</li>
    <li>Social Science with STEM component</li>
</ul>`,
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Article types accepted</h2></header>
<ul class="j-types j-types-detail">
    <li><strong>Original Research</strong><span>Primary research reporting new experimental or computational findings. IMRaD structure required. Two peer reviewers minimum.</span></li>
    <li><strong>Review Article</strong><span>Systematic or narrative review of existing literature. Structured abstract required. Two peer reviewers minimum.</span></li>
    <li><strong>Methods Paper</strong><span>Describes a new method, protocol, or analytical technique. Validation data required.</span></li>
    <li><strong>Perspective</strong><span>Author's informed viewpoint on a scientific topic or emerging research area. Shorter format. Editorial review plus one peer reviewer.</span></li>
    <li><strong>Commentary</strong><span>Response to or commentary on a recently published article. Must cite the article being discussed. Editorial review.</span></li>
    <li><strong>Data Report</strong><span>Describes a dataset — methodology, structure, quality controls. Data availability statement required.</span></li>
    <li><strong>Case Study</strong><span>Detailed analysis of a specific case, experiment, or project — with scientific framing, not personal narrative.</span></li>
</ul>
<p class="j-sec-foot"><a href="journal-for-authors-article-types.html" class="j-text-link">Full article-type specifications →</a></p>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Out of scope</h2></header>
<ul class="j-bullets">
    <li>Work already published elsewhere in substantially similar form.</li>
    <li>Work simultaneously under review at another venue.</li>
    <li>Manuscripts produced primarily by AI generation (LLM output reframed as research).</li>
    <li>Human-subjects research without prior ethics approval documentation.</li>
    <li>Opinion pieces without scholarly framing or supporting evidence.</li>
</ul>`,
})}

${ctaBlock}
`,
});

// ============================== POLICIES HUB ==============================

pages.push({
  slug: "journal-policies",
  title: "Editorial Policies",
  description:
    "All Synthica editorial policies — peer review, ethics, open access, authorship, AI disclosure, data availability, corrections, conflicts of interest, and human subjects research.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "Policies" }])}
${pageHero({
  eyebrow: "Editorial Policies",
  h1: "Policies built for trust.",
  lede:
    "Synthica's editorial policies are aligned with IEEE publication ethics, COPE guidelines, and Society for Science safeguards. Each policy below is a standalone, full-text document. Last reviewed " + TODAY + ".",
})}

${section({
  inner: `
<ul class="j-policies j-policies-grid">
    <li>
        <h3>Peer Review</h3>
        <p>Double-blind, two reviewers minimum, conflict recusal, written rationale for every decision, four-week target turnaround, and a transparent appeals process.</p>
        <a href="journal-policies-peer-review.html" class="j-policy-link">Read policy →</a>
    </li>
    <li>
        <h3>Open Access &amp; Licensing</h3>
        <p>Immediate open access under CC BY 4.0. No article processing charges. Authors retain copyright. No embargo.</p>
        <a href="journal-policies-open-access.html" class="j-policy-link">Read policy →</a>
    </li>
    <li>
        <h3>Publication Ethics</h3>
        <p>No plagiarism, fabrication, falsification, or simultaneous submission. Originality is the floor; integrity is the standard.</p>
        <a href="journal-policies-ethics.html" class="j-policy-link">Read policy →</a>
    </li>
    <li>
        <h3>Authorship &amp; CRediT</h3>
        <p>All authors must meet the four ICMJE criteria. CRediT taxonomy documents individual contributions transparently on every article.</p>
        <a href="journal-policies-authorship.html" class="j-policy-link">Read policy →</a>
    </li>
    <li>
        <h3>AI Disclosure</h3>
        <p>AI tools cannot be authors. Substantive AI-generated content must be disclosed per IEEE policy. Reviewers may not use AI to analyze confidential manuscripts.</p>
        <a href="journal-policies-ai-disclosure.html" class="j-policy-link">Read policy →</a>
    </li>
    <li>
        <h3>Data Availability &amp; Sharing</h3>
        <p>Every article carries a Data Availability Statement. Data should be deposited in a trusted repository where possible.</p>
        <a href="journal-policies-data-sharing.html" class="j-policy-link">Read policy →</a>
    </li>
    <li>
        <h3>Corrections &amp; Retractions</h3>
        <p>Factual errors corrected via published Erratum. Research misconduct triggers retraction with a permanent visible notice. No silent edits.</p>
        <a href="journal-policies-corrections.html" class="j-policy-link">Read policy →</a>
    </li>
    <li>
        <h3>Conflicts of Interest</h3>
        <p>Authors, editors, and reviewers must declare financial, institutional, and personal conflicts. Recusal is mandatory where conflict exists.</p>
        <a href="journal-policies-conflicts-of-interest.html" class="j-policy-link">Read policy →</a>
    </li>
    <li>
        <h3>Human Subjects Research</h3>
        <p>Any project involving human participants requires prior ethics approval. No exceptions. Modeled on Society for Science ISEF 2026 rules.</p>
        <a href="journal-policies-human-subjects.html" class="j-policy-link">Read policy →</a>
    </li>
</ul>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Reporting a concern</h2>
<p>If you believe a Synthica article contains an error, an undisclosed conflict, an ethics violation, or fabricated data, please email <a href="mailto:editorial@synthicajournal.org?subject=Ethics%20Concern">editorial@synthicajournal.org</a>. All concerns are reviewed by the Editorial Chair with Faculty Advisor oversight. Reporters' identities are kept confidential unless legally required to disclose.</p></header>`,
})}

${ctaBlock}
`,
});

// ============================== POLICY: PEER REVIEW ==============================

pages.push({
  slug: "journal-policies-peer-review",
  title: "Peer Review Policy",
  description:
    "Synthica's peer review policy in full — double-blind review, two reviewers minimum, reviewer recruitment and recusal, decision categories, timelines, and the appeals process.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "Policies", href: "journal-policies.html" },
  { label: "Peer Review" },
])}
${pageHero({
  eyebrow: "Policy",
  h1: "Peer Review Policy",
  lede:
    "How Synthica reviews every manuscript: who reviews it, how reviewers are chosen, what decisions are possible, how authors appeal, and what we consider out of scope for peer review.",
})}

${section({
  inner: `
${policyMeta({ effective: TODAY, version: "1.0" })}

<h2 class="j-h2">1. Type of review</h2>
<p>Synthica operates <strong>double-blind</strong> peer review. Reviewer identities are concealed from authors, and author identities are concealed from reviewers. Manuscripts submitted for review are anonymized by the Editorial Chair before assignment: author names, affiliations, acknowledgments, and any identifying language are removed or coded.</p>
<p>Reviewers must not attempt to identify the authors of a manuscript. Authors must not attempt to identify reviewers.</p>

<h2 class="j-h2">2. Number of reviewers</h2>
<p>Every Original Research, Review Article, Methods Paper, Data Report, and Case Study is assigned to a minimum of <strong>two independent reviewers</strong>. Perspectives and Commentaries are assigned to one peer reviewer plus an editorial review. Editorials, announcements, and corrections are editorially reviewed only.</p>

<h2 class="j-h2">3. Reviewer selection criteria</h2>
<ul class="j-bullets">
    <li>Demonstrated subject expertise in the manuscript's discipline area.</li>
    <li>No conflicts of interest with the manuscript or its authors (see <a href="journal-policies-conflicts-of-interest.html">Conflicts of Interest</a>).</li>
    <li>Independent from the authors' institution.</li>
    <li>Willing and able to deliver a written report within the four-week target.</li>
    <li>Has agreed to the reviewer code of conduct (confidentiality, no AI use, timely turnaround).</li>
</ul>

<h2 class="j-h2">4. Reviewer recusal</h2>
<p>Reviewers must recuse themselves if any conflict of interest exists — financial, institutional, advisory, personal, or competitive. If a conflict surfaces partway through review, the reviewer must immediately notify the Editorial Chair, who reassigns. Failure to disclose a known conflict is grounds for removal from the reviewer network.</p>

<h2 class="j-h2">5. Confidentiality</h2>
<p>Unpublished manuscripts are confidential. Reviewers may not share, cite, distribute, or use manuscript content for any purpose other than the review. Manuscripts may not be uploaded to AI tools, third-party services, or shared with colleagues without explicit written permission from the Editorial Chair. See <a href="journal-policies-ai-disclosure.html">AI Disclosure</a>.</p>

<h2 class="j-h2">6. Review timeline</h2>
<ul class="j-bullets">
    <li>Reviewer invitation: typically within 5 business days of desk-review pass.</li>
    <li>Reviewer agreement deadline: 3 business days from invitation.</li>
    <li>Review turnaround target: <strong>4 weeks</strong> from reviewer agreement.</li>
    <li>Editorial decision: within 1 week of receiving all reports.</li>
    <li>Revision return: up to 6 weeks for major revision, 4 weeks for minor revision (extensions on request).</li>
</ul>

<h2 class="j-h2">7. Possible decisions</h2>
<ul class="j-bullets">
    <li><strong>Accept.</strong> Manuscript is publication-ready. May include minor copy-editing.</li>
    <li><strong>Minor Revision.</strong> Acceptance in principle; address reviewer comments and editorial requests. No second round of full peer review required unless changes are substantive.</li>
    <li><strong>Major Revision.</strong> Substantive changes required. Revised manuscript returns to at least one of the original reviewers for a second round.</li>
    <li><strong>Reject.</strong> Manuscript does not meet Synthica's scope, methodology, originality, or ethics standards. Decision letter includes specific reasons.</li>
</ul>
<p>Every decision is accompanied by a written editorial rationale and the full (anonymized) reviewer reports.</p>

<h2 class="j-h2">8. Appeals</h2>
<p>Authors may appeal a rejection in writing to the Editorial Chair within <strong>30 days</strong> of the decision letter. Appeals must (a) identify a specific factual or methodological error in the editorial rationale, or (b) provide new information not available at the time of review. Appeals that simply restate the original argument are not considered. The Editorial Chair routes appeals to the Faculty Advisor for independent review. Appeal decisions are final.</p>

<h2 class="j-h2">9. What is editorially reviewed (not peer-reviewed)</h2>
<ul class="j-bullets">
    <li>Editorials by the Editorial Chair or Faculty Advisor.</li>
    <li>Announcements and corrections.</li>
    <li>Letters to the editor under 500 words.</li>
</ul>

<h2 class="j-h2">10. Transparent peer review (optional)</h2>
<p>Authors and reviewers may opt in to publish reviewer reports and editorial correspondence alongside the article. If opted in, reviewer identities remain concealed unless the reviewer separately consents to disclosure. This follows the Nature Portfolio transparent peer review model.</p>
`,
})}
${ctaBlock}
`,
});

// ============================== POLICY: ETHICS ==============================

pages.push({
  slug: "journal-policies-ethics",
  title: "Publication Ethics",
  description:
    "Synthica's publication ethics policy — originality, simultaneous submission, plagiarism, fabrication, authorship, human and animal subjects, hazardous materials, and misconduct response.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "Policies", href: "journal-policies.html" },
  { label: "Publication Ethics" },
])}
${pageHero({
  eyebrow: "Policy",
  h1: "Publication Ethics",
  lede:
    "What Synthica requires of every author and reviewer. Aligned with IEEE publication ethics, COPE guidelines, and Society for Science (ISEF 2026) safeguards.",
})}

${section({
  inner: `
${policyMeta({ effective: TODAY, version: "1.0" })}

<h2 class="j-h2">1. Originality</h2>
<p>Submitted work must not have been published elsewhere in substantially similar form. Posting on preprint servers (arXiv, bioRxiv, OSF) is permitted and must be disclosed at submission. Republication of substantially the same work is grounds for rejection or retraction.</p>

<h2 class="j-h2">2. Simultaneous submission</h2>
<p>You may not submit the same manuscript (or substantially the same manuscript) to Synthica and to another peer-reviewed venue concurrently. Submitting to Synthica is a representation that the work is not under review elsewhere.</p>

<h2 class="j-h2">3. Plagiarism</h2>
<p>Synthica defines plagiarism as the use of another person's ideas, words, data, or figures without proper attribution. This includes self-plagiarism (re-using your own previously published material without citation). All submissions are checked against published literature. Plagiarism is grounds for desk rejection, retraction post-publication, and notification of the author's institution.</p>

<h2 class="j-h2">4. Fabrication and falsification</h2>
<p>You may not invent data, alter data, selectively report only data that supports your conclusion, or manipulate figures to misrepresent results. Fabrication and falsification are research misconduct and trigger immediate retraction plus institutional notification.</p>

<h2 class="j-h2">5. Authorship integrity</h2>
<p>All listed authors must meet the four ICMJE authorship criteria (see <a href="journal-policies-authorship.html">Authorship Policy</a>). Gift authorship (adding someone who did not contribute) and ghost authorship (omitting someone who did contribute) are both prohibited.</p>

<h2 class="j-h2">6. Human subjects research</h2>
<p>Any research involving human participants — including surveys, interviews, observations, physical testing, identifiable data, or human interaction — requires prior ethics approval from a qualified adult supervisor and/or institutional review body before data collection begins. See the <a href="journal-policies-human-subjects.html">Human Subjects Research Policy</a> for the full requirement.</p>

<h2 class="j-h2">7. Vertebrate animal research</h2>
<p>Any research involving vertebrate animals requires prior approval from an IACUC or equivalent institutional review committee. Documentation must be available on request. Synthica does not publish research that violates animal welfare standards in the jurisdiction where the research was performed.</p>

<h2 class="j-h2">8. Potentially hazardous biological agents</h2>
<p>Research involving recombinant DNA, microorganisms above Biosafety Level 1, human or animal tissues, or other potentially hazardous biological agents requires documentation of institutional biosafety oversight.</p>

<h2 class="j-h2">9. Surveys and questionnaires</h2>
<p>Surveys and questionnaires involving human participants must document review by an appropriate body. Anonymous surveys of de-identified participants may qualify for exemption; this must be documented in the submission.</p>

<h2 class="j-h2">10. Disclosure of competing interests</h2>
<p>Authors must disclose financial relationships, employment, advisory roles, and personal relationships that could be perceived as influencing the work. See <a href="journal-policies-conflicts-of-interest.html">Conflicts of Interest</a>.</p>

<h2 class="j-h2">11. Image and data integrity</h2>
<ul class="j-bullets">
    <li>Figures must accurately represent the original data.</li>
    <li>Selective adjustment of a region of an image (cropping, brightness, contrast) must be applied to the whole image, not to specific features.</li>
    <li>Splicing of bands or lanes must be disclosed; visible discontinuities must be retained.</li>
    <li>Quantitative data underlying any figure must be available on request.</li>
</ul>

<h2 class="j-h2">12. Allegations of misconduct</h2>
<p>Allegations of misconduct (plagiarism, fabrication, falsification, authorship abuse, undisclosed conflicts) are investigated by the Editorial Chair with Faculty Advisor oversight. Investigations follow COPE flowcharts. Substantiated misconduct results in: rejection (pre-publication) or retraction (post-publication); a published retraction notice; notification of the author's institution; and a one-year submission ban.</p>

<h2 class="j-h2">13. Reviewer conduct</h2>
<p>Reviewers must maintain confidentiality, declare conflicts, decline to use manuscripts for any purpose outside the review, and may not use AI tools on confidential content. Breaches result in removal from the reviewer network.</p>
`,
})}
${ctaBlock}
`,
});

// ============================== POLICY: OPEN ACCESS ==============================

pages.push({
  slug: "journal-policies-open-access",
  title: "Open Access & Licensing",
  description:
    "Synthica is a diamond open-access journal. All content is published under CC BY 4.0 immediately upon publication. No article processing charges. No embargo. Authors retain copyright.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "Policies", href: "journal-policies.html" },
  { label: "Open Access" },
])}
${pageHero({
  eyebrow: "Policy",
  h1: "Open Access & Licensing",
  lede:
    "Synthica is a diamond open-access journal: free to publish, free to read, with authors retaining copyright. Every article is licensed under Creative Commons Attribution 4.0 International.",
})}

${section({
  inner: `
${policyMeta({ effective: TODAY, version: "1.0" })}

<h2 class="j-h2">1. Open access model</h2>
<p>Synthica operates a <strong>diamond open access</strong> model. There are no article processing charges (APCs) for authors, and no subscription, registration, or paywall barriers for readers. All content is freely accessible immediately upon publication.</p>

<h2 class="j-h2">2. License</h2>
<p>All articles are published under the <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">Creative Commons Attribution 4.0 International License (CC BY 4.0)</a>. Under this license, anyone may:</p>
<ul class="j-bullets">
    <li><strong>Share</strong> — copy and redistribute the material in any medium or format.</li>
    <li><strong>Adapt</strong> — remix, transform, and build upon the material for any purpose, even commercially.</li>
</ul>
<p>...provided they give appropriate credit, link to the license, and indicate if changes were made.</p>

<h2 class="j-h2">3. Copyright</h2>
<p>Authors retain copyright of their work. By submitting to Synthica, authors grant Synthica a non-exclusive license to publish the work under CC BY 4.0 and to preserve, distribute, and index the work in perpetuity. Authors are free to redistribute their own work, post it on preprint servers, deposit it in institutional repositories, and reuse it in subsequent work — without further permission from Synthica.</p>

<h2 class="j-h2">4. No embargo</h2>
<p>There is no embargo period. Articles are open access from the moment of publication. There is no "delayed open access" tier.</p>

<h2 class="j-h2">5. No article processing charges</h2>
<p>Synthica charges authors no submission fees, no peer-review fees, no acceptance fees, and no publication fees of any kind. Synthica is operated on a non-profit basis and is funded by independent contributions and operational grants where available.</p>

<h2 class="j-h2">6. Third-party content</h2>
<p>If an article incorporates third-party content (figures, tables, images, code, datasets), the authors are responsible for obtaining permission and, where applicable, ensuring the third-party content is compatible with CC BY 4.0. Third-party content reused under different licenses must be clearly identified in the figure caption or acknowledgments.</p>

<h2 class="j-h2">7. Preservation</h2>
<p>Synthica deposits published content in long-term preservation infrastructure (PKP Preservation Network or Portico depending on platform). Articles remain accessible even if Synthica ceases operations.</p>

<h2 class="j-h2">8. How to cite Synthica articles</h2>
<p>Cite Synthica articles using their DOI (which resolves to the canonical HTML landing page). The recommended citation format follows IEEE conventions; APA, MLA, Chicago, and BibTeX exports are provided on every article page.</p>
`,
})}
${ctaBlock}
`,
});

// ============================== POLICY: AUTHORSHIP ==============================

pages.push({
  slug: "journal-policies-authorship",
  title: "Authorship & CRediT",
  description:
    "Synthica's authorship policy follows the four ICMJE criteria. Author contributions are documented using the CRediT taxonomy on every article.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "Policies", href: "journal-policies.html" },
  { label: "Authorship" },
])}
${pageHero({
  eyebrow: "Policy",
  h1: "Authorship & CRediT",
  lede:
    "Who counts as an author, who does not, and how individual contributions are recorded. Synthica follows ICMJE authorship criteria and the NISO CRediT contributor-roles taxonomy.",
})}

${section({
  inner: `
${policyMeta({ effective: TODAY, version: "1.0" })}

<h2 class="j-h2">1. ICMJE authorship criteria</h2>
<p>To be listed as an author, an individual must meet <strong>all four</strong> of the following criteria:</p>
<ol class="j-ordered">
    <li>Substantial contributions to the conception or design of the work, or to the acquisition, analysis, or interpretation of data.</li>
    <li>Drafting the work or revising it critically for important intellectual content.</li>
    <li>Final approval of the version to be published.</li>
    <li>Agreement to be accountable for all aspects of the work, including ensuring that questions related to accuracy or integrity of any part of the work are appropriately investigated and resolved.</li>
</ol>
<p>Contributors who do not meet all four criteria should be acknowledged in the Acknowledgments section, not listed as authors.</p>

<h2 class="j-h2">2. Gift authorship and ghost authorship</h2>
<ul class="j-bullets">
    <li><strong>Gift authorship</strong> — listing someone who did not contribute (e.g., a senior researcher or mentor added out of courtesy) — is prohibited.</li>
    <li><strong>Ghost authorship</strong> — omitting someone who did contribute substantially — is prohibited.</li>
    <li>Both are grounds for rejection or retraction.</li>
</ul>

<h2 class="j-h2">3. Author order</h2>
<p>Authors decide their own order. Synthica recommends the convention of first author = primary contributor, last author = senior contributor / project supervisor, middle authors in order of contribution. The corresponding author handles all communication with Synthica and is responsible for ensuring all co-authors have approved the final manuscript and the authorship list.</p>

<h2 class="j-h2">4. Mentors and supervisors</h2>
<p>A mentor or adult supervisor may be listed as an author only if they meet all four ICMJE criteria. Supervising a student project alone does not constitute authorship; substantive intellectual contribution does. Many Synthica articles are single-author or have only student co-authors — this is welcomed.</p>

<h2 class="j-h2">5. Changes to authorship after submission</h2>
<p>Adding, removing, or reordering authors after submission requires written agreement from all authors involved and a written justification to the Editorial Chair. After acceptance, authorship changes are exceptional and require Faculty Advisor approval.</p>

<h2 class="j-h2">6. CRediT contributor roles</h2>
<p>Every article includes an Author Contributions section using the NISO CRediT taxonomy. Each role is listed with the initials of the contributing authors. The fourteen recognized roles are:</p>
<ul class="j-bullets j-bullets-credit">
    <li><strong>Conceptualization</strong> — Ideas; formulation or evolution of overarching research goals.</li>
    <li><strong>Data Curation</strong> — Annotation, cleaning, and maintenance of research data.</li>
    <li><strong>Formal Analysis</strong> — Statistical, mathematical, or computational analysis.</li>
    <li><strong>Funding Acquisition</strong> — Acquisition of financial support for the project.</li>
    <li><strong>Investigation</strong> — Conducting the research; performing experiments.</li>
    <li><strong>Methodology</strong> — Development or design of methodology; creation of models.</li>
    <li><strong>Project Administration</strong> — Management and coordination of the project.</li>
    <li><strong>Resources</strong> — Provision of study materials, reagents, samples, or instrumentation.</li>
    <li><strong>Software</strong> — Programming; designing computer programs; implementation.</li>
    <li><strong>Supervision</strong> — Oversight and leadership of research activity.</li>
    <li><strong>Validation</strong> — Verification of reproducibility of results.</li>
    <li><strong>Visualization</strong> — Preparation of figures, charts, and visual representations.</li>
    <li><strong>Writing – Original Draft</strong> — Preparation of the initial manuscript.</li>
    <li><strong>Writing – Review &amp; Editing</strong> — Critical review and revision of the draft.</li>
</ul>

<h2 class="j-h2">7. Corresponding author responsibilities</h2>
<ul class="j-bullets">
    <li>Confirms all co-authors meet the ICMJE criteria.</li>
    <li>Confirms all co-authors have approved the final version.</li>
    <li>Signs and submits the Author Declaration Form on behalf of the team.</li>
    <li>Handles all post-publication correspondence, corrections, and reader queries.</li>
</ul>
`,
})}
${ctaBlock}
`,
});

// ============================== POLICY: DATA SHARING ==============================

pages.push({
  slug: "journal-policies-data-sharing",
  title: "Data Availability & Sharing",
  description:
    "Synthica requires a Data Availability Statement on every article. Underlying data should be deposited in a trusted repository where possible.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "Policies", href: "journal-policies.html" },
  { label: "Data Sharing" },
])}
${pageHero({
  eyebrow: "Policy",
  h1: "Data Availability & Sharing",
  lede:
    "Open science requires open data where ethically possible. Synthica requires every article to declare where its underlying data can be accessed.",
})}

${section({
  inner: `
${policyMeta({ effective: TODAY, version: "1.0" })}

<h2 class="j-h2">1. Mandatory Data Availability Statement</h2>
<p>Every article must include a Data Availability Statement in the Declarations section. The statement should specify where the data underlying the findings can be accessed, in which format, and under what conditions.</p>

<h2 class="j-h2">2. Acceptable statement formats</h2>
<ul class="j-bullets">
    <li>"All data generated or analyzed during this study are included in this article and its supplementary materials."</li>
    <li>"The datasets generated and analyzed during this study are available in the [name] repository, [persistent URL or DOI]."</li>
    <li>"The datasets generated during this study are available from the corresponding author on reasonable request."</li>
    <li>"The data that support the findings of this study are available from [third party] but restrictions apply to the availability of these data, which were used under license for the current study, and so are not publicly available."</li>
    <li>"No new data were created or analyzed in this study. Data sharing is not applicable."</li>
</ul>

<h2 class="j-h2">3. Recommended repositories</h2>
<p>Where possible, deposit data in a trusted disciplinary or general-purpose repository. Examples:</p>
<ul class="j-bullets">
    <li>Zenodo — general-purpose, free, assigns DOI</li>
    <li>Open Science Framework (OSF) — general-purpose with versioning</li>
    <li>figshare — general-purpose</li>
    <li>Dryad — for data underlying publications</li>
    <li>GitHub / GitLab — for code and computational notebooks</li>
    <li>NCBI GenBank, GEO, SRA — for genomics and sequence data</li>
    <li>PDB — for protein structures</li>
    <li>ICPSR — for social-science data</li>
</ul>

<h2 class="j-h2">4. Code availability</h2>
<p>If the article reports computational analysis, the code used to produce the results should be made available in a public repository (GitHub, GitLab, or equivalent) and cited. Synthica recommends a permanent archive snapshot via Zenodo, which assigns a DOI to a GitHub release.</p>

<h2 class="j-h2">5. Personally identifiable and sensitive data</h2>
<p>Data containing personally identifiable information may not be publicly deposited. In such cases, authors should state that data are available from the corresponding author subject to ethics review, and outline the conditions under which access will be granted. De-identified versions of the dataset are preferred where feasible.</p>

<h2 class="j-h2">6. Materials and reagents</h2>
<p>Authors should make unique materials (cell lines, plasmids, reagents) available to qualified researchers on reasonable request, subject to standard MTAs and applicable regulations.</p>

<h2 class="j-h2">7. Failure to share</h2>
<p>Refusal to make underlying data available without legitimate ethical, legal, or proprietary reason may result in a published Expression of Concern, and in extreme cases retraction.</p>
`,
})}
${ctaBlock}
`,
});

// ============================== POLICY: AI DISCLOSURE ==============================

pages.push({
  slug: "journal-policies-ai-disclosure",
  title: "AI Use & Disclosure Policy",
  description:
    "Synthica's AI policy follows IEEE: AI tools cannot be authors, substantive AI content must be disclosed, and reviewers may not use AI on confidential manuscripts.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "Policies", href: "journal-policies.html" },
  { label: "AI Disclosure" },
])}
${pageHero({
  eyebrow: "Policy",
  h1: "AI Use & Disclosure Policy",
  lede:
    "Generative AI tools have changed how research is written. This policy says what's allowed, what must be disclosed, and what is forbidden — for authors and reviewers alike.",
})}

${section({
  inner: `
${policyMeta({ effective: TODAY, version: "1.0" })}

<h2 class="j-h2">1. AI tools cannot be authors</h2>
<p>Generative AI tools — including but not limited to large language models (ChatGPT, Claude, Gemini, Llama), image generators (DALL·E, Midjourney, Stable Diffusion), code generators (Copilot, Cursor), and other autonomous systems — <strong>cannot</strong> be listed as authors. They do not meet the ICMJE authorship criteria: they cannot agree to be accountable for the work, cannot approve a final version, and cannot respond to post-publication queries.</p>

<h2 class="j-h2">2. Authors remain fully responsible</h2>
<p>All authors are fully responsible for factual accuracy, citation accuracy, originality, ethics, and integrity of the manuscript — regardless of whether AI tools were used in its preparation. "The AI said it" is not a defense to fabrication, plagiarism, or factual error.</p>

<h2 class="j-h2">3. Substantive AI use must be disclosed</h2>
<p>If a generative AI tool was used to produce substantive content in the manuscript — including but not limited to text, figures, code, data, or analysis — the use must be disclosed in the Declarations section. The disclosure must identify:</p>
<ul class="j-bullets">
    <li>The specific tool used (name and version, e.g., "GPT-4, OpenAI, March 2024 release").</li>
    <li>The section(s) of the manuscript where AI-generated content appears.</li>
    <li>What the AI tool was used for (e.g., literature search, summary, draft text, code, figure generation).</li>
    <li>How the AI output was verified by the authors.</li>
</ul>

<h2 class="j-h2">4. What does NOT require disclosure</h2>
<ul class="j-bullets">
    <li>Grammar and spell-check tools (Grammarly, MS Word built-in checks).</li>
    <li>Translation tools used to render the authors' own draft into English.</li>
    <li>Standard reference-management software (Zotero, Mendeley).</li>
    <li>Standard statistical software (R, Python, SPSS, JASP).</li>
    <li>Search engines used during literature review.</li>
</ul>

<h2 class="j-h2">5. What is forbidden</h2>
<ul class="j-bullets">
    <li>Submitting a manuscript that is substantially AI-generated and reframed as student research.</li>
    <li>Fabricating citations or quotes using AI (a common LLM failure mode).</li>
    <li>Using AI-generated images of data, gels, microscopy, or any other scientific imagery.</li>
    <li>Using AI to generate "data" that did not come from actual experiment, observation, or simulation.</li>
</ul>

<h2 class="j-h2">6. Reviewer use of AI is prohibited</h2>
<p>Reviewers may <strong>not</strong> use AI tools to analyze, summarize, or respond to confidential manuscript content. Uploading a confidential manuscript to a third-party AI tool is a breach of confidentiality and grounds for removal from the reviewer network. Reviewers may use AI tools for general background reading (publicly available material) but never for the manuscript itself.</p>

<h2 class="j-h2">7. Editorial AI use</h2>
<p>The Editorial Chair and Associate Editors may use AI tools for non-confidential tasks (e.g., drafting newsletter copy, generating non-confidential summaries of public articles). AI may not be used on confidential manuscript content. Decisions are always made by human editors, not by AI.</p>

<h2 class="j-h2">8. Example disclosure</h2>
<p class="j-policy-example">"During the preparation of this work the authors used ChatGPT (GPT-4o, OpenAI, accessed February 2026) for assistance with grammar revision of the Introduction and Discussion sections. After using this tool, the authors reviewed and edited the content as needed and take full responsibility for the content of the publication."</p>
`,
})}
${ctaBlock}
`,
});

// ============================== POLICY: CORRECTIONS ==============================

pages.push({
  slug: "journal-policies-corrections",
  title: "Corrections & Retractions",
  description:
    "How Synthica handles post-publication errors. Errata for factual errors, Expressions of Concern for unresolved questions, and Retractions for misconduct or fundamental error.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "Policies", href: "journal-policies.html" },
  { label: "Corrections & Retractions" },
])}
${pageHero({
  eyebrow: "Policy",
  h1: "Corrections & Retractions",
  lede:
    "What happens when something is wrong after publication. Synthica follows COPE retraction guidelines and never silently edits the published record.",
})}

${section({
  inner: `
${policyMeta({ effective: TODAY, version: "1.0" })}

<h2 class="j-h2">1. The published record is permanent</h2>
<p>Once an article is published with a DOI, it becomes part of the scholarly record. Synthica does not silently edit articles after publication. Any change is documented through one of the three mechanisms below.</p>

<h2 class="j-h2">2. Erratum (Correction)</h2>
<p>An Erratum is published when a factual error materially affects the interpretation or reproducibility of the article — e.g., a misspelled author name, a misnumbered figure, an incorrect equation, a missing acknowledgment. The Erratum:</p>
<ul class="j-bullets">
    <li>Is published as a separate citable record with its own DOI.</li>
    <li>Is linked from the original article (and the original article links back to it).</li>
    <li>Names what was wrong, what is correct, and who identified the error.</li>
    <li>Does not change the original article's PDF; the original remains accessible alongside the Erratum.</li>
</ul>

<h2 class="j-h2">3. Expression of Concern</h2>
<p>An Expression of Concern is published when there is credible evidence that an article may have a serious problem (e.g., possible data integrity issue, ethics concern, undisclosed conflict) but an investigation has not been concluded. The Expression of Concern:</p>
<ul class="j-bullets">
    <li>Notifies readers of the concern.</li>
    <li>Is linked from the original article.</li>
    <li>Is resolved by a subsequent Erratum, Retraction, or formal exoneration when the investigation concludes.</li>
</ul>

<h2 class="j-h2">4. Retraction</h2>
<p>Retraction is reserved for cases where the findings are fundamentally compromised. Reasons include:</p>
<ul class="j-bullets">
    <li>Research misconduct (fabrication, falsification, plagiarism).</li>
    <li>Major methodological errors that invalidate the conclusions.</li>
    <li>Duplicate publication.</li>
    <li>Authorship abuse (gift, ghost, or coerced authorship).</li>
    <li>Unethical research (failure to obtain required ethics approval).</li>
</ul>
<p>A retracted article:</p>
<ul class="j-bullets">
    <li>Is clearly watermarked "RETRACTED" on every page of the PDF and HTML version.</li>
    <li>Has a Retraction Notice published as a separate citable record with its own DOI.</li>
    <li>Remains accessible (not removed), so the scholarly record stays intact.</li>
    <li>Triggers notification of the author's institution and any indexers (Google Scholar, Crossref, DOAJ).</li>
</ul>

<h2 class="j-h2">5. Withdrawal</h2>
<p>"Withdrawal" applies only to in-press articles (after acceptance but before publication). After publication, the article cannot be withdrawn — only corrected, flagged, or retracted.</p>

<h2 class="j-h2">6. Reader-initiated corrections</h2>
<p>Readers who identify a possible error should email <a href="mailto:editorial@synthicajournal.org?subject=Correction%20Request">editorial@synthicajournal.org</a> with the article DOI and a specific description. The Editorial Chair acknowledges within 5 business days and contacts the authors. The decision to publish an Erratum, Expression of Concern, or Retraction is made by the Editorial Chair with Faculty Advisor oversight, following COPE flowcharts.</p>

<h2 class="j-h2">7. Author-initiated corrections</h2>
<p>Authors who discover errors in their own published work should email <a href="mailto:editorial@synthicajournal.org?subject=Author-Initiated%20Correction">editorial@synthicajournal.org</a> promptly. Self-reported corrections are handled with the same care and visibility as reader-reported corrections.</p>

<h2 class="j-h2">8. Appeals</h2>
<p>An author may appeal a Retraction or Expression of Concern to the Faculty Advisor within 30 days. Appeals must address the specific evidence cited in the Retraction Notice.</p>
`,
})}
${ctaBlock}
`,
});

// ============================== POLICY: COI ==============================

pages.push({
  slug: "journal-policies-conflicts-of-interest",
  title: "Conflicts of Interest",
  description:
    "Authors, editors, and reviewers must declare financial, institutional, and personal conflicts. Recusal is mandatory where a conflict exists.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "Policies", href: "journal-policies.html" },
  { label: "Conflicts of Interest" },
])}
${pageHero({
  eyebrow: "Policy",
  h1: "Conflicts of Interest",
  lede:
    "What counts as a conflict of interest, who must declare one, and when recusal is mandatory.",
})}

${section({
  inner: `
${policyMeta({ effective: TODAY, version: "1.0" })}

<h2 class="j-h2">1. Definition</h2>
<p>A conflict of interest exists when a financial, professional, personal, or institutional relationship could be reasonably perceived as influencing the objectivity of an author, editor, or reviewer. Conflicts must be <strong>declared</strong> — the existence of a conflict is not itself a violation; failing to disclose one is.</p>

<h2 class="j-h2">2. Conflicts authors must declare</h2>
<ul class="j-bullets">
    <li>Funding sources for the work (grants, fellowships, sponsorships).</li>
    <li>Employment or consulting relationships with entities that could benefit from the findings.</li>
    <li>Stock ownership, patents, or licensing income related to the work.</li>
    <li>Personal relationships with editors or potential reviewers.</li>
    <li>Membership of advisory boards or organizations with a stake in the outcome.</li>
    <li>Use of proprietary or company-provided datasets, materials, or facilities.</li>
</ul>
<p>If no conflicts exist, the article must explicitly state: "The authors declare no conflict of interest."</p>

<h2 class="j-h2">3. Editor conflicts</h2>
<p>Editors must recuse from handling a manuscript if:</p>
<ul class="j-bullets">
    <li>They are a co-author of the manuscript.</li>
    <li>They share an institutional affiliation with the authors.</li>
    <li>They have collaborated with the authors in the past three years.</li>
    <li>They have a personal or familial relationship with the authors.</li>
    <li>They have a competing project that could be affected by the manuscript's publication.</li>
</ul>
<p>The Editorial Chair reassigns recused submissions. If the conflict involves the Editorial Chair, the Faculty Advisor reassigns.</p>

<h2 class="j-h2">4. Reviewer conflicts</h2>
<p>Reviewers must recuse if any of the criteria above apply, or if they cannot provide an objective review for any other reason. Reviewers who discover a conflict partway through review must immediately notify the Editorial Chair.</p>

<h2 class="j-h2">5. Funder influence</h2>
<p>Synthica does not accept editorial direction from funders. Authors may not be required to omit findings, change conclusions, or delay publication by any funding source.</p>

<h2 class="j-h2">6. Failure to disclose</h2>
<p>Undisclosed conflicts discovered post-publication are grounds for an Expression of Concern, and in severe cases Retraction. Reviewers who fail to disclose known conflicts are removed from the reviewer network.</p>
`,
})}
${ctaBlock}
`,
});

// ============================== POLICY: HUMAN SUBJECTS ==============================

pages.push({
  slug: "journal-policies-human-subjects",
  title: "Human Subjects Research",
  description:
    "Synthica requires prior ethics approval for any research involving human participants, modeled on Society for Science ISEF 2026 rules.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "Policies", href: "journal-policies.html" },
  { label: "Human Subjects Research" },
])}
${pageHero({
  eyebrow: "Policy",
  h1: "Human Subjects Research",
  lede:
    "Synthica's standards for research involving human participants. Modeled on Society for Science ISEF 2026 rules and ICMJE / Helsinki Declaration principles.",
})}

${section({
  inner: `
${policyMeta({ effective: TODAY, version: "1.0" })}

<h2 class="j-h2">1. Scope</h2>
<p>This policy applies to any project in which living human participants are the subject of research, including:</p>
<ul class="j-bullets">
    <li>Surveys, questionnaires, interviews, and focus groups.</li>
    <li>Observational studies of identifiable individuals.</li>
    <li>Physical, physiological, or behavioral testing.</li>
    <li>Studies using identifiable personal data (medical records, genetic data, location data).</li>
    <li>Studies involving human interaction (intervention, education, psychological tasks).</li>
</ul>
<p>Anonymous analysis of publicly available, fully de-identified data is exempt — but exemption status must be documented.</p>

<h2 class="j-h2">2. Mandatory prior ethics approval</h2>
<p>Any project within scope must obtain prior ethics approval <strong>before data collection begins</strong>. Approval can come from:</p>
<ul class="j-bullets">
    <li>An Institutional Review Board (IRB) at a university or research institution.</li>
    <li>An Institutional Review Committee (IRC) at a school or program (e.g., per ISEF rules).</li>
    <li>A qualified Designated Supervisor / Scientific Review Committee, where formal IRB review is unavailable.</li>
    <li>An ethics committee in the jurisdiction where the research is performed.</li>
</ul>
<p>Documentation of approval (date, body, scope) must be uploaded with the manuscript. Manuscripts in this category will <strong>not</strong> be sent to peer review until ethics documentation is on file.</p>

<h2 class="j-h2">3. Informed consent</h2>
<p>Participants must provide informed consent before any data collection. Consent must include:</p>
<ul class="j-bullets">
    <li>The purpose of the research.</li>
    <li>What participation involves.</li>
    <li>Known risks and benefits.</li>
    <li>The right to withdraw at any time without penalty.</li>
    <li>How personal data will be stored, used, and protected.</li>
</ul>
<p>Consent forms must be retained by the authors and available on request.</p>

<h2 class="j-h2">4. Research involving minors</h2>
<p>If participants are under the age of majority in their jurisdiction, written parental or guardian consent is required, in addition to participant assent where developmentally appropriate. This includes student authors enrolling fellow students as participants.</p>

<h2 class="j-h2">5. Vulnerable populations</h2>
<p>Research involving vulnerable populations (children, prisoners, individuals with cognitive impairment, marginalized communities) requires additional safeguards documented in the ethics approval.</p>

<h2 class="j-h2">6. Identifiable personal data</h2>
<ul class="j-bullets">
    <li>Personal data must be stored securely and minimized.</li>
    <li>Identifiers must be removed for analysis where possible.</li>
    <li>Public sharing of data containing personal identifiers is prohibited.</li>
    <li>Researchers in jurisdictions with privacy laws (GDPR, CCPA, etc.) must comply with those laws.</li>
</ul>

<h2 class="j-h2">7. Manuscript declarations</h2>
<p>Every article in scope must include in its Declarations section:</p>
<ul class="j-bullets">
    <li>The name of the ethics body that approved the study.</li>
    <li>The approval date and reference number.</li>
    <li>A statement that informed consent was obtained.</li>
    <li>How consent and approval documentation are stored.</li>
</ul>

<h2 class="j-h2">8. Studies not requiring approval</h2>
<p>If a study does not involve human subjects, the Declarations section must include: "This study did not involve human subjects or vertebrate animals, and therefore did not require ethics review."</p>

<h2 class="j-h2">9. Retroactive approval is not accepted</h2>
<p>Ethics approval obtained <em>after</em> data collection is not accepted. If a project began without approval, it cannot be retroactively legitimized; the data should not be published. This rule is non-negotiable and follows the principles of the Declaration of Helsinki.</p>
`,
})}
${ctaBlock}
`,
});

// ============================== FOR AUTHORS HUB ==============================

pages.push({
  slug: "journal-for-authors",
  title: "For Authors",
  description:
    "Everything an author needs to publish in Synthica: submission process, formatting guide, article types, the pre-submission checklist, and the author FAQ.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "For Authors" }])}
${pageHero({
  eyebrow: "For Authors",
  h1: "Publish your research in Synthica.",
  lede:
    "Synthica accepts original research, reviews, methods, perspectives, commentaries, data reports, and case studies. The pages below walk through every step — from formatting to submission to publication.",
})}

${section({
  inner: `
<ul class="j-policies j-policies-grid">
    <li><h3>Submission Guidelines</h3><p>The full ten-step submission process, end to end.</p><a href="journal-for-authors-submission-guidelines.html" class="j-policy-link">Open →</a></li>
    <li><h3>Formatting Guide</h3><p>IMRaD structure, length limits, figures, tables, equations, references.</p><a href="journal-for-authors-formatting-guide.html" class="j-policy-link">Open →</a></li>
    <li><h3>Article Types</h3><p>Original Research, Reviews, Methods, Perspectives, Commentaries, Data Reports, Case Studies.</p><a href="journal-for-authors-article-types.html" class="j-policy-link">Open →</a></li>
    <li><h3>Pre-Submission Checklist</h3><p>The printable checklist every corresponding author must complete.</p><a href="journal-for-authors-author-checklist.html" class="j-policy-link">Open →</a></li>
    <li><h3>Author FAQ</h3><p>Common questions about timing, fees, AI use, declarations, and revisions.</p><a href="journal-for-authors-faq.html" class="j-policy-link">Open →</a></li>
    <li><h3>Submit Manuscript</h3><p>Start a new submission once your materials are ready.</p><a href="journal-submit.html" class="j-policy-link">Open →</a></li>
</ul>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Snapshot of the workflow</h2></header>
<ol class="j-steps">
    <li><span class="j-step-num">01</span><h3>Pre-submission check</h3><p>Verify originality, ethics, formatting, and authorship criteria.</p></li>
    <li><span class="j-step-num">02</span><h3>Submit via portal</h3><p>Upload manuscript, figures, declaration form. Receive confirmation email.</p></li>
    <li><span class="j-step-num">03</span><h3>Desk review</h3><p>Editorial Chair reviews scope and completeness within five business days.</p></li>
    <li><span class="j-step-num">04</span><h3>Double-blind peer review</h3><p>Two independent reviewers, four-week target turnaround.</p></li>
    <li><span class="j-step-num">05</span><h3>Decision &amp; revision</h3><p>Accept, Minor, Major, or Reject — with full reviewer reports and editorial rationale.</p></li>
    <li><span class="j-step-num">06</span><h3>Publication</h3><p>Final copy-edit, author proof, DOI assignment, HTML + PDF go live under CC BY 4.0.</p></li>
</ol>`,
})}

${ctaBlock}
`,
});

// ============================== FOR AUTHORS: SUBMISSION GUIDELINES ==============================

pages.push({
  slug: "journal-for-authors-submission-guidelines",
  title: "Submission Guidelines",
  description:
    "Step-by-step instructions for submitting a manuscript to Synthica Journal — from account creation through final publication.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "For Authors", href: "journal-for-authors.html" },
  { label: "Submission Guidelines" },
])}
${pageHero({
  eyebrow: "For Authors",
  h1: "Submission Guidelines",
  lede:
    "The full ten-step process from preparing your manuscript to publication. Read this once before you start; check items off as you go.",
})}

${section({
  inner: `
<ol class="j-steps j-steps-detail">
    <li>
        <span class="j-step-num">01</span>
        <h3>Pre-submission check</h3>
        <p>Confirm originality, ethics compliance, formatting, and that every listed author meets the four ICMJE authorship criteria. Use the <a href="journal-for-authors-author-checklist.html">Pre-Submission Checklist</a>.</p>
    </li>
    <li>
        <span class="j-step-num">02</span>
        <h3>Create your account in the submission portal</h3>
        <p>Visit <a href="journal-submit.html">/submit</a> and follow the instructions. Use the corresponding author's institutional email. Add your ORCID iD if you have one.</p>
    </li>
    <li>
        <span class="j-step-num">03</span>
        <h3>Upload the manuscript</h3>
        <p>Upload the main manuscript file as <code>.docx</code> or <code>.pdf</code>. Upload each figure as a separate high-resolution file: PNG or TIFF, minimum 300 DPI. Tables may be embedded in the manuscript or uploaded separately.</p>
    </li>
    <li>
        <span class="j-step-num">04</span>
        <h3>Complete all metadata fields</h3>
        <p>Title, structured abstract (150–250 words), 3–8 semicolon-separated keywords, discipline, article type, author names + affiliations + ORCID iDs, funding sources.</p>
    </li>
    <li>
        <span class="j-step-num">05</span>
        <h3>Upload the Author Declaration Form</h3>
        <p>Download the form from the <a href="journal-for-authors-author-checklist.html">Pre-Submission Checklist</a> page. Fill in, sign, and upload as PDF.</p>
    </li>
    <li>
        <span class="j-step-num">06</span>
        <h3>Submit</h3>
        <p>Click Submit. You receive an automatic confirmation email with your manuscript reference number.</p>
    </li>
    <li>
        <span class="j-step-num">07</span>
        <h3>Desk review (5 business days)</h3>
        <p>The Editorial Chair reviews for scope, format, completeness, and ethics documentation. Three outcomes: send to peer review, return for revision before peer review, or desk reject.</p>
    </li>
    <li>
        <span class="j-step-num">08</span>
        <h3>Double-blind peer review (4 weeks target)</h3>
        <p>Two independent reviewers assess methodology, originality, clarity, and contribution. You will not see reviewer identities; reviewers will not see yours.</p>
    </li>
    <li>
        <span class="j-step-num">09</span>
        <h3>Decision letter</h3>
        <p>You receive a decision (Accept / Minor / Major / Reject) with full reviewer reports and the Editorial Chair's rationale. If revisions are requested, you submit a revised manuscript plus a point-by-point response letter.</p>
    </li>
    <li>
        <span class="j-step-num">10</span>
        <h3>Publication</h3>
        <p>After acceptance: copy-edit, author proof, DOI minting via Crossref, deposit into the issue. Article publishes as HTML landing page + downloadable PDF, both under CC BY 4.0.</p>
    </li>
</ol>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Required files at submission</h2></header>
<div class="j-table-wrap">
<table class="j-table">
    <thead><tr><th>File</th><th>Format</th><th>Required?</th></tr></thead>
    <tbody>
        <tr><td>Main manuscript (anonymized for review)</td><td>.docx or .pdf</td><td>Yes</td></tr>
        <tr><td>Title page (separate file with author names &amp; affiliations)</td><td>.docx or .pdf</td><td>Yes</td></tr>
        <tr><td>Each figure</td><td>PNG / TIFF · ≥300 DPI</td><td>Yes (if any)</td></tr>
        <tr><td>Author Declaration Form (signed)</td><td>.pdf</td><td>Yes</td></tr>
        <tr><td>Ethics approval documentation</td><td>.pdf</td><td>If human/animal subjects</td></tr>
        <tr><td>Supplementary materials (data, code, extended methods)</td><td>various</td><td>Optional</td></tr>
        <tr><td>Cover letter</td><td>.pdf</td><td>Optional but recommended</td></tr>
    </tbody>
</table>
</div>`,
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Anonymization for double-blind review</h2></header>
<ul class="j-bullets">
    <li>Remove author names, affiliations, and contact details from the main manuscript file.</li>
    <li>Refer to your own prior work in the third person ("As Smith et al. previously showed…") rather than first person ("In our previous work…").</li>
    <li>Remove acknowledgments that reveal identity (these will be re-added after acceptance).</li>
    <li>Strip identifying metadata from the file (Word: File → Info → Inspect Document → Remove personal data).</li>
    <li>Keep author names &amp; affiliations only on the separate title page file.</li>
</ul>`,
})}

${ctaBlock}
`,
});

// ============================== FOR AUTHORS: FORMATTING GUIDE ==============================

pages.push({
  slug: "journal-for-authors-formatting-guide",
  title: "Formatting Guide",
  description:
    "Synthica formatting requirements — IMRaD structure, abstract format, figures, tables, equations, references, and length limits.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "For Authors", href: "journal-for-authors.html" },
  { label: "Formatting Guide" },
])}
${pageHero({
  eyebrow: "For Authors",
  h1: "Formatting Guide",
  lede:
    "How to format your Synthica manuscript. Following this guide reduces desk-rejection risk and speeds up post-acceptance production.",
})}

${section({
  inner: `
<h2 class="j-h2">Manuscript structure (IMRaD)</h2>
<p>All Original Research articles must follow the IMRaD structure: <strong>I</strong>ntroduction, <strong>M</strong>ethods, <strong>R</strong>esults, <strong>a</strong>nd <strong>D</strong>iscussion. Review Articles, Methods Papers, Perspectives, and Commentaries follow modified structures — see <a href="journal-for-authors-article-types.html">Article Types</a>.</p>
<div class="j-table-wrap">
<table class="j-table">
    <thead><tr><th>Section</th><th>Required?</th><th>Notes</th></tr></thead>
    <tbody>
        <tr><td>Title</td><td>Must</td><td>Concise, informative, no abbreviations. Max 20 words.</td></tr>
        <tr><td>Authors &amp; Affiliations</td><td>Must</td><td>Full names; institution, city, state/country. Title-page file only.</td></tr>
        <tr><td>Abstract</td><td>Must</td><td>150–250 words. Structured: Background, Methods, Results, Conclusion.</td></tr>
        <tr><td>Keywords</td><td>Must</td><td>3–8 keywords, semicolon-separated.</td></tr>
        <tr><td>Introduction</td><td>Must</td><td>Background, research gap, hypothesis, paper structure.</td></tr>
        <tr><td>Methods</td><td>Must</td><td>Reproducible description; enough detail to replicate.</td></tr>
        <tr><td>Results</td><td>Must</td><td>Data without interpretation. Figures and tables here.</td></tr>
        <tr><td>Discussion</td><td>Must</td><td>Interpretation, comparison to literature, limitations.</td></tr>
        <tr><td>Conclusion</td><td>Should</td><td>Brief summary of findings and implications.</td></tr>
        <tr><td>Declarations</td><td>Must</td><td>Funding, COI, ethics, data, contributions, AI disclosure.</td></tr>
        <tr><td>Acknowledgments</td><td>May</td><td>Non-author contributors.</td></tr>
        <tr><td>References</td><td>Must</td><td>Numbered, IEEE style.</td></tr>
        <tr><td>Supplementary</td><td>May</td><td>Extra data, code, figures.</td></tr>
    </tbody>
</table>
</div>`,
})}

${section({
  alt: true,
  inner: `
<h2 class="j-h2">Length guidance</h2>
<div class="j-table-wrap">
<table class="j-table">
    <thead><tr><th>Article type</th><th>Word count (excl. references)</th><th>Figures/tables</th></tr></thead>
    <tbody>
        <tr><td>Original Research</td><td>3,000–8,000</td><td>up to 8 combined</td></tr>
        <tr><td>Review Article</td><td>4,000–10,000</td><td>up to 6 combined</td></tr>
        <tr><td>Methods Paper</td><td>2,500–6,000</td><td>up to 6 combined</td></tr>
        <tr><td>Perspective</td><td>1,500–3,000</td><td>up to 2 combined</td></tr>
        <tr><td>Commentary</td><td>800–2,000</td><td>up to 1</td></tr>
        <tr><td>Data Report</td><td>1,500–4,000</td><td>up to 4 combined</td></tr>
        <tr><td>Case Study</td><td>2,000–5,000</td><td>up to 4 combined</td></tr>
    </tbody>
</table>
</div>`,
})}

${section({
  inner: `
<h2 class="j-h2">Abstract</h2>
<p>Structured abstract required for Original Research, Reviews, Methods, Data Reports, and Case Studies. Four labeled sub-sections, 150–250 words total:</p>
<ul class="j-bullets">
    <li><strong>Background.</strong> Context and the specific question.</li>
    <li><strong>Methods.</strong> What you did, briefly.</li>
    <li><strong>Results.</strong> What you found, with specifics.</li>
    <li><strong>Conclusion.</strong> What it means.</li>
</ul>
<p>The abstract must be self-contained, free of citations and undefined abbreviations.</p>

<h2 class="j-h2">Keywords</h2>
<p>3–8 keywords, semicolon-separated. Use specific terms, not broad disciplines. Example: "CRISPR-Cas9; off-target effects; gene editing; HEK293 cells; deep sequencing".</p>

<h2 class="j-h2">Figures</h2>
<ul class="j-bullets">
    <li>Number sequentially: <strong>Figure 1</strong>, Figure 2, …</li>
    <li>Each figure has a descriptive caption below it.</li>
    <li>Upload each figure as a separate high-resolution file: PNG or TIFF, ≥300 DPI.</li>
    <li>Alt text required for every figure (will be applied to the published HTML).</li>
    <li>Color must not be the only way information is conveyed.</li>
    <li>Do not embed figures inside tables.</li>
</ul>

<h2 class="j-h2">Tables</h2>
<ul class="j-bullets">
    <li>Number sequentially: <strong>Table 1</strong>, Table 2, …</li>
    <li>Caption above the table.</li>
    <li>Use proper header rows (will become <code>&lt;th scope&gt;</code> in HTML).</li>
    <li>Do not insert images as tables.</li>
</ul>

<h2 class="j-h2">Equations</h2>
<p>Equations should be created with an equation editor (Word's built-in editor, LaTeX, MathType) — not inserted as images. They will be rendered via MathJax on the published page. Number equations sequentially in parentheses on the right margin: <code>(1)</code>, <code>(2)</code>, …</p>

<h2 class="j-h2">References — IEEE style</h2>
<p>Numbered, in order of first citation. In-text citations are bracketed numerals: <code>[1]</code>, or <code>[1]–[3]</code>, or <code>[1, 4, 7]</code>.</p>
<p>Format example:</p>
<p class="j-policy-example">[1] A. B. Author and C. D. Author, "Title of article," <em>Journal Name</em>, vol. 12, no. 3, pp. 45–67, Mar. 2024, doi: 10.1234/example.</p>
<ul class="j-bullets">
    <li>All cited sources must be real and verifiable.</li>
    <li>Do not cite sources you have not read.</li>
    <li>Preprints should be cited with a "Preprint" tag and DOI / arXiv ID.</li>
    <li>Datasets and code should be cited like references, with a DOI.</li>
</ul>
`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Declarations block (mandatory)</h2></header>
<p>Every article must include a Declarations section between Discussion and References containing all six items below, even if the answer is "none":</p>
<ul class="j-bullets">
    <li><strong>Funding</strong> — funder name and grant number, or "This research received no external funding."</li>
    <li><strong>Conflict of Interest</strong> — declared interests, or "The authors declare no conflict of interest."</li>
    <li><strong>Ethics Approval</strong> — body, date, reference number, or "This study did not involve human subjects or vertebrate animals and therefore did not require ethics review."</li>
    <li><strong>Data Availability</strong> — repository + DOI/URL, or "Data available upon reasonable request."</li>
    <li><strong>Author Contributions</strong> — CRediT taxonomy entries with initials.</li>
    <li><strong>AI Disclosure</strong> — tool, version, sections affected, or "No AI tools were used in the preparation of this manuscript."</li>
</ul>`,
})}

${ctaBlock}
`,
});

// ============================== FOR AUTHORS: AUTHOR CHECKLIST ==============================

pages.push({
  slug: "journal-for-authors-author-checklist",
  title: "Pre-Submission Checklist",
  description:
    "The printable pre-submission checklist every corresponding author must complete before submitting a manuscript to Synthica.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "For Authors", href: "journal-for-authors.html" },
  { label: "Pre-Submission Checklist" },
])}
${pageHero({
  eyebrow: "For Authors",
  h1: "Pre-Submission Checklist",
  lede:
    "Run through this checklist before you submit. Missing items are the most common cause of desk rejection.",
})}

${section({
  inner: `
<h2 class="j-h2">Originality &amp; integrity</h2>
<ul class="j-checklist-items">
    <li><input type="checkbox"> This manuscript is original and has not been published elsewhere in substantially similar form.</li>
    <li><input type="checkbox"> This manuscript is not under simultaneous review at another peer-reviewed venue.</li>
    <li><input type="checkbox"> All cited sources are real, verifiable, and have actually been read by the authors.</li>
    <li><input type="checkbox"> No fabricated, falsified, or selectively reported data.</li>
    <li><input type="checkbox"> All figures accurately represent the underlying data; no inappropriate manipulation.</li>
</ul>

<h2 class="j-h2">Authorship</h2>
<ul class="j-checklist-items">
    <li><input type="checkbox"> Every listed author meets all four ICMJE authorship criteria.</li>
    <li><input type="checkbox"> No gift authorship; no ghost authorship.</li>
    <li><input type="checkbox"> Author order has been agreed by all authors.</li>
    <li><input type="checkbox"> Each author has approved the final version.</li>
    <li><input type="checkbox"> CRediT contributions are documented for every author.</li>
</ul>

<h2 class="j-h2">Ethics</h2>
<ul class="j-checklist-items">
    <li><input type="checkbox"> If the study involves human participants: prior ethics approval was obtained <em>before</em> data collection began, and documentation is attached.</li>
    <li><input type="checkbox"> If the study involves vertebrate animals: IACUC or equivalent approval is documented.</li>
    <li><input type="checkbox"> If the study involves hazardous biological agents: institutional biosafety oversight is documented.</li>
    <li><input type="checkbox"> Informed consent obtained where required; parental/guardian consent obtained if participants are minors.</li>
</ul>

<h2 class="j-h2">Formatting</h2>
<ul class="j-checklist-items">
    <li><input type="checkbox"> Title under 20 words, no abbreviations.</li>
    <li><input type="checkbox"> Structured abstract, 150–250 words.</li>
    <li><input type="checkbox"> 3–8 keywords, semicolon-separated.</li>
    <li><input type="checkbox"> IMRaD structure (or article-type-appropriate structure).</li>
    <li><input type="checkbox"> Figures uploaded separately as PNG/TIFF ≥300 DPI with alt text.</li>
    <li><input type="checkbox"> Tables formatted with proper header rows.</li>
    <li><input type="checkbox"> Equations created with equation editor, not as images.</li>
    <li><input type="checkbox"> IEEE-style numbered references.</li>
</ul>

<h2 class="j-h2">Declarations</h2>
<ul class="j-checklist-items">
    <li><input type="checkbox"> Funding statement included.</li>
    <li><input type="checkbox"> Conflict of Interest statement included.</li>
    <li><input type="checkbox"> Ethics Approval statement included.</li>
    <li><input type="checkbox"> Data Availability Statement included.</li>
    <li><input type="checkbox"> Author Contributions (CRediT) included.</li>
    <li><input type="checkbox"> AI Disclosure statement included.</li>
</ul>

<h2 class="j-h2">Anonymization for double-blind review</h2>
<ul class="j-checklist-items">
    <li><input type="checkbox"> Author names and affiliations removed from the main manuscript file.</li>
    <li><input type="checkbox"> Self-citations rephrased in the third person.</li>
    <li><input type="checkbox"> Acknowledgments removed from the review version.</li>
    <li><input type="checkbox"> Document metadata stripped.</li>
    <li><input type="checkbox"> Separate title page file with full author details prepared.</li>
</ul>

<h2 class="j-h2">Final steps</h2>
<ul class="j-checklist-items">
    <li><input type="checkbox"> Signed Author Declaration Form ready to upload.</li>
    <li><input type="checkbox"> Faculty/mentor attestation (where applicable) signed.</li>
    <li><input type="checkbox"> Corresponding author has an account on the submission portal.</li>
</ul>
`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Author Declaration Form</h2>
<p>The signed Author Declaration Form is required at submission. It contains checkboxes and signature lines for: originality, authorship, contributions, conflict of interest, AI disclosure, ethics approval, and faculty/mentor attestation. The form is provided as a downloadable PDF in the submission portal; a print-friendly preview is available below.</p>
<p><a href="journal-submit.html" class="j-text-link">Go to submission portal →</a></p>
</header>`,
})}

${ctaBlock}
`,
});

// ============================== FOR AUTHORS: ARTICLE TYPES ==============================

pages.push({
  slug: "journal-for-authors-article-types",
  title: "Article Types",
  description:
    "Detailed specifications for each Synthica article type — Original Research, Review, Methods, Perspective, Commentary, Data Report, Case Study.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "For Authors", href: "journal-for-authors.html" },
  { label: "Article Types" },
])}
${pageHero({
  eyebrow: "For Authors",
  h1: "Article Types",
  lede:
    "Synthica publishes seven article types. Each has a specific scope, structure, and review pathway. Choose the type that best fits your work — and consult the Editorial Chair if unsure.",
})}

${section({
  inner: `
<article class="j-article-type">
    <h2 class="j-h2">Original Research</h2>
    <p><strong>Scope.</strong> Primary research reporting new experimental, computational, or observational findings.</p>
    <ul class="j-bullets">
        <li><strong>Structure.</strong> Full IMRaD.</li>
        <li><strong>Length.</strong> 3,000–8,000 words.</li>
        <li><strong>Figures/tables.</strong> Up to 8 combined.</li>
        <li><strong>Review.</strong> Two peer reviewers minimum.</li>
        <li><strong>Required.</strong> Structured abstract, all declarations, reproducible methods.</li>
    </ul>
</article>

<article class="j-article-type">
    <h2 class="j-h2">Review Article</h2>
    <p><strong>Scope.</strong> Systematic or narrative synthesis of existing literature in a defined area.</p>
    <ul class="j-bullets">
        <li><strong>Structure.</strong> Introduction, Methods (search strategy if systematic), Body (organized thematically), Discussion, Conclusion.</li>
        <li><strong>Length.</strong> 4,000–10,000 words.</li>
        <li><strong>Figures/tables.</strong> Up to 6 combined.</li>
        <li><strong>Review.</strong> Two peer reviewers minimum.</li>
        <li><strong>Required.</strong> Structured abstract; systematic reviews require PRISMA-like reporting.</li>
    </ul>
</article>

<article class="j-article-type">
    <h2 class="j-h2">Methods Paper</h2>
    <p><strong>Scope.</strong> A new method, protocol, computational technique, or instrument — with validation data demonstrating it works.</p>
    <ul class="j-bullets">
        <li><strong>Structure.</strong> Introduction, Method (in detail), Validation, Discussion, Limitations.</li>
        <li><strong>Length.</strong> 2,500–6,000 words.</li>
        <li><strong>Figures/tables.</strong> Up to 6 combined.</li>
        <li><strong>Review.</strong> Two peer reviewers minimum.</li>
        <li><strong>Required.</strong> Reproducible protocol, validation data, code/material availability.</li>
    </ul>
</article>

<article class="j-article-type">
    <h2 class="j-h2">Perspective</h2>
    <p><strong>Scope.</strong> An informed viewpoint on a scientific topic, emerging research area, or methodological debate.</p>
    <ul class="j-bullets">
        <li><strong>Structure.</strong> Free-form, but clearly argued.</li>
        <li><strong>Length.</strong> 1,500–3,000 words.</li>
        <li><strong>Figures/tables.</strong> Up to 2 combined.</li>
        <li><strong>Review.</strong> Editorial review plus one peer reviewer.</li>
        <li><strong>Required.</strong> Unstructured abstract (150–200 words); transparent disclosure of competing positions.</li>
    </ul>
</article>

<article class="j-article-type">
    <h2 class="j-h2">Commentary</h2>
    <p><strong>Scope.</strong> Response to or commentary on a recently published Synthica article (or a published article elsewhere with high relevance to Synthica readers).</p>
    <ul class="j-bullets">
        <li><strong>Structure.</strong> Free-form; must cite the article being discussed.</li>
        <li><strong>Length.</strong> 800–2,000 words.</li>
        <li><strong>Figures/tables.</strong> Up to 1.</li>
        <li><strong>Review.</strong> Editorial review.</li>
        <li><strong>Required.</strong> Explicit citation of the article under discussion; right of reply offered to the original authors.</li>
    </ul>
</article>

<article class="j-article-type">
    <h2 class="j-h2">Data Report</h2>
    <p><strong>Scope.</strong> Describes a dataset — methodology of collection, structure, quality controls — without primary analysis.</p>
    <ul class="j-bullets">
        <li><strong>Structure.</strong> Background, Methods, Data Description, Quality Controls, Reuse Notes.</li>
        <li><strong>Length.</strong> 1,500–4,000 words.</li>
        <li><strong>Figures/tables.</strong> Up to 4 combined.</li>
        <li><strong>Review.</strong> Two peer reviewers minimum.</li>
        <li><strong>Required.</strong> Data must be deposited in a trusted repository with a DOI before publication.</li>
    </ul>
</article>

<article class="j-article-type">
    <h2 class="j-h2">Case Study</h2>
    <p><strong>Scope.</strong> Detailed analysis of a specific case, experiment, or project — with scientific framing, not personal narrative.</p>
    <ul class="j-bullets">
        <li><strong>Structure.</strong> Background, Case Description, Analysis, Discussion, Lessons.</li>
        <li><strong>Length.</strong> 2,000–5,000 words.</li>
        <li><strong>Figures/tables.</strong> Up to 4 combined.</li>
        <li><strong>Review.</strong> Two peer reviewers minimum.</li>
        <li><strong>Required.</strong> Generalizable insight; not just "here's what happened in our class."</li>
    </ul>
</article>
`,
})}
${ctaBlock}
`,
});

// ============================== FOR AUTHORS: FAQ ==============================

pages.push({
  slug: "journal-for-authors-faq",
  title: "Author FAQ",
  description:
    "Frequently asked questions for Synthica authors — timelines, fees, AI use, revisions, withdrawal, copyright, and post-publication.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "For Authors", href: "journal-for-authors.html" },
  { label: "Author FAQ" },
])}
${pageHero({
  eyebrow: "For Authors",
  h1: "Author FAQ",
  lede:
    "Answers to the questions authors ask most often. If you don't see your question, email editorial@synthicajournal.org.",
})}

${section({
  inner: `
<dl class="j-faq">
    <dt>Are there any fees to publish?</dt>
    <dd>No. Synthica is a diamond open-access journal. There are no submission fees, no article processing charges, and no fees of any kind charged to authors. Readers also pay nothing.</dd>

    <dt>How long does it take to publish?</dt>
    <dd>Typical timeline from submission to publication for an accepted article: <strong>~14 weeks</strong>. Desk review: 5 business days. Peer review: 4 weeks target. Author revision: up to 6 weeks for major revision. Final production (copy-edit, proof, DOI minting): ~2 weeks.</dd>

    <dt>Can I submit a manuscript that's been on a preprint server?</dt>
    <dd>Yes. Posting on arXiv, bioRxiv, OSF, or similar preprint servers is permitted and welcomed. Disclose the preprint at submission. After publication, you may update the preprint with a link to the Synthica version.</dd>

    <dt>Can I submit to Synthica and another journal at the same time?</dt>
    <dd>No. Simultaneous submission is prohibited. You may submit to another journal only after Synthica has rejected the manuscript or after you have formally withdrawn it.</dd>

    <dt>Can I use ChatGPT or another AI tool to help write my manuscript?</dt>
    <dd>You may use AI tools for grammar checking, translation, or formatting without disclosure. Substantive use of AI (drafting text, generating figures, generating analysis) must be disclosed in the Declarations section. AI tools cannot be authors. See the <a href="journal-policies-ai-disclosure.html">AI Disclosure Policy</a>.</dd>

    <dt>Who counts as an author?</dt>
    <dd>Anyone who meets all four ICMJE criteria — substantive contribution, drafting/revising, final approval, accountability. Mentors and supervisors are authors only if they meet all four. See <a href="journal-policies-authorship.html">Authorship Policy</a>.</dd>

    <dt>Can I be the sole author as a high school student?</dt>
    <dd>Yes. Synthica welcomes single-author and all-student-team submissions. There is no requirement to add a faculty mentor as an author.</dd>

    <dt>What if my research involves human participants?</dt>
    <dd>You must have prior ethics approval before data collection. Upload approval documentation with your submission. We will not send the manuscript to peer review without it. See <a href="journal-policies-human-subjects.html">Human Subjects Research Policy</a>.</dd>

    <dt>Do I keep the copyright?</dt>
    <dd>Yes. Authors retain copyright. You grant Synthica a non-exclusive license to publish under CC BY 4.0.</dd>

    <dt>Can I withdraw my manuscript after submission?</dt>
    <dd>You may withdraw at any time before acceptance by emailing the Editorial Chair. After acceptance, withdrawal is exceptional and requires Faculty Advisor approval. After publication, withdrawal is not possible; the article remains in the published record (it may be corrected or retracted under the <a href="journal-policies-corrections.html">Corrections &amp; Retractions Policy</a>).</dd>

    <dt>What if my paper is rejected — can I appeal?</dt>
    <dd>Yes. You may appeal a rejection in writing to the Editorial Chair within 30 days. Appeals must identify a specific factual or methodological error in the editorial rationale, or provide new information not available at the time of review. See <a href="journal-policies-peer-review.html">Peer Review Policy</a>.</dd>

    <dt>What if my paper is desk rejected?</dt>
    <dd>Desk rejections often reflect scope mismatch or fixable formatting issues. The decision letter will explain. You may revise and resubmit, or take the manuscript elsewhere. Resubmissions count as new submissions.</dd>

    <dt>How are reviewers chosen?</dt>
    <dd>The Editorial Chair selects reviewers from Synthica's reviewer network based on subject expertise, no institutional conflicts, independence from the authors, and capacity to deliver within four weeks. Authors may suggest or exclude specific potential reviewers; we may or may not honor those suggestions.</dd>

    <dt>Will my paper get a DOI?</dt>
    <dd>Yes. Every published Synthica article receives a Crossref-registered DOI that resolves to the article's HTML landing page.</dd>

    <dt>Will my paper be indexed in Google Scholar?</dt>
    <dd>Synthica is designed to satisfy all of Google Scholar's automatic indexing criteria. Scholar typically indexes new compliant journals within weeks to months of publication. Indexing is automatic; we do not submit individual articles.</dd>

    <dt>What happens if I find an error in my published paper?</dt>
    <dd>Email <a href="mailto:editorial@synthicajournal.org?subject=Author-Initiated%20Correction">editorial@synthicajournal.org</a> promptly. Depending on severity we will issue an Erratum, an Expression of Concern, or in rare cases a Retraction. See <a href="journal-policies-corrections.html">Corrections &amp; Retractions Policy</a>.</dd>

    <dt>I'm in a country where my mentor/IRB doesn't exist — what do I do?</dt>
    <dd>Email the Editorial Chair before submitting. We work with authors in jurisdictions without formal IRB infrastructure to find a qualified Designated Supervisor or ethics committee equivalent. The standard does not bend; the path to meeting it can be flexible.</dd>
</dl>`,
})}
${ctaBlock}
`,
});

// ============================== FOR REVIEWERS ==============================

pages.push({
  slug: "journal-for-reviewers",
  title: "For Reviewers",
  description:
    "Information for current and prospective Synthica reviewers — guidelines, code of conduct, sign-up form, and recognition.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "For Reviewers" }])}
${pageHero({
  eyebrow: "For Reviewers",
  h1: "Review for Synthica.",
  lede:
    "Synthica reviewers are graduate students, postdocs, faculty, and senior undergraduates with subject expertise. Reviewing is academic service — unpaid, ORCID-creditable, essential.",
})}

${section({
  inner: `
<ul class="j-policies j-policies-grid">
    <li><h3>Reviewer Guidelines</h3><p>How to read, evaluate, and write a Synthica review report. The rubric, the timeline, and the code of conduct.</p><a href="journal-for-reviewers-guidelines.html" class="j-policy-link">Read guidelines →</a></li>
    <li><h3>Sign Up</h3><p>Join the reviewer network. Five-minute form covering expertise, capacity, and ORCID iD.</p><a href="journal-for-reviewers-sign-up.html" class="j-policy-link">Apply →</a></li>
    <li><h3>Become a Reviewer (Overview)</h3><p>Eligibility, what you'll do, recognition, and our confidentiality rules.</p><a href="journal-about-reviewers.html" class="j-policy-link">Read overview →</a></li>
</ul>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Reviewer code of conduct (summary)</h2></header>
<ul class="j-bullets">
    <li>Maintain confidentiality of every manuscript you receive.</li>
    <li>Declare any conflict of interest immediately and recuse if present.</li>
    <li>Do not use AI tools on confidential manuscript content.</li>
    <li>Provide objective, evidence-based critique — not personal commentary.</li>
    <li>Meet the four-week turnaround target or notify the Editorial Chair promptly.</li>
    <li>Treat student authors with the same rigor — and the same respect — as senior authors.</li>
</ul>`,
})}

${ctaBlock}
`,
});

pages.push({
  slug: "journal-for-reviewers-guidelines",
  title: "Reviewer Guidelines",
  description:
    "Synthica reviewer guidelines — how to evaluate manuscripts, structure your report, score against the rubric, and uphold confidentiality.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "For Reviewers", href: "journal-for-reviewers.html" },
  { label: "Guidelines" },
])}
${pageHero({
  eyebrow: "For Reviewers",
  h1: "Reviewer Guidelines",
  lede:
    "How to deliver a useful, fair, and timely peer review for Synthica. Read this before your first review; refer back to it for subsequent ones.",
})}

${section({
  inner: `
<h2 class="j-h2">1. What to evaluate</h2>
<p>Assess the manuscript across six dimensions:</p>
<ul class="j-bullets">
    <li><strong>Originality.</strong> Does it contribute new knowledge, method, or perspective?</li>
    <li><strong>Methodology.</strong> Are the methods appropriate and reproducible?</li>
    <li><strong>Results.</strong> Do the results support the claims? Is the data presented clearly and accurately?</li>
    <li><strong>Interpretation.</strong> Is the discussion grounded in the results and the literature?</li>
    <li><strong>Clarity.</strong> Is the writing organized, precise, and free of ambiguity?</li>
    <li><strong>Ethics &amp; integrity.</strong> Are declarations complete? Any signs of fabrication, plagiarism, or undisclosed conflict?</li>
</ul>

<h2 class="j-h2">2. Structure of your report</h2>
<p>Write your report in this order:</p>
<ol class="j-ordered">
    <li><strong>Summary of the manuscript.</strong> Two or three sentences in your own words — this proves you read it carefully and helps the editor calibrate.</li>
    <li><strong>Overall assessment.</strong> One paragraph on the manuscript's contribution and quality.</li>
    <li><strong>Major issues.</strong> Numbered list of substantive concerns that must be addressed.</li>
    <li><strong>Minor issues.</strong> Numbered list of smaller fixes (typos, figure labels, missing references).</li>
    <li><strong>Recommendation.</strong> Accept / Minor Revision / Major Revision / Reject.</li>
    <li><strong>Confidential comments to the editor (optional).</strong> Concerns you do not want shared with authors (e.g., suspected misconduct).</li>
</ol>

<h2 class="j-h2">3. Scoring rubric</h2>
<p>Score each of the six dimensions on a 1–5 scale (1 = unacceptable, 5 = excellent). Provide a brief justification for any score of 1 or 2. The editor uses scores as a calibration aid, not as the sole basis for the decision.</p>

<h2 class="j-h2">4. Timeline</h2>
<ul class="j-bullets">
    <li>Accept or decline the invitation within 3 business days.</li>
    <li>Submit your report within 4 weeks of accepting.</li>
    <li>If you need more time, request an extension as soon as you know — not on the deadline.</li>
</ul>

<h2 class="j-h2">5. Confidentiality</h2>
<p>The manuscript is confidential until publication. You may not share it, cite it in your own work, use it in any way, or upload it to any third-party service (including AI tools). If you need to consult a colleague to evaluate a specialized aspect, obtain written permission from the Editorial Chair first; the colleague is then bound by the same confidentiality.</p>

<h2 class="j-h2">6. AI tools — prohibited on confidential content</h2>
<p>You may not use ChatGPT, Claude, Gemini, or any other AI tool to read, summarize, translate, or generate any part of your review. Uploading the manuscript to an AI tool is a breach of confidentiality and results in removal from the reviewer network. You may use AI tools for general background reading on publicly available material.</p>

<h2 class="j-h2">7. Tone</h2>
<p>Write the review you would want to receive: specific, constructive, evidence-based, professional. Synthica authors are students — many submitting to a peer-reviewed venue for the first time. Demand the same standard of rigor you would demand of any author; deliver feedback with the same respect.</p>

<h2 class="j-h2">8. Bias awareness</h2>
<ul class="j-bullets">
    <li>Evaluate the work, not the author. Don't penalize a manuscript for being from a school you don't recognize.</li>
    <li>Beware of "this is not what I would have done" critiques — judge whether the chosen approach is valid, not whether it matches your preferences.</li>
    <li>If you suspect you cannot review fairly, recuse.</li>
</ul>

<h2 class="j-h2">9. Conflict of interest</h2>
<p>Recuse if you have any of the conflicts listed in the <a href="journal-policies-conflicts-of-interest.html">Conflicts of Interest Policy</a>. If a conflict surfaces partway through your review, notify the Editorial Chair immediately.</p>

<h2 class="j-h2">10. After submitting your report</h2>
<p>The Editorial Chair shares anonymized reports with the authors. You may receive a request for a second-round review if the manuscript returns after major revision. You will be notified of the final decision.</p>
`,
})}
${ctaBlock}
`,
});

pages.push({
  slug: "journal-for-reviewers-sign-up",
  title: "Reviewer Sign-Up",
  description:
    "Join the Synthica reviewer network. Five-minute form covering expertise, capacity, ORCID, and reviewing experience.",
  body: `
${breadcrumbs([
  { label: "Journal", href: "journal.html" },
  { label: "For Reviewers", href: "journal-for-reviewers.html" },
  { label: "Sign Up" },
])}
${pageHero({
  eyebrow: "For Reviewers",
  h1: "Join the reviewer network.",
  lede:
    "Five-minute form. We use your stated expertise and capacity to match you to manuscripts in your field. You can always decline an invitation if the topic isn't a fit or your schedule is full.",
})}

${section({
  inner: `
<form class="j-form" action="mailto:editorial@synthicajournal.org" method="post" enctype="text/plain">
    <fieldset>
        <legend>Identity</legend>
        <label>Full name <span class="j-req">*</span><input type="text" name="name" required></label>
        <label>Email <span class="j-req">*</span><input type="email" name="email" required></label>
        <label>Institution / school <span class="j-req">*</span><input type="text" name="institution" required></label>
        <label>ORCID iD (optional)<input type="text" name="orcid" placeholder="0000-0000-0000-0000" pattern="\\d{4}-\\d{4}-\\d{4}-\\d{3}[\\dX]"></label>
    </fieldset>

    <fieldset>
        <legend>Discipline areas <span class="j-req">*</span></legend>
        <p class="j-form-help">Select all areas where you have research expertise.</p>
        <label class="j-check"><input type="checkbox" name="discipline" value="astro"> Astronomy &amp; Astrophysics</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="bio-cell"> Biology — Cellular &amp; Molecular</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="bio-eco"> Biology — Ecology &amp; Environmental</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="bio-gen"> Biology — Genetics &amp; Genomics</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="biomed-eng"> Biomedical Engineering</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="chem"> Chemistry</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="cs-algo"> CS — Algorithms</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="cs-ml"> CS — Machine Learning &amp; AI</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="cs-sys"> CS — Systems &amp; Networks</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="earth"> Earth &amp; Atmospheric Sciences</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="ee"> Electrical Engineering</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="env"> Environmental Science</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="math-applied"> Mathematics — Applied</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="math-pure"> Mathematics — Pure</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="me"> Mechanical Engineering</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="neuro"> Neuroscience &amp; Cognitive Science</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="phys"> Physics</label>
        <label class="j-check"><input type="checkbox" name="discipline" value="ph"> Public Health &amp; Epidemiology</label>
        <label>Sub-specialties (text, optional)<input type="text" name="subspecialty" placeholder="e.g., single-cell RNA-seq, optical lattice clocks"></label>
    </fieldset>

    <fieldset>
        <legend>Reviewing experience <span class="j-req">*</span></legend>
        <label class="j-radio"><input type="radio" name="experience" value="none" required> None — first-time reviewer</label>
        <label class="j-radio"><input type="radio" name="experience" value="some"> Some — reviewed 1–5 manuscripts</label>
        <label class="j-radio"><input type="radio" name="experience" value="experienced"> Experienced — reviewed 6+ manuscripts</label>
        <label>Notes on prior reviewing (optional)<textarea name="experience-notes" rows="3"></textarea></label>
    </fieldset>

    <fieldset>
        <legend>What you'd review <span class="j-req">*</span></legend>
        <label class="j-radio"><input type="radio" name="type" value="research" required> Original Research</label>
        <label class="j-radio"><input type="radio" name="type" value="review"> Review Articles</label>
        <label class="j-radio"><input type="radio" name="type" value="methods"> Methods Papers</label>
        <label class="j-radio"><input type="radio" name="type" value="all"> Any of the above</label>
    </fieldset>

    <fieldset>
        <legend>Capacity</legend>
        <label>How many manuscripts could you review per year? <input type="number" name="capacity" min="1" max="20" value="3"></label>
        <label>How did you hear about Synthica? <input type="text" name="referral"></label>
    </fieldset>

    <button type="submit" class="j-btn j-btn-primary">Submit application</button>
    <p class="j-form-foot">By submitting, you agree to the <a href="journal-for-reviewers-guidelines.html">Reviewer Code of Conduct</a>. The Editorial Chair will follow up by email.</p>
</form>`,
})}
${ctaBlock}
`,
});

// ============================== ISSUES ==============================

pages.push({
  slug: "journal-issues",
  title: "Issues Archive",
  description:
    "All Synthica Journal issues — paginated, most recent first. Each issue links to its table of contents and full-issue PDF.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "Issues" }])}
${pageHero({
  eyebrow: "Issues Archive",
  h1: "All issues of Synthica Journal.",
  lede:
    "Synthica publishes one or more issues per volume. Each issue collects research, reviews, methods, and perspectives accepted during that period. The pilot issue (Volume 1, Issue 1) is in preparation.",
})}

${section({
  inner: `
<article class="j-issue">
    <header class="j-issue-hd">
        <p class="j-eyebrow">Volume 1 · Issue 1 · in preparation</p>
        <h2>Pilot Issue — 2026</h2>
        <p class="j-issue-meta">ISSN pending · CC BY 4.0 · Open access</p>
    </header>
    <p>The pilot issue will appear here when articles complete peer review and final production. Each article will have its own landing page with citation metadata, structured abstract, declarations, references, and a downloadable PDF.</p>
    <p class="j-issue-toc-note">Table of contents will be populated upon publication.</p>
    <ul class="j-articles">
        <li class="j-article">
            <p class="j-article-type">Original Research</p>
            <h3 class="j-article-title"><a href="journal-issues.html#tba">Forthcoming — title TBA</a></h3>
            <p class="j-article-authors">Authors TBA · Double-blind peer review in progress</p>
            <p class="j-article-foot"><span class="j-tag-oa">Open Access</span><span class="j-article-date">Coming soon</span></p>
        </li>
        <li class="j-article">
            <p class="j-article-type">Review Article</p>
            <h3 class="j-article-title"><a href="journal-issues.html#tba">Forthcoming — title TBA</a></h3>
            <p class="j-article-authors">Authors TBA · Double-blind peer review in progress</p>
            <p class="j-article-foot"><span class="j-tag-oa">Open Access</span><span class="j-article-date">Coming soon</span></p>
        </li>
        <li class="j-article">
            <p class="j-article-type">Methods Paper</p>
            <h3 class="j-article-title"><a href="journal-issues.html#tba">Forthcoming — title TBA</a></h3>
            <p class="j-article-authors">Authors TBA · Double-blind peer review in progress</p>
            <p class="j-article-foot"><span class="j-tag-oa">Open Access</span><span class="j-article-date">Coming soon</span></p>
        </li>
    </ul>
</article>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">About issue structure</h2></header>
<ul class="j-bullets">
    <li>Each issue page lists every article with title, authors, type, and a link to the full landing page.</li>
    <li>Every article page carries: citation metadata (Google Scholar tags), structured abstract, full HTML body, declarations, references, and a downloadable PDF.</li>
    <li>A consolidated issue PDF (all articles combined) is available as an optional download.</li>
    <li>Issues do not change after publication. Corrections appear as separately published Errata; see the <a href="journal-policies-corrections.html">Corrections Policy</a>.</li>
</ul>`,
})}

${ctaBlock}
`,
});

// ============================== SEARCH ==============================

pages.push({
  slug: "journal-search",
  title: "Search Articles",
  description:
    "Search across all Synthica Journal articles by title, author, keyword, or discipline.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "Search" }])}
${pageHero({
  eyebrow: "Search",
  h1: "Search Synthica articles.",
  lede:
    "Find articles by title, author, keyword, or discipline. Results are highlighted and filtered by year, type, and field.",
})}

${section({
  inner: `
<form class="j-search" role="search" action="journal-search.html" method="get">
    <label for="q" class="j-search-label">Search articles, authors, topics…</label>
    <div class="j-search-row">
        <input type="search" id="q" name="q" placeholder="e.g., CRISPR off-target effects" autofocus>
        <button type="submit" class="j-btn j-btn-primary">Search</button>
    </div>
    <fieldset class="j-search-filters">
        <legend>Filters</legend>
        <label>Discipline
            <select name="discipline">
                <option value="">Any discipline</option>
                <option>Astronomy &amp; Astrophysics</option>
                <option>Biology — Cellular &amp; Molecular</option>
                <option>Biology — Ecology &amp; Environmental</option>
                <option>Biology — Genetics &amp; Genomics</option>
                <option>Biomedical Engineering</option>
                <option>Chemistry</option>
                <option>Computer Science — Algorithms</option>
                <option>Computer Science — ML &amp; AI</option>
                <option>Computer Science — Systems &amp; Networks</option>
                <option>Earth &amp; Atmospheric Sciences</option>
                <option>Electrical Engineering</option>
                <option>Environmental Science</option>
                <option>Mathematics</option>
                <option>Mechanical Engineering</option>
                <option>Neuroscience &amp; Cognitive Science</option>
                <option>Physics</option>
                <option>Public Health &amp; Epidemiology</option>
            </select>
        </label>
        <label>Article type
            <select name="type">
                <option value="">Any type</option>
                <option>Original Research</option>
                <option>Review Article</option>
                <option>Methods Paper</option>
                <option>Perspective</option>
                <option>Commentary</option>
                <option>Data Report</option>
                <option>Case Study</option>
            </select>
        </label>
        <label>Year
            <select name="year">
                <option value="">Any year</option>
                <option>2026</option>
            </select>
        </label>
        <label>Sort by
            <select name="sort">
                <option value="relevance">Most relevant</option>
                <option value="date">Most recent</option>
            </select>
        </label>
    </fieldset>
</form>

<div class="j-search-results" role="region" aria-live="polite">
    <p class="j-search-empty">No articles published yet. The pilot issue is in preparation — check back soon, or <a href="journal-announcements.html">read the latest announcements</a>.</p>
</div>`,
})}
${ctaBlock}
`,
});

// ============================== CONTACT ==============================

pages.push({
  slug: "journal-contact",
  title: "Contact",
  description:
    "Contact Synthica Journal — editorial inquiries, technical issues, press, reviewer applications, and general questions.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "Contact" }])}
${pageHero({
  eyebrow: "Contact",
  h1: "Get in touch.",
  lede:
    "Editorial inquiries, technical issues, press requests, reviewer applications, and general questions. We aim to respond within three business days.",
})}

${section({
  inner: `
<div class="j-contact-grid">
    <div>
        <h2 class="j-h2">Direct email</h2>
        <p>For all editorial matters: <a href="mailto:editorial@synthicajournal.org">editorial@synthicajournal.org</a></p>
        <p>For press inquiries, indicate "Press" in the subject line.</p>
        <p>For reviewer applications, use the <a href="journal-for-reviewers-sign-up.html">structured form</a>.</p>
        <p>For ethics concerns about a published article, indicate "Ethics Concern" in the subject line and include the article's DOI.</p>

        <h2 class="j-h2">Response times</h2>
        <ul class="j-bullets">
            <li>General inquiries: within 3 business days.</li>
            <li>Submission status: handled in the submission portal; allow 5 business days for desk review.</li>
            <li>Ethics concerns: acknowledged within 5 business days; investigation timelines vary by complexity.</li>
        </ul>
    </div>
    <form class="j-form" action="mailto:editorial@synthicajournal.org" method="post" enctype="text/plain">
        <fieldset>
            <legend>Send a message</legend>
            <label>Your name <span class="j-req">*</span><input type="text" name="name" required></label>
            <label>Email <span class="j-req">*</span><input type="email" name="email" required></label>
            <label>Subject <span class="j-req">*</span>
                <select name="subject" required>
                    <option value="">Select…</option>
                    <option>General Inquiry</option>
                    <option>Editorial Question</option>
                    <option>Technical Issue</option>
                    <option>Press Inquiry</option>
                    <option>Reviewer Application</option>
                    <option>Ethics Concern</option>
                    <option>Author-Initiated Correction</option>
                </select>
            </label>
            <label>Message <span class="j-req">*</span><textarea name="message" rows="6" maxlength="2000" required placeholder="Up to 2,000 characters."></textarea></label>
            <button type="submit" class="j-btn j-btn-primary">Send</button>
            <p class="j-form-foot">We aim to respond within 3 business days. For confidential reports, your identity is kept private unless legally required to disclose.</p>
        </fieldset>
    </form>
</div>`,
})}
${ctaBlock}
`,
});

// ============================== ANNOUNCEMENTS ==============================

pages.push({
  slug: "journal-announcements",
  title: "Announcements",
  description:
    "News and announcements from Synthica Journal — calls for submissions, milestone updates, editorial team news, and indexing progress.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "Announcements" }])}
${pageHero({
  eyebrow: "Announcements",
  h1: "Journal news and updates.",
  lede:
    "Calls for submissions, editorial team news, ISSN and DOI updates, indexing milestones. The most recent announcements appear first.",
})}

${section({
  inner: `
<ol class="j-news">
    <li>
        <p class="j-news-date">2026 · Q2</p>
        <h2 class="j-h3">Reviewer recruitment is open</h2>
        <p>Synthica is recruiting reviewers across all listed disciplines. Graduate students, postdocs, faculty, and senior undergraduates with subject expertise are welcome. <a href="journal-for-reviewers-sign-up.html" class="j-text-link">Apply →</a></p>
    </li>
    <li>
        <p class="j-news-date">2026 · Q2</p>
        <h2 class="j-h3">Submissions are open for Volume 1, Issue 1</h2>
        <p>Synthica is now accepting submissions for its pilot issue. Original Research, Reviews, Methods, Perspectives, Commentaries, Data Reports, and Case Studies are all eligible. <a href="journal-submit.html" class="j-text-link">Submit →</a></p>
    </li>
    <li>
        <p class="j-news-date">2026 · Q2</p>
        <h2 class="j-h3">ISSN application submitted</h2>
        <p>Synthica has submitted its electronic ISSN application to the U.S. ISSN Center (Library of Congress). The eISSN will appear on the homepage and every article page once issued.</p>
    </li>
    <li>
        <p class="j-news-date">2026 · Q1</p>
        <h2 class="j-h3">Editorial framework published</h2>
        <p>The Synthica editorial framework, policies, and submission guidelines are now live. The journal is aligned with IEEE publication ethics, COPE guidelines, and Society for Science (ISEF 2026) safeguards.</p>
    </li>
</ol>`,
})}

${ctaBlock}
`,
});

// ============================== SUBMIT ==============================

pages.push({
  slug: "journal-submit",
  title: "Submit a Manuscript",
  description:
    "Pre-submission checklist and entry point to the Synthica submission portal. Review the requirements, then proceed.",
  body: `
${breadcrumbs([{ label: "Journal", href: "journal.html" }, { label: "Submit" }])}
${pageHero({
  eyebrow: "Submit",
  h1: "Submit your manuscript.",
  lede:
    "Before you create an account in the submission portal, run through the pre-submission checklist below. It saves time and reduces the chance of desk rejection on fixable issues.",
})}

${section({
  inner: `
<h2 class="j-h2">Quick pre-submission checklist</h2>
<ul class="j-checklist-items">
    <li><input type="checkbox"> The work is original, not previously published, and not under simultaneous review elsewhere.</li>
    <li><input type="checkbox"> The manuscript follows the article type's required structure (IMRaD for Original Research).</li>
    <li><input type="checkbox"> Structured abstract is 150–250 words.</li>
    <li><input type="checkbox"> 3–8 keywords are included.</li>
    <li><input type="checkbox"> Every author meets all four ICMJE criteria.</li>
    <li><input type="checkbox"> Declarations section is complete (funding, COI, ethics, data, contributions, AI).</li>
    <li><input type="checkbox"> Ethics approval is documented for any human-subjects research.</li>
    <li><input type="checkbox"> The manuscript file is anonymized for double-blind review.</li>
    <li><input type="checkbox"> Author Declaration Form is signed and ready to upload.</li>
    <li><input type="checkbox"> Figures are uploaded as separate files at ≥300 DPI with alt text.</li>
</ul>
<p class="j-sec-foot"><a href="journal-for-authors-author-checklist.html" class="j-text-link">Full pre-submission checklist →</a></p>`,
})}

${section({
  alt: true,
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">Submission portal</h2>
<p>Synthica's submission portal handles account creation, manuscript upload, metadata entry, and the Author Declaration Form. The portal is currently in onboarding. For the pilot issue, submit by email to <a href="mailto:editorial@synthicajournal.org?subject=Manuscript%20Submission">editorial@synthicajournal.org</a> with all required files attached and the subject line "Manuscript Submission — [your manuscript title]".</p>
</header>
<div class="j-cta-actions">
    <a href="mailto:editorial@synthicajournal.org?subject=Manuscript%20Submission" class="j-btn j-btn-primary">Email submission</a>
    <a href="journal-for-authors-submission-guidelines.html" class="j-btn j-btn-ghost-dark">Read full submission guidelines</a>
</div>`,
})}

${section({
  inner: `
<header class="j-sec-hd j-sec-hd-tight"><h2 class="j-h2">What happens after you submit</h2></header>
<ol class="j-ordered">
    <li>Automatic confirmation email with your manuscript reference number.</li>
    <li>Desk review by the Editorial Chair within 5 business days.</li>
    <li>If desk review passes: assignment to two independent reviewers; double-blind review, 4-week target.</li>
    <li>Decision letter with full anonymized reviewer reports and editorial rationale.</li>
    <li>If revision is requested: submit revised manuscript plus point-by-point response letter.</li>
    <li>After acceptance: copy-edit, author proof, DOI minting, publication under CC BY 4.0.</li>
</ol>`,
})}
${ctaBlock}
`,
});

// -----------------------------------------------------------------------------
// Render all pages
// -----------------------------------------------------------------------------

const root = process.cwd();

let count = 0;
for (const p of pages) {
  const html = `${head({
    title: p.title,
    description: p.description,
    slug: p.slug,
  })}\n${p.body}\n${footer}\n`;
  const file = resolve(root, `${p.slug}.html`);
  await writeFile(file, html, "utf8");
  count++;
  console.log(`✓ ${p.slug}.html`);
}

console.log(`\nDone — wrote ${count} page${count === 1 ? "" : "s"}.`);
