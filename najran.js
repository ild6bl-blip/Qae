// ===== JavaScript لصفحة منطقة نجران =====

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
    }, { threshold: 0.12 });

    const elements = document.querySelectorAll(
        '.city-card, .feature-item, .about-text, .section-header'
    );

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== تأثير الهيدر =====
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 50
            ? 'rgba(13, 13, 13, 0.98)'
            : 'rgba(13, 13, 13, 0.92)';
    });

    // ===== تأثير بطاقات المدن =====
    document.querySelectorAll('.city-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.borderColor = 'rgba(192, 90, 58, 0.45)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.borderColor = 'rgba(192, 90, 58, 0.1)';
        });
    });

    // ===== عداد الإحصائيات =====
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                if (!isNaN(text.replace(/[,+K]/g, ''))) {
                    const isK = text.includes('K');
                    const target = parseInt(text.replace(/[,+K]/g, ''));
                    const suffix = text.includes('+') ? '+' : '';
                    let current = 0;
                    const increment = target / 40;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = Math.floor(current).toLocaleString('ar') + (isK ? 'K' : '') + suffix;
                    }, 50);
                }
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.hero-stat .num').forEach(stat => statsObserver.observe(stat));

    console.log('✅ صفحة منطقة نجران جاهزة');
});
