/* HAMBURGER MENU */
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

/* API FETCH*/
const url = "https://healthandfitness.flowerpower12394.one//wp-json/wp/v2/posts?per_page=4";
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
        blogContainer.innerHTML += `<div class="latest-blogs">
                                        <a href="blog-post.html?id=${blogs[i].id}"
                                        <h2>${blogs[i].title.rendered}</h2>
                                        <img src="${blogs[i].attatchment}">
                                        <p>${blogs[i].excerpt.rendered}</p>
                                        <p>${blogs[i].author}</p>
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

let slidePosition = 1;
carousel(slidePosition);

function changeSlides(n) {
  carousel((slidePosition += n));
}

function currentSlide(n) {
  carousel((slidePosition = n));
}

function carousel(n) {
  let i;
  let blogPosts = document.getElementsByClassName("latest-blogs");
  console.log(blogPosts);
  let dots = document.getElementsByClassName("dots");

  if (n > blogPosts.length) {
    slidePosition = 1;
  }
  if (n < 1) {
    slidePosition = blogPosts.length;
  }
  for (i = 0; i < blogPosts.length; i++) {
    blogPosts[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot-active", "");
  }

  console.log(blogPosts[slidePosition - 1]);

  blogPosts[slidePosition - 1].style.display = "block";
  dots[slidePosition - 1].className += " dot-active";
}
