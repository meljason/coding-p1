// console.log("test");

"use strict";

const employeeUrl =
  "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php/";

async function getAllEmployee() {
  const response = await fetch(employeeUrl);
  const data = await response.json();

  // document.getElementById("empName").textContent = data[1].employeefname;
  // console.log(data);

  var keyEmployee = Object.keys(data);

  // console.log((data[2].roles.length));

  // console.log(keyEmployee.length);

  //   console.log(data[1].employeeisfeatured)

  console.log(data[2].roles[0].rolecolor);

  for (var i = 0; i < keyEmployee.length; i++) {
    var idCount = i + 1;

    function roles() {
      var values = [];
      for (var j = 0; j < data[idCount].roles.length; j++) {
        // console.log(data[idCount].roles[j].rolename);

        // values.push(data[idCount].roles[j].rolename);
        values.push(
          '<button class="btn" style="background-color:' +
            data[idCount].roles[j].rolecolor +
            '">' +
            data[idCount].roles[j].rolename +
            "</button>"
        );
        //   '<button class="btn" style="background-color:'+ data[idCount].roles[j].rolecolor +'">' + data[idCount].roles[j].rolename + "</button>" +
        //   '<button class="btn" style="background-color:'+ data[idCount].roles[j].rolecolor +'">' + data[idCount].roles[j].rolename + "</button>"
      }
      return values.join("");
    }

    console.log(roles());

    function btnColor() {
      var values = [];
      for (var k = 0; k < data[idCount].roles.length; k++) {
        // console.log(data[idCount].roles[k].rolecolor);
        values.push(data[idCount].roles[k].rolecolor);
      }
      return values;
    }

    //decide if the employee is featured or not
    function crown() {
      var crown = "👑";

      if (data[idCount].employeeisfeatured == 1) {
        return crown;
      } else {
        return "";
      }
    }

    //declaring card html
    let html_employee =
      '<div class="card">' +
      '<p id="crown">' +
      crown() +
      "</p>" +
      '<div class="img-container">' +
      '<img src="' +
      "http://sandbox.bittsdevelopment.com/code1/employeepics/" +
      data[idCount].employeeid +
      ".jpg" +
      '" alt="">' +
      "</div>" +
      '<p class="empName" id="empName">' +
      data[idCount].employeefname +
      " " +
      data[idCount].employeelname +
      "</p>" +
      '<p class="employeebio">' +
      data[idCount].employeebio +
      "</p>" +
      '<div class="grid-container">' +
      roles() +
      "</button>" +
      "</div>" +
      "</div>";

    document.getElementById("employee").innerHTML += html_employee;
    // document.write(html_employee);

    // console.log(i + 1);
  }
}

getAllEmployee();
