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
, pageTransitionOut = container => {
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
    .call(contentAnimation, [container], 'start')
}
// Function to animate the content of each page
, contentAnimation = container => {
  // Query from container
  $(container.querySelector('.green-heading-bg')).addClass('show')
  return gsap
    .timeline()
    .from(container.querySelector('.is-animated'), {
      duration: 0.5,
      translateY: 10,
      opacity: 0,
      stagger: 0.4
    })
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
        pageTransitionOut(next.container)
      },
      once: ({ current, next }) => {
        // l("once", current, next)
        l("once", next.namespace)
        WebFont.load({
          google: { families: ['Lato:300,400,500,600', 'Poppins:300,400,500,600'] } // Add more here
          , active: function () {
            l("Webfonts loaded")
            pageTransitionOut(next.container)
          }
        })
        // contentAnimation(next.container)
      },
    }]
  })
})
