class Human_Verification {
  constructor() {
    this.arr = [
      "https://upload.wikimedia.org/wikipedia/commons/6/63/LT_471_%28LTZ_1471%29_Arriva_London_New_Routemaster_%2819522859218%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/401_Gridlock.jpg/800px-401_Gridlock.jpg",
      "https://etimg.etb2bimg.com/photo/77874544.cms",
      "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Cycling/Articles/Back+on+Your+Bike/cyclist-carousel.jpg",
      "https://www.metrorailnews.in/wp-content/uploads/2019/08/Kochi-Metro-Rail-Trains.jpg",
    ];
    this.selectedSet = new Set();
    this.randomiseImages();
  }

  randomiseImages() {
    let suffleArr = [...this.arr];
    let N = suffleArr.length;
    for (let i = 0; i < N - 1; i++) {
      let num = i + Math.floor(Math.random() * (N - i));
      let temp = suffleArr[i];
      suffleArr[i] = suffleArr[num];
      suffleArr[num] = temp;
    }
    let elements = document.getElementsByClassName("col");
    for (let i = 0; i < N; i++) {
      elements[i].children[0].src = suffleArr[i];
    }
    elements[N].children[0].src = this.arr[Math.floor(Math.random() * N)];
  }

  selectAction(obj) {
    let elements = obj.children;
    if (this.selectedSet.size === 2 && !this.selectedSet.has(elements[0].id))
      return;

    if (elements[1].classList.contains("hidden")) {
      elements[1].classList.remove("hidden");
      this.selectedSet.add(elements[0].id);
    } else {
      elements[1].classList.add("hidden");
      this.selectedSet.delete(elements[0].id);
    }

    if (this.selectedSet.size === 2) {
      document.getElementById("verify").classList.remove("disable");
    } else {
      document.getElementById("verify").classList.add("disable");
    }

    if (this.selectedSet.size === 0) {
      document.getElementById("reset").classList.add("disable");
    } else {
      document.getElementById("reset").classList.remove("disable");
    }
  }

  verifyAction() {
    let selectedArr = Array.from(this.selectedSet);
    return (
      document.getElementById(selectedArr[0]).src ===
      document.getElementById(selectedArr[1]).src
    );
  }

  unset() {
    let colArr = document.querySelectorAll(".middle");
    colArr.forEach((element) => {
      element.classList.add("hidden");
    });
    document.getElementById("verify").classList.add("disable");
    document.getElementById("reset").classList.add("disable");
  }
}

let humanVerify;
const overlay = document.querySelector(".overlay");
const resWindow = document.querySelector(".resWindow");
const xbtn = document.querySelector(".close-button");

const initialise = function () {
  humanVerify = new Human_Verification();
};

const select = function (obj) {
  humanVerify.selectAction(obj);
};

const reset = function () {
  humanVerify.unset();
  initialise();
};

const verify = function () {
  if (humanVerify.verifyAction()) {
    document.querySelector(".resWindow h2").innerHTML =
      "You are a human. Congratulations!👍";
  } else
    document.querySelector(".resWindow h2").innerHTML =
      " We can't verify you as a human. You selected the non-identical tiles👎</br>Try again!";

  overlay.classList.remove("hidden");
  resWindow.classList.remove("hidden");
};

const closeModal = function () {
  overlay.classList.add("hidden");
  resWindow.classList.add("hidden");
  reset();
};

overlay.addEventListener("click", closeModal);
xbtn.addEventListener("click", closeModal);
