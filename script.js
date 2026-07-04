/* ======================================================
   CONFIG
====================================================== */

const words = [
    "Computer Architecture",
    "Hardware Engineering",
    "System Design",
    "CPU Architecture"
];

/* ======================================================
   TYPING EFFECT
====================================================== */

const typing = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {

    const current = words[wordIndex];

    if (!deleting) {

        typing.textContent = current.substring(0, ++charIndex);

        if (charIndex === current.length) {

            deleting = true;

            return setTimeout(type, 1800);

        }

    } else {

        typing.textContent = current.substring(0, --charIndex);

        if (charIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

        }

    }

    setTimeout(type, deleting ? 45 : 90);

}

type();

/* ======================================================
   SCROLL PROGRESS BAR
====================================================== */

const progress = document.getElementById("progress-bar");

addEventListener("scroll", () => {

    const max =
        document.documentElement.scrollHeight -
        innerHeight;

    progress.style.width =
        scrollY / max * 100 + "%";

});

/* ======================================================
   SECTION REVEAL
====================================================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting)

            entry.target.classList.add("show");

    });

}, {

    threshold: .15

});

document
.querySelectorAll(".section")
.forEach(section => observer.observe(section));

/* ======================================================
   COUNTERS
====================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        let current = 0;

        const speed = target / 70;

        function update() {

            current += speed;

            if (current >= target) {

                counter.textContent = target;

                return;

            }

            counter.textContent = Math.floor(current);

            requestAnimationFrame(update);

        }

        update();

        counterObserver.unobserve(counter);

    });

});

counters.forEach(c => counterObserver.observe(c));

/* ======================================================
   ATTRIBUTE BARS
====================================================== */

const fills = document.querySelectorAll(".fill");

const fillObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.width =
                entry.target.dataset.width + "%";

        }

    });

});

fills.forEach(fill => fillObserver.observe(fill));

/* ======================================================
   LIGHTBOX
====================================================== */

const photos = document.querySelectorAll(".photo img");

const lightbox = document.getElementById("lightbox");

const lightImg = document.getElementById("lightbox-img");

const caption = document.getElementById("caption");

const closeBtn = document.getElementById("close");

photos.forEach(img => {

    img.onclick = () => {

        lightbox.style.display = "flex";

        lightImg.src = img.src;

        caption.textContent =
            img.parentElement.querySelector("figcaption").textContent;

    };

});

closeBtn.onclick = () =>

    lightbox.style.display = "none";

lightbox.onclick = e => {

    if (e.target === lightbox)

        lightbox.style.display = "none";

};

/* ======================================================
   PARTICLE BACKGROUND
====================================================== */

const particleContainer = document.getElementById("particles");

for (let i = 0; i < 55; i++) {

    const p = document.createElement("span");

    const size = Math.random() * 4 + 2;

    p.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size}px;
        border-radius:50%;
        background:rgba(0,212,255,.45);
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        animation:float ${10 + Math.random()*15}s linear infinite;
        animation-delay:${Math.random()*10}s;
    `;

    particleContainer.appendChild(p);

}

/* ======================================================
   ACTIVE NAV LINK
====================================================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (scrollY >= top)

            current = section.id;

    });

    navLinks.forEach(link => {

        link.classList.toggle(

            "active",

            link.getAttribute("href") === "#" + current

        );

    });

});

/* ======================================================
   MOUSE GLOW
====================================================== */

const glow = document.createElement("div");

glow.id = "cursor-glow";

document.body.appendChild(glow);

addEventListener("mousemove", e => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});

/* ======================================================
   FLOATING ANIMATION CSS
====================================================== */

const style = document.createElement("style");

style.textContent = `

@keyframes float{

0%{

transform:translateY(0);

}

50%{

transform:translateY(-45px);

}

100%{

transform:translateY(0);

}

}

#cursor-glow{

position:fixed;

width:260px;

height:260px;

border-radius:50%;

background:radial-gradient(circle,
rgba(0,212,255,.15),
transparent 70%);

pointer-events:none;

transform:translate(-50%,-50%);

z-index:-1;

transition:left .08s linear,
top .08s linear;

}

.fill{

transition:width 1.2s ease;

}

.nav-links a.active{

color:white;

}

`;

document.head.appendChild(style);

/* ======================================================
   MOBILE MENU
====================================================== */

const menuBtn = document.getElementById("menu-btn");

const nav = document.querySelector(".nav-links");

menuBtn.onclick = () => {

    nav.classList.toggle("open");

};

// Tab switcher
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.interview-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

