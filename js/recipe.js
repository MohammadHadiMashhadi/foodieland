document.addEventListener("DOMContentLoaded", function(){

    const track =
        document.querySelector(".main-li-layout");

    const nextBtn =
        document.getElementById("sliderNext");

    const prevBtn =
        document.getElementById("sliderPrev");

    const items =
        Array.from(track.children);


    // تکثیر کارت ها
    items.forEach(function(item){

        track.appendChild(
            item.cloneNode(true)
        );

    });


    let currentSlide = 0;

    const itemWidth =
        items[0].offsetWidth + 40;


    nextBtn.addEventListener("click", function(){

        currentSlide++;

        if(currentSlide >= items.length){

            currentSlide = 0;

        }

        track.style.transform =
            `translateX(-${currentSlide * itemWidth}px)`;

    });


    prevBtn.addEventListener("click", function(){

        currentSlide--;

        if(currentSlide < 0){

            currentSlide =
                items.length - 1;

        }

        track.style.transform =
            `translateX(-${currentSlide * itemWidth}px)`;

    });

});