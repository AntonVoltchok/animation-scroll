//var valueWithMultiplier = currentScrollY * (anim.totalFrames / scrollHeightContainer);
//anim.addEventListener('data_ready', function(){anim.frameRate = 160});


jQuery(function ($) {

  var pass_entered;
  var password="ExoknoxbyComplex42";

  while (pass_entered!=password) {
    pass_entered=prompt("Please enter the password:",'')
  }

  self.close();
  document.body.style.display = "block";


  var mainAnim, introAnim, endAnim;

  var introLoopAnimation = {
      wrapper: document.getElementById('intro-orb-container'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'anim-data/orb-loop-intro.json'
    },

    mainAnimation = {
      wrapper: document.getElementById('main-orb-container'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'anim-data/main-animation.json'
    },

    endLoopAnimation = {
      wrapper: document.getElementById('end-orb-container'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'anim-data/end-loop-spin.json'
    };


  introAnim = lottie.loadAnimation(introLoopAnimation);
  mainAnim = lottie.loadAnimation(mainAnimation);
  endAnim = lottie.loadAnimation(endLoopAnimation);


  introAnim.addEventListener('DOMLoaded', function () {
    introAnim.play();
    introAnim.loop = true;
  });

  endAnim.addEventListener('DOMLoaded', function () {
    introAnim.play();
    endAnim.loop = true;
  });

  mainAnim.addEventListener('DOMLoaded', function () {

    window.addEventListener('scroll', onScroll, true);
    mainAnim.setSubframe(true);
    mainAnim.setSpeed(20);

    function update() {

      var currentScrollY = latestKnownScrollY;
      var introContainer = document.getElementById('intro-orb-container');
      var mainContainer = document.getElementById('main-orb-container');
      var endContainer = document.getElementById('end-orb-container');
      var scrollContainer = document.querySelector("#wrapper");


      console.log({
        introAnim, mainAnim, endAnim
      });

      var mainCurrentFrame = mainAnim.currentFrame,
        mainTotalFrames = mainAnim.totalFrames;


      console.log({mainCurrentFrame});
      console.log({mainTotalFrames});



      if (mainAnim.currentFrame < 1800 ) {
        introContainer.style.display = "none";
        mainContainer.style.display = "block";
        endContainer.style.display = "none";
        lottie.goToAndStop(currentScrollY, false);
      }

      if (currentScrollY === 0) {
        introContainer.style.display = "block";
        mainContainer.style.display = "none";
        endContainer.style.display = "none";
        introAnim.play();
        introAnim.loop = true;
      }

      if (mainAnim.currentFrame > 1800 ) {
        console.log('catching main anim current frame over 1800');
        mainContainer.style.display = "none";
        introContainer.style.display = "none";
        endContainer.style.display = "block";
        endAnim.play();
        endAnim.loop = true;
      }

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

  /*

    endAnim.addEventListener('DOMLoaded', function () {

      window.addEventListener('scroll', onScroll, true);

      function update() {

        var endContainer = document.getElementById('end-orb-container');
        var scrollContainer = document.querySelector("#wrapper");

        endAnim.loop = true;
        if (scrollContainer.offsetHeight + scrollContainer.scrollTop === scrollContainer.scrollHeight) {
          endContainer.style.display = "block";
        } else {
          endContainer.style.display = "none";
        }

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

  */


});

