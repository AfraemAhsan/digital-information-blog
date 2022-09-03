console.log(" it's working");
const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayData(data.data.news_category);
    })
    .catch((err) => {
      console.log(err);
    });
};

loadData();
const displayData = (bloglists) => {
  const blogContainer = document.getElementById("blog-container");
  bloglists.forEach((blog) => {
    console.log(blog);
    const listContainer = document.createElement("div");
    listContainer.innerHTML = `
     <li class="cursor-pointer list-none float-left px-[20px] py-[20px] space-between ml-[50px] ">${blog.category_name}</li>
     `;

    blogContainer.appendChild(listContainer);
  });
};

const disPLayBlog = () => {
  const url = `https://openapi.programming-hero.com/api/news/category/01`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => ShowBlogs(data.data));
};
disPLayBlog();

const ShowBlogs = (datas) => {
  const showBlog = document.getElementById("show-blog");
  datas.forEach((data) => {
    const blogWrapper = document.createElement("div");
    blogWrapper.innerHTML = `<div class="w-[1170px] grid grid-cols-1 mx-auto my-[30px]">
      <div class="w-[244px] h-[300px]">
      <img src="${data.image_url}" class="w-full h-full object-cover">
      </div>    
      <div class="w-[886px] h-[200px] float-right ml-[280px] mt-[-250px]">
      <h1 class="font-bold text-3xl">${data.title}</h1>
      <p>${data.details}</p>
      </div>
    </div>`;

    showBlog.appendChild(blogWrapper);
    console.log(data);
  });
};
