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

  var anim;

  var animData = {
    wrapper: document.getElementById('lottie'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'anim-data/data.json'
  };

  anim = lottie.loadAnimation(animData);

  anim.addEventListener('DOMLoaded', function () {

    anim.setSubframe(false);
    anim.setSpeed(1.29);

    window.addEventListener('scroll', onScroll, false);
    function update() {

      var currentScrollY = latestKnownScrollY;
      var valueWithMultiplier = currentScrollY * 12.5;

      console.log({
       scrollHeightContainer,
        currentScrollY,
        totalFrames: anim.totalFrames
      });

      // kick off animation linked to scroll
      lottie.goToAndStop(currentScrollY, true);
      ticking = false;
    }


    var latestKnownScrollY = 0,
      scrollHeightContainer = 0,
      ticking = false;

    function onScroll() {
      latestKnownScrollY = window.scrollY;
      scrollHeightContainer = document.querySelector("#wrapper").scrollHeight;

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


});

