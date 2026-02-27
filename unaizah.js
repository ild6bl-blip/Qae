// ===== JavaScript خاص بمدينة عنيزة =====

document.addEventListener('DOMContentLoaded', function () {

    // ===== تأثير الظهور التدريجي =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 120);
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
        header.style.background = window.scrollY > 80
            ? 'rgba(13, 13, 13, 0.98)'
            : 'rgba(13, 13, 13, 0.92)';
    });

    // ===== تأثير تحويم بطاقات المعالم =====
    document.querySelectorAll('.landmark-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.landmark-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(-5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.landmark-icon');
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ===== معلومات عنيزة المتحركة =====
    const facts = [
        { icon: '🏛️', text: 'عنيزة تُلقّب بـ"باريس نجد" لجمالها وتميزها الثقافي' },
        { icon: '📚', text: 'أنجبت عنيزة كثيراً من العلماء والأدباء المشهورين' },
        { icon: '🌴', text: 'تشتهر بتمور الخلاص الفاخرة ذات الجودة العالية' },
        { icon: '🏰', text: 'تحتضن أجمل نماذج العمارة النجدية الطينية التقليدية' }
    ];

    const ticker = document.createElement('div');
    ticker.style.cssText = `
        background: rgba(122, 158, 110, 0.07);
        border-top: 1px solid rgba(122, 158, 110, 0.15);
        border-bottom: 1px solid rgba(122, 158, 110, 0.15);
        padding: 12px 24px;
        text-align: center;
    `;

    const factText = document.createElement('div');
    factText.style.cssText = `
        font-size: 0.88rem;
        color: #a0998a;
        transition: opacity 0.5s ease;
    `;

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

    console.log('✅ صفحة عنيزة جاهزة');
});
