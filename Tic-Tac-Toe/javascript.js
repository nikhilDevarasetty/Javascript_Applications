let count = 0;
let arr = [];
let player;
let flag = false;

function game(id, row, col) {
  if (arr.includes(id) || flag) return;
  arr.push(id);
  count++;

  let box = document.getElementById(id);
  box.style.backgroundColor = "LavenderBlush";
  let symbol = document.createElement("span");

  if (count % 2 !== 0) {
    player = 1;
    symbol.innerHTML = "&#10006";
    symbol.style.fontSize = "70px";
    symbol.style.color = "red";
  } else {
    player = 2;
    symbol.innerHTML = "&#x25CB;";
    symbol.style.fontSize = "120px";
    symbol.style.color = "orange";
  }
  box.appendChild(symbol);

  let rowElements = document.getElementsByClassName(row)[0].children;
  let rowCount = 0,
    colCount = 0,
    digCount = 0,
    digCount51 = 0,
    digCount52 = 0;

  for (let i = 0; i < 3; i++) {
    if (rowElements[i].children.length > 0) {
      let src1 = rowElements[i].children[0].innerHTML;
      if (src1 === symbol.innerHTML) {
        rowCount++;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    let colElement = document.getElementsByClassName(i)[0].children[col];
    if (colElement.children.length > 0) {
      let src1 = colElement.children[0].innerHTML;
      if (src1 === symbol.innerHTML) {
        colCount++;
      }
    }
  }

  if (id === "1" || id === "9") {
    for (let i = 0; i < 3; i++) {
      let element = document.getElementsByClassName(i)[0].children[i];
      if (
        element.children.length > 0 &&
        element.children[0].innerHTML === symbol.innerHTML
      )
        digCount++;
    }
  } else if (id === "7" || id === "3") {
    for (let i = 0; i < 3; i++) {
      let element = document.getElementsByClassName(i)[0].children[2 - i];
      if (
        element.children.length > 0 &&
        element.children[0].innerHTML === symbol.innerHTML
      )
        digCount++;
    }
  } else if (id === "5") {
    for (let i = 0; i < 3; i++) {
      let element1 = document.getElementsByClassName(i)[0].children[i];
      let element2 = document.getElementsByClassName(i)[0].children[2 - i];

      if (
        element1.children.length > 0 &&
        element1.children[0].innerHTML === symbol.innerHTML
      )
        digCount51++;
      if (
        element2.children.length > 0 &&
        element2.children[0].innerHTML === symbol.innerHTML
      )
        digCount52++;
    }
  }

  if (
    rowCount === 3 ||
    colCount === 3 ||
    digCount === 3 ||
    digCount51 === 3 ||
    digCount52 === 3
  ) {
    document.getElementById("res").style.visibility = "visible";
    document.querySelector("#res p").textContent =
      "Congratulations! Player" + player + " wins";
    flag = true;
  } else if (count === 9) {
    document.getElementById("res").style.visibility = "visible";
    document.querySelector("res p").textContent = "Draw!";
    flag = true;
  }
}

function reset() {
  document.getElementById("res").style.visibility = "hidden";
  flag = false;
  arr = [];
  count = 0;
  let elements = document.getElementsByClassName("col");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].children.length > 0)
      elements[i].removeChild(elements[i].childNodes[0]);
    elements[i].style.backgroundColor = "";
  }
}
