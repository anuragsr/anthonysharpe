const l = console.log.bind(window.console)
, loadingScreen = document.querySelector('.loading-screen')

// Function to add the page transition screen
, pageTransitionIn = () => {
  return gsap
    // .timeline()
    // .set(loadingScreen, { transformOrigin: 'bottom left'})
    // .to(loadingScreen, { duration: .5, scaleY: 1 })
    .to(loadingScreen, { duration: .5, scaleY: 1, transformOrigin: 'bottom left' })
}
// Function to remove the page transition screen
, pageTransitionOut = next => {
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline({ delay: 1 }) // More readable to put it here
    .add('start') // Use a label to sync screen and content animation
    .to(loadingScreen, {
      duration: 0.5,
      scaleY: 0,
      skewX: 0,
      transformOrigin: 'top left',
      ease: 'power1.out'
    }, 'start')
    .call(contentAnimation, [next], 'start')
}
// Function to animate the content of each page
, contentAnimation = next => {
  const { container, namespace } = next

  // Query from container
  $(container.querySelector('.green-heading-bg')).addClass('show')  
  gsap
  .timeline()
  .from(container.querySelector('.is-animated'), {
    duration: 0.5,
    translateY: 10,
    opacity: 0,
    stagger: 0.4
  })
  
  switch(namespace){
    case 'work': break;
    case 'contact': break;
    
    default: // home
      // Play home video
      container.querySelector('video').play()

      // Create and play ticker
      const $tickerWrapper = $(".tickerwrapper")
      , $list = $tickerWrapper.find("ul.list")
      , $clonedList = $list.clone()
      , infinite = gsap.timeline({ repeat: -1, paused: true })
      , time = 50
      
      let listWidth = 10
      $list.find("li").each(function (i) { listWidth += $(this, i).outerWidth(true) })

      const endPos = $tickerWrapper.width() - listWidth
      $list.add($clonedList).css({ "width": listWidth + "px" })
      $clonedList.addClass("cloned").appendTo($tickerWrapper)

      infinite
      .fromTo($list, time, { rotation: 0.01, x: 0 }, { force3D: true, x: -listWidth, ease: Linear.easeNone }, 0)
      .fromTo($clonedList, time, { rotation: 0.01, x: listWidth }, { force3D: true, x: 0, ease: Linear.easeNone }, 0)
      .set($list, { force3D: true, rotation: 0.01, x: listWidth })
      .to($clonedList, time, { force3D: true, rotation: 0.01, x: -listWidth, ease: Linear.easeNone }, time)
      .to($list, time, { force3D: true, rotation: 0.01, x: 0, ease: Linear.easeNone }, time)
      .progress(1).progress(0)
      .play()

      // //Pause/Play		
      // $tickerWrapper.on("mouseenter", function () {
      //   infinite.pause();
      // }).on("mouseleave", function () {
      //   infinite.play();
      // });
    break;
  }

}

$(() => {
  // Prevent page change for same url
  $(document).on('click', 'a[href]', e => {
    if (e.currentTarget.href === window.location.href) {
      e.preventDefault()
      e.stopPropagation()
    }
  })

  // Init barba with options
  barba.init({
    transitions: [{
      async leave({ current, next }) {
        // l("leave", current, next)
        l("leave", current.namespace)
        await pageTransitionIn()
        current.container.remove()
      },
      enter: ({ current, next }) => {
        // l("enter", current, next)
        l("enter", next.namespace)
        pageTransitionOut(next)
      },
      once: ({ current, next }) => {
        // l("once", current, next)
        l("once", next.namespace)
        WebFont.load({
          google: { families: ['Lato:300,400,500,600', 'Poppins:100,300,400,500,600,700'] } // Add more here
          , active: function () {
            l("Webfonts loaded")
            pageTransitionOut(next)
          }
        })
        // contentAnimation(next.container)
      },
    }]
  })
})
