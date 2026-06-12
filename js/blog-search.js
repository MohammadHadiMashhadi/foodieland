document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    const blogItems = document.querySelectorAll(".blog-item");


    if (localStorage.getItem("blogDatabase") === null) {

        const articles = [];

        blogItems.forEach(function (item, index) {

            const title =
                item.querySelector(".title").textContent.trim();

            const description =
                item.querySelector(".description").textContent.trim();

            const author =
                item.querySelector(".blog-item-details h5").textContent.trim();

            articles.push({
                id: index + 1,
                title: title,
                description: description,
                author: author
            });

        });

        localStorage.setItem(
            "blogDatabase",
            JSON.stringify(articles)
        );
    }

    const savedSearch =
        localStorage.getItem("blogSearch");

    if (savedSearch !== null) {

        searchInput.value = savedSearch;

        searchPosts(savedSearch);
    }

    searchBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const keyword =
            searchInput.value.trim();

        localStorage.setItem(
            "blogSearch",
            keyword
        );

        searchPosts(keyword);

    });


    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const keyword =
                searchInput.value.trim();

            localStorage.setItem(
                "blogSearch",
                keyword
            );

            searchPosts(keyword);
        }

    });


    function searchPosts(keyword) {

        const database =
            JSON.parse(
                localStorage.getItem("blogDatabase")
            );

        const searchText =
            keyword.toLowerCase();

        blogItems.forEach(function (item) {

            item.style.display = "none";

        });


        const results = database.filter(function (article) {

            return (
                article.title.toLowerCase().includes(searchText) ||
                article.description.toLowerCase().includes(searchText) ||
                article.author.toLowerCase().includes(searchText)
            );

        });


        results.forEach(function (result) {

            blogItems.forEach(function (item) {

                const title =
                    item.querySelector(".title")
                        .textContent
                        .trim();

                if (title === result.title) {

                    item.style.display = "flex";

                }

            });

        });

    }

});