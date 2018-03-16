//
//
// function attachScroll(anim, contentid, speed) {
//   var val = 0,
//     totalDuration = anim.totalFrames/anim.frameRate*1000;
//
//   if (contentid.addEventListener) {
//     contentid.addEventListener("mousewheel", MouseWheelHandler, false);
//     contentid.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
//   }else{
//     contentid.attachEvent("onmousewheel", MouseWheelHandler);
//   }
//
//   function MouseWheelHandler(e) {
//     var e = window.event || e;
//     var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
//     if (delta < 0) {
//       if (val < totalDuration) {
//         val += (Math.abs(delta))*speed;
//       }
//     }else {
//       if (val > 0) {
//         val -= (Math.abs(delta))*speed;
//       }
//     }
//
//     console.log("logging value", val)
//
//     bodymovin.goToAndStop(val,true);
//   }
//
//
// }

// // initialize ScrollMagic
// var controller = new ScrollMagic.Controller();
//
// // new scene
// var topScene = new ScrollMagic.Scene()
//
// function scrollPos() {
//   return controller.info("scrollPos");
// }


jQuery(function ($) {


  // bodymovin
  var animData = {
    wrapper: document.getElementById('bodymovin'),
    animType: 'svg',
    loop: false,
    prerender: true,
    autoplay: false,
    path: 'anim-data/data.json'
  };

  var anim = bodymovin.loadAnimation(animData);


  // @todo - when implementing, make sure to remove the event listener when on other routes without animation
  window.addEventListener('scroll', onScroll, false);


  function update() {
    var currentScrollY = latestKnownScrollY;
    var valueWithMultiplier = currentScrollY / 0.8;
    bodymovin.goToAndStop(~~valueWithMultiplier, false);
    ticking = false;
  }


  var latestKnownScrollY = 0,
    ticking = false;

  function onScroll() {
    latestKnownScrollY = window.scrollY;
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  update();


});

