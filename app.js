// DisplayElements(list)
const employeeURL =
  "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
const employeeImageURL =
  "http://sandbox.bittsdevelopment.com/code1/employeepics/";
const employeeRolesURL =
  "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";

//query selectors
const employeeListSelector = document.querySelector(".cards");

async function getEmployeeList() {
  //employee list fetch
  const employeeListResponse = await fetch(employeeURL);
  const employeeListJson = await employeeListResponse.json();

  //employee role fetch
  const employeeRoleResponse = await fetch(employeeRolesURL);
  const employeeRoleJson = await employeeRoleResponse.json();

  var employeeListArray = [];

  for (var i in employeeListJson)
    employeeListArray.push([i, employeeListJson[i]]);

  employeeListArray.forEach((employeeItem) => {
    function roles() {
      var values = [];
      for (var j = 0; j < employeeListJson[employeeItem[0]].roles.length; j++) {
        values.push(
          '<p style="background-color:' +
            employeeListJson[employeeItem[0]].roles[j].rolecolor +
            '">' +
            employeeListJson[employeeItem[0]].roles[j].rolename +
            "</p>"
        );
      }
      return values.join("");
    }

    function crown() {
      var crown = "👑";

      if (employeeListJson[employeeItem[0]].employeeisfeatured == 1) {
        return crown;
      } else {
        return "";
      }
    }

    employeeListSelector.innerHTML += `
    <div class="card">
      <p class="crown">${crown()}</p>
      <img
        src="${employeeImageURL + employeeItem[0] + ".jpg"}"
        alt="Employee Profile Picture"
        class="card-img"
      />
      <div class="card-content">
        <h2 class="emp-name">${
          employeeListJson[employeeItem[0]].employeefname +
          " " +
          employeeListJson[employeeItem[0]].employeelname
        }</h2>
        <p class="emp-bio" id="emp-bio">
          ${employeeListJson[employeeItem[0]].employeebio}
        </p>
        <div class="tags" id="tags">
          ${roles()}
        </div>
      </div>
    </div>
    `;
  });

  //search
  document.getElementById("filter-input").onkeyup = function () {
    var matcher = new RegExp(
      document.getElementById("filter-input").value,
      "gi"
    );

    for (var i = 0; i < document.getElementsByClassName("card").length; i++) {
      if (
        matcher.test(
          document.getElementsByClassName("emp-name")[i].innerHTML
        ) ||
        matcher.test(document.getElementsByClassName("tags")[i].innerHTML)
      ) {
        document.getElementsByClassName("card")[i].style.display =
          "inline-block";
      } else {
        document.getElementsByClassName("card")[i].style.display = "none";
      }
    }
  };

  //pagination
  const listEmployee = document.getElementById("cards");
  const paginationElement = document.getElementById("pagination");
  const cardEmployee = document.getElementsByClassName("card");

  const arrayCardEmployee = Array.prototype.slice.call(cardEmployee);

  let currentPage = 1;
  let employeeItems = 3;

  async function DisplayList(items, wrapper, cardsPerPage, page) {
    wrapper.innerHTML = "";
    page--;

    let start = cardsPerPage * page;
    let end = start + cardsPerPage;
    let paginatedItems = items.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];

      let item_element = document.createElement("div");
      item_element.classList.add("item");
      item_element.innerText = item;

      wrapper.appendChild(item);
    }
  }

  function SetupPagination(items, wrapper, cardsPerPage) {
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / cardsPerPage);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = PaginationButton(i, items);
      wrapper.appendChild(btn);
    }
  }

  function PaginationButton(page, items) {
    let button = document.createElement("button");
    button.innerText = page;

    console.log(button);

    if (currentPage == page) button.classList.add("active");

    button.addEventListener("click", function () {
      currentPage = page;
      DisplayList(arrayCardEmployee, listEmployee, employeeItems, currentPage);

      let currentBtn = document.querySelector(".pagination button.active");
      currentBtn.classList.remove("active");

      button.classList.add("active");
    });

    return button;
  }
  DisplayList(arrayCardEmployee, listEmployee, employeeItems, currentPage);
  SetupPagination(arrayCardEmployee, paginationElement, employeeItems);
}

getEmployeeList();
