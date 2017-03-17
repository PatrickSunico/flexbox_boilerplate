<!--W3C Optimized-->
<div class="wrapper">
  <div class="masonry-image">
    <?php 
          // Random Image Selector
        $imageSelection = array("https://placehold.it/480x300", "https://placehold.it/480x360", "https://placehold.it/480x600");
        for($i = 1; $i<= 13; $i++) : 
        $randomImage = rand(0,2);
    ?>
        <div class="img-item">
          <img src="<?php echo $imageSelection[$randomImage]; ?>" alt="image <?php echo $i?>">
        </div>
    <?php 
        endfor;
    ?>
    </div>
  </div>