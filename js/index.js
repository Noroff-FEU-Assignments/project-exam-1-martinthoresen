/* HAMBURGER MENU */
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

/* API FETCH*/
const url = "https://healthandfitness.flowerpower12394.one//wp-json/wp/v2/posts?per_page=16";
const blogContainer = document.querySelector(".latest-blogs-container");

async function getBlogs() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const blogs = result;

    console.log(blogs);

    blogContainer.innerHTML = "";

    for (let i = 0; i < blogs.length; i++) {
      function createHtml(blogs) {
        blogContainer.innerHTML += `
                                        <a href="blog-post.html?slug=${blogs[i].slug}"
                                        <div class="latest-blogs fade">
                                        <h2 id="latest-blogs-h2">${blogs[i].title.rendered}</h2>
                                        <img src="${blogs[i].better_featured_image.source_url}">
                                        <p>${blogs[i].excerpt.rendered}</p>
                                        <p>Read More...</p>
                                        </div>`;
      }

      createHtml(blogs);
    }
  } catch (error) {
    console.log(error);
    const errorMsg = createMessage("error", "An error occured while loading the blog posts...");
    blogContainer.innerHTML = errorMsg;
  }
  carousel(slidePosition);
}

getBlogs();

/* CAROUSEL */

let slidePosition = 1;

function changeSlides(n) {
  carousel((slidePosition += n));
}

function currentSlide(n) {
  carousel((slidePosition = n));
}

function carousel(n) {
  let i;
  let blogPosts = document.querySelectorAll(".latest-blogs");
  console.log(blogPosts);

  if (n > blogPosts.length) {
    slidePosition = 1;
  }
  if (n < 1) {
    slidePosition = blogPosts.length;
  }
  for (i = 0; i < blogPosts.length; i++) {
    blogPosts[i].style.display = "none";
  }

  blogPosts[slidePosition - 1].style.display = "block";
}
