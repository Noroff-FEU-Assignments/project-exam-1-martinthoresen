const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

const blogPostContainer = document.querySelector(".blog-post-container");
const queryString = document.location.search;
console.log(queryString);
const params = new URLSearchParams(queryString);
console.log(params);
const id = params.get("id");
const url = "https://healthandfitness.flowerpower12394.one/wp-json/wp/v2/posts/" + id;

async function getBlogPost() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const blogPost = result;
    createHtml(blogPost);
  } catch (error) {
    console.log(error);
    const errorMsg = createMessage("error", "There was an error loading the API");
    blogPostContainer.innerHTML = errorMsg;
  }
}
getBlogPost();
function createHtml(blogPost) {
  blogPostContainer.innerHTML = `<div class="blog-post">
                                <img src="${blogPost.better_featured_image.source_url}">
                                <h2>${blogPost.title.rendered}</h2>
                                <p class="blog-excerpt">${blogPost.excerpt.rendered}</p>
                                <p>${blogPost.content.rendered}</p>
                                </div>
                                `;
  document.title = blogPost.title.rendered + " - Health & Fitness";
}
