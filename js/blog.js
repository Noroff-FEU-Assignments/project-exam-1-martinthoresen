/* HAMBURGER MENU */
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

/* API FETCH*/
const blogContainer = document.querySelector(".blogs-container");
const loadMore = document.querySelector(".view-more-btn");
const loader = document.querySelector(".loader");
let currentPage = 0;

async function getBlogs() {
  currentPage++;
  const url = `https://healthandfitness.flowerpower12394.one//wp-json/wp/v2/posts?per_page=10&page=${currentPage}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    const blogs = result;
    const maxPages = response.headers.get("x-wp-totalpages");
    if (Number(maxPages) === currentPage) {
      loadMore.style.display = "none";
    }
    loader.style.display = "none";

    for (let i = 0; i < blogs.length; i++) {
      function createHtml(blogs) {
        blogContainer.innerHTML += `<div class="blog">
        <a href ="blog-post.html?slug=${blogs[i].slug}">
                                        <p>09.09.2022, Robert Thompson</p>
                                        <img src="${blogs[i].better_featured_image.source_url}" alt="${blogs[i].better_featured_image.alt_text}">
                                        <h2>${blogs[i].title.rendered}</h2>
                                        <p>${blogs[i].excerpt.rendered}</p>
                                        <p class="link-style">Read</p>
                                        </a>
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

loadMore.addEventListener("click", getBlogs);
