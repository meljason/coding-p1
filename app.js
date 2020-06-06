//pagination
// const listCardEmployees = document.getElementById("cards");
// const paginationElement = document.getElementById("pagination");

// let currentPage = 1;
// let rows = 3;

// function DisplayElements(items, wrapper, rows_per_page, page) {
//   wrapper.innerHTML = "";
//   page--;

//   let loopStart = rows_per_page * page;
//   let paginatedItems = items.slice(loopStart, loopStart+ rows_per_page);
//   console.log(paginatedItems);
//   for(let i = loopStart; i < loopStart + rows_per_page; i++) {

//   }
// }


// DisplayElements(list)
const employeeURL =
  "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
const employeeImageURL =
  "http://sandbox.bittsdevelopment.com/code1/employeepics/";
const employeeRolesURL =
  "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";

//query selectors
const employeeListSelector = document.querySelector(".cards");

//filter search------------------------------------------------------------------
let filterInput = document.getElementById("filter-input");
filterInput.addEventListener("keyup", filterEmployees);

function filterEmployees() {
  //getting the value of the input
  let filterValue = document.getElementById("filter-input").value.toUpperCase();
  
  //getting employee items
  let employeeContent = employeeListSelector.querySelectorAll('div.card-content');

  console.log(employeeContent);

  //loop through emp-name
  for(let i = 0; i < employeeListSelector.length; i++) {
    let nameTag = employeeContent[i].getElementsByTagName('h2')[0];

    if(nameTag[i].innerHTML.indexOf(filterValue) > -1) {
      employeeContent.style.display = '';
    } else {
      employeeContent.style.display = 'none';
    }
  }
}

//-------------------------------------------------------------------------------

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
}

getEmployeeList();
