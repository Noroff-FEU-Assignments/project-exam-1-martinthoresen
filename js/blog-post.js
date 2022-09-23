const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

const blogPostContainer = document.querySelector(".blog-post-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const slug = params.get("slug");
const url = "https://healthandfitness.flowerpower12394.one/wp-json/wp/v2/posts?slug=" + slug;

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
                                <img src="${blogPost[0].better_featured_image.source_url}">
                                <div class="social-buttons">
                                <i class="fa-brands fa-facebook-f"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-linkedin"></i>
                                </div>
                                
                                <h1 class="blog-title">${blogPost[0].title.rendered}</h1>
                                <div class="blog-excerpt">${blogPost[0].excerpt.rendered}</div>
                                <div class="blog-content">${blogPost[0].content.rendered}</div>
                                </div>
                                `;
  document.title = blogPost[0].title.rendered + " - Health & Fitness";
}
