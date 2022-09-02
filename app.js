console.log(" it's working");
const url = `https://openapi.programming-hero.com/api/news/categories`;
function loadData() {
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
}
loadData();
const displayData = (bloglists) => {
  const blogContainer = document.getElementById("blog-container");
  bloglists.forEach((blog) => {
    console.log(blog);
    const listContainer = document.createElement("div");
    listContainer.innerHTML = `
     <li class="list-none float-left px-[20px] py-[20px] space-between ml-[50px]">${blog.category_name}</li>
     `;

    blogContainer.appendChild(listContainer);
  });
};
