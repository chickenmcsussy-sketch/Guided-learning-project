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
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.interview-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });
});

/* ======================================================
   PORTFOLIO V3 ADDITIONS - PART 1
====================================================== */

/* ===============================
   BOOT SCREEN
================================ */

window.addEventListener("load", () => {

    const boot = document.getElementById("boot-screen");

    if (!boot) return;

    const messages = [
        "Loading Portfolio...",
        "Initialising Hardware Database...",
        "Loading Research Materials...",
        "Preparing Interface...",
        "Welcome!"
    ];

    const text = document.getElementById("boot-text");

    let index = 0;

    const interval = setInterval(() => {

        if (text && index < messages.length) {

            text.textContent = messages[index];

            index++;

        }

    }, 650);

    setTimeout(() => {

        clearInterval(interval);

        boot.style.opacity = "0";

        setTimeout(() => {

            boot.remove();

        }, 900);

    }, 3600);

});

/* ===============================
   SMOOTH SCROLL
================================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", e => {

        const target = document.querySelector(
            link.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});

/* ===============================
   NAVBAR SHRINK
================================ */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.style.padding = "12px 60px";

        header.style.background =
            "rgba(5,10,20,.82)";

    }

    else {

        header.style.padding = "20px 60px";

        header.style.background =
            "rgba(5,10,20,.55)";

    }

});

/* ===============================
   PARALLAX BACKGROUND
================================ */

const board = document.querySelector(".motherboard");

window.addEventListener("mousemove", e => {

    if (!board) return;

    const x =
        (e.clientX / window.innerWidth - .5) * 20;

    const y =
        (e.clientY / window.innerHeight - .5) * 20;

    board.style.transform =
        `rotateY(${x}deg)
         rotateX(${-y}deg)`;

});

/* ===============================
   HERO CARDS
================================ */

document
.querySelectorAll(".hero-card")
.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-12px) scale(1.04)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/* ===============================
   RANDOM GLOW
================================ */

setInterval(() => {

    document
    .querySelectorAll(".hero-card")
    .forEach(card => {

        card.style.boxShadow =
            `0 0 ${20 + Math.random()*25}px
             rgba(0,212,255,.25)`;

    });

},2000);

/* ===============================
   BUTTON RIPPLE
================================ */

document
.querySelectorAll(".primary-btn,.secondary-btn")
.forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

const d=Math.max(

this.clientWidth,

this.clientHeight

);

circle.style.width=d+"px";

circle.style.height=d+"px";

circle.style.left=

e.offsetX-d/2+"px";

circle.style.top=

e.offsetY-d/2+"px";

circle.className="ripple";

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},700);

});

});

/* ===============================
   BACK TO TOP
================================ */

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topButton";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

topBtn.style.opacity=

window.scrollY>500?1:0;

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};