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
      <div class="w-[886px] h-[200px] float-right ml-[280px] mt-[-300px]">
      <h1 class="font-bold text-3xl">${data.title}</h1>
      <p>${data.details}</p>
      </div>
      <div class="flex flex-row justify-between space-around ml-[300px] mt-[-40px]">
      <div class="flex flex-row space-x-[15px]" >
      <img src="${data.author.img}" class="w-[40px] h-[40px] object-cover" >
      <div>
      <h5>${data.author.name}</h5>
      <span>${data.author.published_date}</span>
      </div>
    
      
      <span class=" px-[100px] flex  flex-row space-y-[20px] mt-[10px]"><img src="carbon_view.png" class="cursor-pointer mr-[15px] mt-[5px] w-[30px] h-[20px]  object-cover align-center  ">${data.total_view}</span>
      
      </div>
      
      
      </div>
    </div>`;

    showBlog.appendChild(blogWrapper);
    console.log(data);
  });
};
