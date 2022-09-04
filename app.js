// // const loadData = () => {
// //   const url = `https://openapi.programming-hero.com/api/news/categories`;

// //   fetch(url)
// //     .then((res) => {
// //       return res.json();
// //     })
// //     .then((data) => {
// //       displayData(data.data.news_category);
// //     })
// //     .catch((err) => {
// //       console.log(err);
// //     });
// // };

// // loadData();
// // const displayData = (bloglists) => {
// //   const blogContainer = document.getElementById("blog-container");
// //   bloglists.forEach((category) => {
// //     console.log(category);
// //     const a = document.createElement("a");
// //     a.style.cursor = "pointer";
// //     a.style.listStyle = "none";
// //     a.style.float = "left";
// //     a.style.paddingRight = "20px";
// //     a.style.paddingLeft = "20px";
// //     a.style.paddingTop = "20px";
// //     a.style.paddingBottom = "20px";
// //     a.style.justifyContent = "center";

// //     a.style.marginLeft = "50px";

// //     a.innerHTML = `
// //      <li>${category.category_name}</li>
// //      `;
// //     a.setAttribute("id", `${category?.category_id}`);
// //     a.innerText = category?.category_name;
// //     blogContainer.appendChild(a);
// //   });
// // };

// // const disPLayBlog = () => {
// //   const url = `https://openapi.programming-hero.com/api/news/category/01`;
// //   fetch(url)
// //     .then((response) => response.json())
// //     .then((data) => ShowBlogs(data.data));
// // };
// // disPLayBlog();

// // const ShowBlogs = (datas) => {
// //   const showBlog = document.getElementById("show-blog");
// //   datas.forEach((data) => {
// //     const blogWrapper = document.createElement("div");
// //     blogWrapper.innerHTML = `<div class="w-[1170px] grid grid-cols-1 mx-auto my-[30px]">
// //       <div class="w-[244px] h-[300px]">
// //       <img src="${data.image_url}" class="w-full h-full object-cover">
// //       </div>
// //       <div class="w-[886px] h-[200px] float-right ml-[280px] mt-[-300px]">
// //       <h1 class="font-bold text-3xl">${data.title}</h1>
// //       <p>${data.details}</p>
// //       </div>
// //       <div class="flex flex-row justify-between space-around ml-[300px] mt-[-40px]">
// //       <div class="flex flex-row space-x-[15px]" >
// //       <img src="${data.author.img}" class="w-[40px] h-[40px] object-cover" >
// //       <div>
// //       <h5>${data.author.name}</h5>
// //       <span>${data.author.published_date}</span>
// //       </div>

// //       <span class=" px-[100px] flex  flex-row space-y-[20px] mt-[10px]"><img src="carbon_view.png" class="cursor-pointer mr-[15px] mt-[5px] w-[30px] h-[20px]  object-cover align-center  ">${data.total_view}</span>

// //       </div>

// //       </div>
// //     </div>`;

// //     showBlog.appendChild(blogWrapper);
// //     console.log(data);
// //   });
// // };

const newsCategory = document.getElementById("news-category");
const itemFound = document.getElementById("item-Found");
const itemFoundDiv = document.querySelector(".item-Found-Div ");
const newsShow = document.getElementById("news-Show");
const showModalInfo = document.getElementById("showModalInfo");

fetch("https://openapi.programming-hero.com/api/news/categories")
  .then((res) => res.json())
  .then((data) => {
    const newsCategoryData = data?.data?.news_category;
    newsCategoryData.forEach((category) => {
      const a = document.createElement("a");
      a.classList.add(
        "newsCategoryItem",
        "flex",
        "cursor-pointer",
        "text-[#858585]"
      );
      a.setAttribute("id", `${category?.category_id}`);
      a.innerText = category?.category_name;
      newsCategory.appendChild(a);
    });
    const newsCategoryItem = document.querySelectorAll(".newsCategoryItem");

    // showing news data for each category
    newsCategoryItem.forEach((item) =>
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const categoryName = item.innerText;
        showNewsCategoryInfo(item?.id, categoryName);
      })
    );
  })
  .catch((error) => console.log(error));

