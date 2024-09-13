

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function mousefollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}
mousefollower();
;


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
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrt = rotata -dets.clientX;
        rotata = dets.clientX;

        gsap.to(elem.querySelector('img'), {
            opacity: '1',
            ease: 'power1',
            top: diff,
            left: dets.clientX,
           rotate: gsap.utils.clamp(-20, 20, diffrt)
          
        });

    
    });
});
