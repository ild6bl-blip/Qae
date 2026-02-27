// ===== JavaScript خاص بمدينة شرورة =====

document.addEventListener('DOMContentLoaded', function () {

    // ===== تأثير الظهور التدريجي =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.landmark-card, .info-card, .content-main p, .highlight-box')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

    // ===== تأثير الهيدر =====
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 80
            ? 'rgba(13, 13, 13, 0.98)'
            : 'rgba(13, 13, 13, 0.92)';
    });

    // ===== تأثير تحويم المعالم =====
    document.querySelectorAll('.landmark-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.landmark-icon');
            if (icon) {
                icon.style.transform = 'scale(1.25) translateY(-4px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.landmark-icon');
            if (icon) icon.style.transform = 'scale(1) translateY(0)';
        });
    });

    // ===== تأثير الرمال المتحركة =====
    function createSandParticle() {
        const hero = document.querySelector('.city-hero');
        if (!hero) return;

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(212, 160, 74, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            bottom: 0;
            z-index: 2;
            pointer-events: none;
            animation: sandFloat ${Math.random() * 3 + 2}s ease-in-out forwards;
        `;

        hero.appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
    }

    // إضافة CSS للرسوم المتحركة
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sandFloat {
            0% { transform: translateY(0) translateX(0); opacity: 0.6; }
            50% { transform: translateY(-60px) translateX(${Math.random() > 0.5 ? '' : '-'}20px); opacity: 0.8; }
            100% { transform: translateY(-120px) translateX(${Math.random() > 0.5 ? '' : '-'}40px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // إنشاء جسيمات الرمال كل ثانية
    setInterval(createSandParticle, 800);

    // ===== معلومات شرورة المتحركة =====
    const facts = [
        { icon: '🏜️', text: 'شرورة بوابة الربع الخالي أكبر صحاري الرمال في العالم' },
        { icon: '🌡️', text: 'تُسجّل شرورة من أعلى درجات الحرارة في المملكة صيفاً' },
        { icon: '✈️', text: 'يربط مطار شرورة المحافظة بالرياض وجدة ومدن أخرى' },
        { icon: '⭐', text: 'تتميز بأصفى سماء ليلية لمشاهدة النجوم بعيداً عن التلوث الضوئي' }
    ];

    const ticker = document.createElement('div');
    ticker.style.cssText = `
        background: rgba(212, 160, 74, 0.07);
        border-top: 1px solid rgba(212, 160, 74, 0.15);
        border-bottom: 1px solid rgba(212, 160, 74, 0.15);
        padding: 12px 24px;
        text-align: center;
    `;

    const factText = document.createElement('div');
    factText.style.cssText = `font-size: 0.88rem; color: #a0998a; transition: opacity 0.5s ease;`;

    let idx = 0;
    function showFact() {
        factText.style.opacity = '0';
        setTimeout(() => {
            factText.textContent = `${facts[idx].icon}  ${facts[idx].text}`;
            factText.style.opacity = '1';
            idx = (idx + 1) % facts.length;
        }, 500);
    }

    ticker.appendChild(factText);
    showFact();
    setInterval(showFact, 4000);

    const hero = document.querySelector('.city-hero');
    if (hero) hero.parentNode.insertBefore(ticker, hero.nextSibling);

    console.log('✅ صفحة شرورة جاهزة');
});
