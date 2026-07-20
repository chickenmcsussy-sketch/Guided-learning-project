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
   ENGINEERING PRINCIPLES ACCORDION
====================================================== */

document.querySelectorAll(".accordion-header").forEach(header => {

    header.addEventListener("click", () => {

        const item = header.parentElement;
        const body = header.nextElementSibling;
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".accordion-item").forEach(other => {
            other.classList.remove("open");
            other.querySelector(".accordion-body").style.maxHeight = null;
        });

        if (!isOpen) {
            item.classList.add("open");
            body.style.maxHeight = body.scrollHeight + "px";
        }

    });

});

/* ======================================================
   HARDWARE POPUP
====================================================== */

const hardwareData = {
    cpu: {
        title: "Central Processing Unit",
        purpose: "Executes instructions and controls every operation the computer performs.",
        fact: "In the 1990s, processors took far longer to run the same calculations they now finish almost instantly — CPU speed has compounded for decades.",
        insight: "Mr Kannan compared it to a brain: without it, a computer is like a vegetable. The CPU is what lets stored data actually get processed and turned into signals.",
        reflection: "I used to think of the CPU as just \"the fast part.\" His analogy made it click that it's the decision-maker, not just a calculator."
    },
    ram: {
        title: "Random Access Memory",
        purpose: "Holds the data that actively running programs need right now.",
        fact: "RAM sizes have jumped from megabytes to gigabytes largely because AI workloads demand far more working memory than older software.",
        insight: "He explained it as short-term memory: a program sits on the hard disk, and when you open it, its data loads into RAM to be processed before being sent to the GPU.",
        reflection: "This reframed RAM for me — it's not extra storage, it's the workspace the CPU actually thinks in."
    },
    motherboard: {
        title: "Motherboard",
        purpose: "Connects every component and carries the signals between them.",
        fact: "A motherboard failure can look identical to a CPU or RAM failure, since it's the layer everything else depends on.",
        insight: "Mr Kannan's analogy: if the CPU is the brain, the motherboard is the nervous system — the pathway every signal in the body has to travel through.",
        reflection: "It explained why troubleshooting always starts at the motherboard: if the pathway is broken, nothing downstream matters."
    },
    storage: {
        title: "Storage",
        purpose: "Holds the operating system, applications and files even when the computer is off.",
        fact: "The shift from hard disks to SSDs has cut down data-recovery cases significantly, since SSDs fail differently and backups are now standard.",
        insight: "In his troubleshooting process, storage is checked only after power, motherboard indicators and beep codes — it's a later step, not a first guess.",
        reflection: "I'd assumed storage issues were the first thing to check. Seeing the actual order of operations corrected that."
    },
    gpu: {
        title: "Graphics Card",
        purpose: "Processes graphics and accelerates heavy parallel computation.",
        fact: "GPUs were once needed only for small tasks; AI workloads have made them one of the most demanded components in the industry.",
        insight: "He expects GPU and RAM demand to stay at their peak for the next 3-5 years as AI scales, before the curve shifts toward quantum computing.",
        reflection: "This connected a component I associated with gaming to a much bigger industry trend I hadn't considered."
    },
    psu: {
        title: "Power Supply",
        purpose: "Converts AC mains power into stable DC voltage for every component.",
        fact: "In his standard troubleshooting procedure for a computer that won't boot, the power supply is the very first thing checked.",
        insight: "Before motherboard indicators, beep codes, or storage — power comes first. If the PSU isn't stable, nothing else can be diagnosed accurately.",
        reflection: "It's the least glamorous component but the one every other check depends on."
    }
};

const hwModal = document.getElementById("hardware-modal");
const hwClose = document.getElementById("hardware-modal-close");

document.querySelectorAll(".hardware-card").forEach(card => {

    card.addEventListener("click", () => {

        const data = hardwareData[card.dataset.part];

        if (!data || !hwModal) return;

        document.getElementById("hw-title").textContent = data.title;
        document.getElementById("hw-purpose").textContent = data.purpose;
        document.getElementById("hw-fact").textContent = data.fact;
        document.getElementById("hw-insight").textContent = data.insight;
        document.getElementById("hw-reflection").textContent = data.reflection;

        hwModal.classList.add("open");

    });

});

if (hwClose) hwClose.onclick = () => hwModal.classList.remove("open");

if (hwModal) hwModal.addEventListener("click", e => {
    if (e.target === hwModal) hwModal.classList.remove("open");
});

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