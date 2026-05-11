// variables
const ingredients_inputs = document.querySelectorAll(".mark-wrapper input")
const input_marks = document.querySelectorAll(".mark-wrapper .mark")

//methods
ingredients_inputs.forEach(function(item) {
    item.addEventListener("change", function(e) {
        let parent = this.closest("li")
        if (e.isTrusted) {
            parent.querySelector(".mark").classList.add("active")
            parent.querySelector(".ingredients-text").classList.add("active")
        }
    })
})