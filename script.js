// 导航栏滚动效果
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// 移动端菜单切换
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// 点击菜单项后关闭移动端菜单
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
    link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

// 元素进入视口时添加动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.6s ease forwards";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有卡片和元素
const animatedElements = document.querySelectorAll(
    ".service-card, .timeline-item, .example-card, .contact-card, .requirements-list li, .info-card"
);

animatedElements.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
});

// 为各个卡片添加延迟动画效果
document
    .querySelectorAll(".services-grid .service-card")
    .forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
});

document.querySelectorAll(".example-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// 动态添加悬浮效果
const cards = document.querySelectorAll(
    ".service-card, .example-card, .contact-card"
);
cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
    });
});

// 添加鼠标跟随效果到装饰圆圈
document.addEventListener("mousemove", function (e) {
    const circles = document.querySelectorAll(".decoration-circle");
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    circles.forEach((circle, index) => {
        const speed = (index + 1) * 20;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// 添加页面加载完成后的动画
window.addEventListener("load", function () {
    document.body.style.opacity = "1";

    // 为 hero 内容添加进入动画
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        heroContent.style.animation = "fadeInUp 1s ease forwards";
    }
});

// 防止页面加载时出现闪烁
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.3s ease";

// 添加打字机效果（可选）
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = "";

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// 为数字添加计数动画效果
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// 添加返回顶部按钮功能
const scrollTopBtn = document.createElement("div");
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.innerHTML = "↑";
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = "1";
        scrollTopBtn.style.visibility = "visible";
    } else {
        scrollTopBtn.style.opacity = "0";
        scrollTopBtn.style.visibility = "hidden";
    }
});

scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

scrollTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) translateY(-5px)";
});

scrollTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) translateY(0)";
});

// 添加活跃导航链接高亮
window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// 性能优化：使用节流函数
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 应用节流到滚动事件
window.addEventListener(
    "scroll",
    throttle(function () {
        // 滚动相关的代码已经在上面定义
    }, 100)
);

console.log("🌐 gjxx.dev - 免费建站服务官网已加载");
