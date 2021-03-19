const l = console.log.bind(window.console)
, loadingCtn = document.querySelector('.loading-container')
, loadingScreen = document.querySelector('.loading-screen')
// Function to add the page transition screen
, pageTransitionIn = () => {
  return gsap.to(loadingScreen, { duration: .5, yPercent: -10 })
}
// Function to remove the page transition screen
, pageTransitionOut = next => {

  $("body").addClass("loading")
  
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline({ delay: 1 })
    .add('start')
    .to(loadingScreen, {
      duration: .75,
      yPercent: -110,
      ease: 'power1.out',
      onComplete:() => {
        $("body").removeClass("loading")
      }
    }, 'start')
    .call(contentAnimation, [next], 'start')
}
// Function to animate the content of each page
, contentAnimation = next => {
  const { container, namespace } = next

  switch(namespace){
    case 'work': 

      // Revealer element
      revealer = new Revealer(container.querySelector('.revealer__inner'))

      // Initialize the slideshow
      new Slideshow(container.querySelector('.grid--slideshow'))
    break;

    case 'contact': 

      // Initialize grid
      grid = new Grid(container.querySelector('.grid'))
    break;

    case 'legal':
    break;
    
    default: // home

      // Home animation
      new Home(container)
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
          google: { families: ['Lato:200,300,400,500,600', 'Poppins:100,300,400,500,600,700'] } // Add more here
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
