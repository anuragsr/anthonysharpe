<!doctype html>
<html class="no-js" lang="">

<head>
  <?php include 'partials/styles.php'; ?>   
  <title>PWL | Home</title>  
</head>

  <body class="js">
    <?php include 'partials/header.php'; ?>   

    <!-- Better to wrap barba container as close as possible -->
    <div class="ctn-outer" data-barba="wrapper">
      <!-- Only this section changes on link navigation -->
      <main class="ctn-home" data-barba="container" data-barba-namespace="home">
        <div class="vid-ol"></div>
        <video loop="true" autoplay="autoplay" muted>
          <source src="video/Pouring French Press Coffee.mp4" type="video/mp4" />
        </video>
        <div class="ctn-content">
          <div class="tickerwrapper">
            <ul class="list">
              <li class="listitem">
                <span>PWL <span class="stroke">/</span> </span>
              </li>
              <li class="listitem">
                <span>PWL <span class="stroke">/</span> </span>
              </li>
              <li class="listitem">
                <span>PWL <span class="stroke">/</span> </span>
              </li>
              <li class="listitem">
                <span>PWL <span class="stroke">/</span> </span>
              </li>
            </ul>
          </div>
          <h2>VIDEOS FOR BRANDS</h2>
        </div>
      </main>
    </div>
    
    <?php include 'partials/footer.php'; ?>
  </body>

  <?php include 'partials/scripts.php'; ?>

</html>
