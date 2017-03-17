<!--W3C Optimized-->
<div class="wrapper">
  <div class="masonry-image">
    <?php 
          // Random Image Selector
        $imageSelection = array("https://source.unsplash.com/random/480x300", "https://source.unsplash.com/random/480x360", "https://source.unsplash.com/random/480x600","https://source.unsplash.com/random/480x320", "https://source.unsplash.com/random/480x340");

        for($i = 1; $i<= 13; $i++) : 
        $randomImage = rand(0,(count($imageSelection)) -1);
    ?>
        <a href="#" class="img-item">
          <img src="<?php echo $imageSelection[$randomImage]; ?>" alt="image <?php echo $i?>">
        </a>
    <?php 
        endfor;
    ?>
    </div>
  </div>
