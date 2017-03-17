<!--https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=480&h=340-->

<div class="masonry-wrapper">

  <?php
    // Random Image Selector
    $imageSelection = array("https://placehold.it/480x300", "https://placehold.it/480x360");
    for($i = 1; $i<= 13; $i++) : 
    $randomImage = rand(0,1);
  ?>
    <a href="#" title="Post <?php echo $i; ?>">
        <article>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi rerum delectus, dolore doloribus, unde sit sunt saepe voluptates earum accusamus expedita fugit libero voluptatibus labore deleniti laboriosam quia aperiam eveniet.</p>
          <figure>
            <img src="<?php echo $imageSelection[$randomImage]; ?>" alt="image <?php echo $i?>">
            <figcaption> Post <?php echo $i; ?></figcaption>
          </figure>
        </article>
    </a>


  <?php
    endfor;
  ?>


</div>