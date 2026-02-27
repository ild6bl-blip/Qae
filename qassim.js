// ===== JavaScript لصفحة منطقة القصيم =====

document.addEventListener('DOMContentLoaded', function () {

    // تأثير الظهور التدريجي للعناصر عند التمرير
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // إضافة كلاس الانتظار للعناصر
    const animatedElements = document.querySelectorAll(
        '.city-card, .feature-item, .about-text, .section-header'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // عند ظهور العنصر
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // تأثير الهيدر عند التمرير
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(13, 13, 13, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.background = 'rgba(13, 13, 13, 0.92)';
            header.style.boxShadow = 'none';
        }
    });

    // تأثير بطاقات المدن عند التحويم
    const cityCards = document.querySelectorAll('.city-card');
    cityCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.borderColor = 'rgba(200, 169, 110, 0.4)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.borderColor = 'rgba(200, 169, 110, 0.1)';
        });
    });

    // عداد الإحصائيات المتحرك
    const stats = document.querySelectorAll('.hero-stat .num');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                // فقط للأرقام البسيطة
                if (!isNaN(text.replace(/[,+]/g, ''))) {
                    const target = parseInt(text.replace(/[,+]/g, ''));
                    const suffix = text.includes('+') ? '+' : '';
                    let current = 0;
                    const increment = target / 40;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = Math.floor(current).toLocaleString('ar') + suffix;
                    }, 50);
                }
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    console.log('✅ صفحة منطقة القصيم جاهزة');
});
