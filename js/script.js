console.log("✅ test.js loaded");

document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ DOMContentLoaded fired");

    // --- BUTTONS --------------------------------------------------------
    const buttons = document.querySelectorAll('.project_info_btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement;
            const textDiv = container.querySelector('div');

            if (!textDiv) return;

            if (textDiv.classList.contains('line-clamp-3')) {
                textDiv.classList.remove('line-clamp-3');
                const span_icon = button.querySelector("#hex_icon");
                if (span_icon) span_icon.classList.toggle('rotate-90');
                const span_text = button.querySelector("#button_text");
                if (span_text) span_text.innerText = 'Minder weergeven';
            } else {
                textDiv.classList.add('line-clamp-3');
                const span_icon = button.querySelector("#hex_icon");
                if (span_icon) span_icon.classList.remove('rotate-90');
                const span_text = button.querySelector("#button_text");
                if (span_text) span_text.innerText = 'Meer over dit project';
            }
        });
    });

    // --- COVER / HERO ---------------------------------------------------
    const heroSection   = document.getElementById('hero_section');
    const pie_container = document.getElementById('pie_container');
    const cover_text    = document.querySelector('.cover_text');
    const slices        = document.querySelectorAll('.cover_slice');

    const s6  = document.querySelector('.s6');
    const s7  = document.querySelector('.s7');
    const s8  = document.querySelector('.s8');
    const s9  = document.querySelector('.s9');
    const s10 = document.querySelector('.s10');
    const s11 = document.querySelector('.s11');
    const s12 = document.querySelector('.s12');

    const tekst_input = [
        "Bekijk onze use-cases voor de toepassing van LLM’s in bedrijfsprocessen",
        "Expertise in onder andere Python, SQL en VBA.",
        "Ruime ervaring in het ontwerpen en programmeren van maatwerktools zoals Qlik en Power BI.",
        "Gecertificeerd in het werken met Process Mining-tools zoals Celonis.",
        "Diepgaande kennis van diverse ERP-systemen."
    ];

    let moved         = false;
    let revealStarted = false;
    let progressor    = null;
    let i = 45;
    let idx = 0;

    // ⭐️ HERO DIRECT ZICHTBAAR MAKEN, LOS VAN SCROLL-REVEAL
    if (heroSection) {
        heroSection.classList.add('is-visible'); // doorbreekt de [data-reveal] hiding voor de hero
    }

    function movePieToTopAndShrink() {
        if (moved || !pie_container) return;

        pie_container.classList.remove('scale-100', 'translate-y-0');
        pie_container.classList.add('scale-75', '-translate-y-12'); // finetune naar smaak
        heroSection.classList.remove('min-h-screen')


        moved = true;
    }

    // --- SCROLL REVEAL (VOOR ALLES BEHALVE HERO) -----------------------
    function startScrollReveal() {
        if (revealStarted) return;
        revealStarted = true;

        console.log("▶ startScrollReveal (rest van de pagina)");

        const root = document.querySelector('[data-scroll-container]') || null;

        const io = new IntersectionObserver((entries, obs) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                const el = entry.target;

                el.classList.add('is-visible');

                if (el.dataset.reveal === 'stagger') {
                    const sel = el.dataset.stagger || ':scope > *';
                    const items = [...el.querySelectorAll(sel)];
                    const base = parseFloat(getComputedStyle(el).getPropertyValue('--delay') || 0) || 0;
                    const step = parseFloat(getComputedStyle(el).getPropertyValue('--stagger-step') || .08) || .08;

                    items.forEach((child, i) => {
                        child.style.transitionDelay = `${base + i * step}s`;
                        void child.offsetHeight;
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    });
                }

                if (el.dataset.revealOnce !== 'false') {
                    obs.unobserve(el);
                }
            }
        }, {
            root,
            threshold: 0.12
        });

        // 👉 LET OP: hero_section wordt UITGESLOTEN
        document.querySelectorAll('[data-reveal]').forEach(el => {
            if (el.id === 'hero_section') return; // hero niet via scroll-reveal
            io.observe(el);
        });
    }

    // --- COVER SLIDER ---------------------------------------------------
    function cover_slider() {
        if (!pie_container || !cover_text || slices.length === 0) {
            console.warn("cover_slider: missing elements, aborting animation");
            clearInterval(progressor);
            startScrollReveal();
            return;
        }

        if (i === 50) {
            i = -5;
            const slice = slices[idx];
            cover_text.classList.remove("ct_visible");

            if (idx < slices.length && slice && slice.href && slice.href.baseVal) {
                const href = slice.href.baseVal;

                if (href.includes('celonis') && s7) {
                    s7.style.fill = '#ffffff';
                } else if (href.includes('bi') && s8) {
                    s8.style.fill = '#ffffff';
                } else if (href.includes('python') && s6) {
                    s6.style.fill = '#ffffff';
                } else if (href.includes('ai') && s9) {
                    s9.style.fill = '#1e72d6';
                }
                slice.style.opacity = 1;
            }

        } else if (i === 1) {
            if (idx < tekst_input.length) {
                cover_text.textContent = tekst_input[idx];
            }
            cover_text.classList.add("ct_visible");
            i++;
            idx++;

            if (idx > slices.length) {
                console.log("▶ cover_slider klaar");

                cover_text.innerHTML = "Join the future, and grab your piece of automation!";
                cover_text.className = "sm:text-3xl text-2xl font-medium title-font text-[#6D6439] flex items-center justify-center";

                if (s10) s10.style.fill = "#ffffff";
                if (s11) s11.style.fill = "#d8a340ff";
                if (s12) s12.style.fill = "#ffffff";

                movePieToTopAndShrink(); // hero naar boven + kleiner
                startScrollReveal();     // nu pas de rest van de pagina

                clearInterval(progressor);
            }
        } else {
            i++;
        }
    }

    // Start de slider (laat hero meteen zien)
    if (pie_container && cover_text && slices.length > 0) {
        console.log("▶ starting cover_slider interval");
        progressor = setInterval(cover_slider, 50);
    } else {
        console.warn("⚠ cover animation not started (missing elements)");
        startScrollReveal();
    }
});
