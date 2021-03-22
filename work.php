<!doctype html>
<html>
  <head>
    <?php include 'partials/styles.php'; ?>   
    <title>PWL | Work</title>  
  </head>

  <body class="js">
    <?php include 'partials/header.php'; ?>   
    <?php include 'partials/projects.php'; ?>    

    <div class="ctn-outer" data-barba="wrapper">
      <!-- This section changes on link navigation -->
      <main class="ctn-work" data-barba="container" data-barba-namespace="work">
        <div class="content">
          <?php foreach($projects as $project){ ?>
            <article class="content__item">
              <div class="img-wrap img-wrap--content">
                <!-- <div class="img img--content" style="background-image: url(img/work/1.jpg);"></div> -->
                <div class="img img--content">
                  <div class="vid-ol"></div>
                  <video loop="true">
                    <source src="<?php echo $project['video-pr']; ?>" type="video/mp4" />
                  </video>
                </div>
              </div>
              <header class="content__item-header">
                <span class="content__item-header-meta"><?php echo $project["type"]; ?></span>
                <h2 class="content__item-header-title"><?php echo $project["name"]; ?></h2>
              </header>
              <div class="content__item-copy">
                <p class="content__item-copy-text">
                  <?php echo $project["desc"]; ?>
                </p>
                <!-- <a href="#" class="content__item-copy-more">more +</a> -->
              </div>
            </article>
          <?php } ?>                    
        </div>
        
        <div class="revealer"><div class="revealer__inner"></div></div>

        <div class="grid grid--slideshow">
          <?php foreach($projects as $key => $project){ ?>
            <figure class="grid__item grid__item--slide">
              <span class="number">0<?php echo ($key + 1); ?></span>
              <div class="img-wrap">
                <!-- <div class="img" style="background-image: url(img/work/1.gif);"></div> -->
                <video class="img" loop="true" muted>
                  <source src="<?php echo $project['video-sc']; ?>" type="video/mp4" />
                </video>
              </div>
              <figcaption class="caption"><?php echo $project["type"]; ?></figcaption>
            </figure>
          <?php } ?>

          <div class="titles-wrap">
            <div class="grid grid--titles">
              <?php foreach($projects as $project){ ?>
                <h3 class="grid__item grid__item--title"><?php echo $project["name"]; ?></h3>                
              <?php } ?>
            </div>
          </div>

          <div class="grid grid--interaction">
            <div class="grid__item grid__item--cursor grid__item--left"></div>
            <div class="grid__item grid__item--cursor grid__item--center"></div>
            <div class="grid__item grid__item--cursor grid__item--right"></div>
          </div>
        </div>
      </main>
    </div>
    
    <?php include 'partials/footer.php'; ?>
  </body>
  <?php include 'partials/scripts.php'; ?>

</html>