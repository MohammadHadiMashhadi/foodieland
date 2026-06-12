document.querySelectorAll(".mark-wrapper").forEach(function(wrapper) {
    wrapper.addEventListener("click", function() {
        const li = this.closest("li");
        li.querySelector(".mark").classList.add("active");
        li.querySelector(".ingredients-text").classList.add("active");
    });
});