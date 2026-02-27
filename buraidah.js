// ===== JavaScript خاص بمدينة بريدة =====

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

    const elements = document.querySelectorAll(
        '.landmark-card, .info-card, .content-main p, .highlight-box'
    );

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== تأثير الهيدر =====
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.background = 'rgba(13, 13, 13, 0.98)';
        } else {
            header.style.background = 'rgba(13, 13, 13, 0.92)';
        }
    });

    // ===== تأثير تحويم بطاقات المعالم =====
    const landmarkCards = document.querySelectorAll('.landmark-card');
    landmarkCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.landmark-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.landmark-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ===== معلومات بريدة الديناميكية =====
    const cityFacts = [
        { icon: '🌴', text: 'بريدة تُنتج أكثر من 400 نوع من التمور' },
        { icon: '🐪', text: 'سوق الجمعة يُعدّ من أكبر أسواق الإبل في العالم' },
        { icon: '🎓', text: 'تحتضن جامعة القصيم وعدة كليات متخصصة' },
        { icon: '🏙️', text: 'أكبر مدن منطقة القصيم من حيث المساحة والسكان' }
    ];

    // إضافة شريط المعلومات المتحرك
    const factsContainer = document.createElement('div');
    factsContainer.className = 'facts-ticker';
    factsContainer.style.cssText = `
        background: rgba(200, 169, 110, 0.08);
        border-top: 1px solid rgba(200, 169, 110, 0.15);
        border-bottom: 1px solid rgba(200, 169, 110, 0.15);
        padding: 12px 24px;
        overflow: hidden;
        position: relative;
    `;

    let currentFact = 0;
    const factDisplay = document.createElement('div');
    factDisplay.style.cssText = `
        text-align: center;
        font-size: 0.88rem;
        color: #a0998a;
        transition: opacity 0.5s ease;
    `;

    function updateFact() {
        factDisplay.style.opacity = '0';
        setTimeout(() => {
            const fact = cityFacts[currentFact];
            factDisplay.textContent = `${fact.icon}  ${fact.text}`;
            factDisplay.style.opacity = '1';
            currentFact = (currentFact + 1) % cityFacts.length;
        }, 500);
    }

    factsContainer.appendChild(factDisplay);
    updateFact();
    setInterval(updateFact, 4000);

    // إدراج شريط المعلومات بعد الهيرو
    const hero = document.querySelector('.city-hero');
    if (hero && hero.nextSibling) {
        hero.parentNode.insertBefore(factsContainer, hero.nextSibling);
    }

    console.log('✅ صفحة بريدة جاهزة');
});