// function for getting every news data
const showNewsCategoryInfo = async (id, itemName) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${id}`
    );
    const data = await res.json();
    const newsData = data?.data;
    itemFoundDiv.style.display = "flex";
    itemFound.innerText = `${newsData?.length} items found for category ${itemName}`;

    // rendering news
    if (!data) {
      newsShow.innerHTML = `<div class="flex justify-center items-center">
      <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
        <span class="visually-hidden text-black">Loading...</span>
      </div>
    </div>`;
    } else {
      const news = newsData.map((item) => {
        return `<div
              class="w-full h-[340px] rounded-[12px] p-5 flex items-center justify-between bg-white gap-x-10"
            >
              <div class="w-[244px] h-full rounded-[10px] overflow-hidden">
                <img
                  src=${item?.thumbnail_url}
                  class="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div class="w-full h-full flex flex-col">
                <div class="w-full h-auto flex flex-col py-10">
                  <h2
                    class="w-full text-[#121221] leading-[34px] font-bold text-2xl mb-3"
                  >
                    ${item?.title}
                  </h2>
                  <div class="w-full h-[105px] text-base leading-[26px] text-[#949494] overflow-hidden text-ellipsis">
                    <p>${item?.details}</p>
                  </div>
                </div>
                <div class="w-full h-10 flex items-center justify-around">
                  <div class="w-[140px] h-full grid grid-cols-2">
                    <div class="w-10 h-10 overflow-hidden rounded-[50%]">
                      <img
                        src=${item?.author?.img}
                        class="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div class="w-max flex flex-col">
                      <h4 class="text-base leading-[19px] font-medium">
                        ${item?.author?.name}
                      </h4>
                      <span class="text-sm leading-[21px] font-medium"
                        >${new Date(
                          item?.author.published_date
                        ).toLocaleDateString("en-US")}
                      </span>
                    </div>
                  </div>
        
                  <div class="flex w-[78px] h-6 justify-between">
                    <div class="w-[25px] h-[25px] overflow-hidden">
                      <img src="carbonView.png" alt="" />
                    </div>
                    <span
                      class="text-lg leading-[22px] font-semibold text-[#515151]"
                    >
                      ${item?.total_view}
                    </span>
                  </div>
                  <button class="w-10 h-10 flex items-center justify-center showModal">
                  <a href="#showModalInfo" id=${item?._id} >
                    <img
                    src="leftArrow.png"
                    alt=""
                    class="w-full h-full object-contain"
                    />
                  </a>
                  </button>
                </div>
              </div>
            </div>`;
      });
      newsShow.innerHTML = news;
    }
    const showModal = document.querySelectorAll(".showModal");
    for (const item of showModal) {
      item.addEventListener("click", showModaInfo);
    }
  } catch (error) {
    console.log(error);
  }
};

const showModaInfo = async (e) => {
  const id = e.target.parentNode.id;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`
    );
    const data = await res.json();
    const newsData = data?.data;
    const news = newsData.map((item) => {
      if (item?.author?.name == null || !item?.author?.name) {
        return `
        <div class="modal-box">
        <h3 class="font-bold text-4xl text-center">Nothing found</h3>
          <div class="modal-action">
           <a href="#" class="btn">Close!</a>
          </div>
        </div>
        `;
      } else {
        return `
        <div class="modal-box">
        <h3 class="font-bold text-4xl">About author</h3>
          <div class="flex items-center justify-between">
             <p class="text-muted">Author name: ${item?.author?.name}</p>
              <div class="w-20 h-20 overflow-hidden rounded-[50%]">
                    <img
                    src=${item?.author?.img}
                    class="w-full h-full object-cover"
                    alt=""
                    />
              </div>
          </div>
          <div class="flex items-center justify-between">
             <p class="text-muted">Author ratings: ${item?.rating?.number}</p>
             <p class="text-muted">Badge earned: ${item?.rating?.badge}</p>
          </div>
          <div class="modal-action">
           <a href="#" class="btn">Close!</a>
          </div>
        </div>
        `;
      }
    });
    showModalInfo.innerHTML = news;
  } catch (error) {
    console.log(error);
  }
};
