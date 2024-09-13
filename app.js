const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function mousefollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        const minicircle = document.querySelector("#minicircle");
        if (!minicircle.classList.contains('view-button')) {
            minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
        } else {
            minicircle.style.transform = `translate(${dets.clientX - 30}px, ${dets.clientY - 30}px)`;
        }
    });
}
mousefollower();

function firstpage() {
    var tl = gsap.timeline();
    tl.from("nav", {
        y: '-10',
        opacity: 0,
        duration: 1,
        delay:0.5,
        ease: 'expo.easeIn',
        stagger: .1
    })

    tl.to(".bounding-elm", {
        y: 0,
        ease: 'expo.easeInOut',
        duration: 1,
        delay: -0.7,
        stagger: .1
    })

    tl.from("#herofooter", {
        y: '10',
        opacity: 0,
        delay: -0.5,
        duration: 1.5,
        ease: 'export.easeInOut'
    })
};

function circlechapta() {
    // define default scale values
    var xscale = 1;
    var yscale = 1;

    var xperv = 0;
    var yperv = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xperv);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yperv);

        xperv = dets.clientX;
        yperv = dets.clientY;

        mousefollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100)
    });
}

circlechapta();
firstpage();

document.querySelectorAll(".elem").forEach(function(elem) {
    elem.addEventListener("mouseleave", function(){
        gsap.to(elem.querySelector('img'), {
            opacity: 0,
            ease: 'power1'
        });
    });
    var rotata = 0;
    var diffrt = 0;
    elem.addEventListener("mousemove", function(dets) {
        var rect = elem.getBoundingClientRect();
        var x = dets.clientX - rect.left; // mouse position within the element
        var y = dets.clientY - rect.top;  // mouse position within the element

        diffrt = rotata - x;
        rotata = x;

        gsap.to(elem.querySelector('img'), {
            opacity: 1,
            ease: 'power1',
            top: y,
            left: x,
            rotate: gsap.utils.clamp(-20, 20, diffrt)
        });
    });
});

function handleHeroFooterHover() {
    const heroFooterLinks = document.querySelectorAll('#herofooter a');
    
    heroFooterLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('i');
            icon.classList.remove('ri-arrow-right-up-line');
            icon.classList.add('ri-arrow-right-line');
        });

        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('i');
            icon.classList.remove('ri-arrow-left-line');
            icon.classList.add('ri-arrow-right-up-line');
        });
    });
}

function handleSubscribeHover() {
    const subscribeText = document.querySelector('#subcribe h3');
    
    subscribeText.addEventListener('mouseenter', () => {
        const icon = subscribeText.querySelector('i');
        icon.classList.remove('ri-arrow-right-up-line');
        icon.classList.add('ri-arrow-right-line');
    });

    subscribeText.addEventListener('mouseleave', () => {
        const icon = subscribeText.querySelector('i');
        icon.classList.remove('ri-arrow-left-line');
        icon.classList.add('ri-arrow-right-up-line');
    });
}

function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');
    
    function updateTime() {
        const now = new Date();
        const options = { 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric',
            hour12: true,
            timeZoneName: 'short'
        };
        const timeString = now.toLocaleTimeString('en-US', options);
        timeElement.textContent = timeString;
    }

    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
}

function animateArrows() {
    const circles = document.querySelectorAll('#herofooter .circle');
    
    circles.forEach(circle => {
        const arrow = circle.querySelector('i');
        
        circle.addEventListener('mouseenter', () => {
            arrow.style.animation = 'none';
            setTimeout(() => {
                arrow.style.animation = 'arrowCircleY 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite';
            }, 10);
        });

        circle.addEventListener('mouseleave', () => {
            arrow.style.animation = 'none';
            arrow.style.transform = 'translateY(0)';
        });
    });
}

// Make sure to call this function
animateArrows();

// Call these functions after other initializations
handleHeroFooterHover();
handleSubscribeHover();
updateCurrentTime();

// Call this function after other initializations

