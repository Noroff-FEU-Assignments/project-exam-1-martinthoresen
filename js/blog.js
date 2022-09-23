const url = "https://healthandfitness.flowerpower12394.one//wp-json/wp/v2/posts";
const blogContainer = document.querySelector(".blogs-container");
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

async function getBlogs() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const blogs = result;

    console.log(blogs);

    blogContainer.innerHTML = "";

    for (let i = 0; i < blogs.length; i++) {
      function createHtml(blogs) {
        blogContainer.innerHTML += `<div class="blog">
                                        <p>09.09.2022, Robert Thompson</p>
                                        <img src="${blogs[i].better_featured_image.source_url}">
                                        <h2>${blogs[i].title.rendered}</h2>
                                        <p>${blogs[i].excerpt.rendered}</p>
                                        <a href="blog-post.html?id=${blogs[i].id}">Read</a>
                                        </div>`;
      }

      createHtml(blogs);
    }
  } catch (error) {
    console.log(error);
    const errorMsg = createMessage("error", "An error occured while loading the blog posts...");
    blogContainer.innerHTML = errorMsg;
  }
}
getBlogs();

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});
