import "../style/style.scss";
import html2canvas from "html2canvas";

const readyfilters = document.querySelector(".readyfilters__items");
const photocomparer = document.querySelector(".photocomparer");
const photoseparator = document.querySelector(".photocomparer__separator");
const photoInput = document.querySelector(".photomaker__upload-input");
const photoMakerContaineer = document.querySelector(".photomaker__preload");
const photoOriginContainer = document.querySelector(
  ".photocomparer__origin-photo"
);
const photoModifiedContainer = document.querySelector(
  ".photocomparer__modified-photo"
);
const photoCanvas = document.querySelector(".photomaker__canvas");
const photoCanvasCtx = photoCanvas.getContext("2d");
const userFilters = document.querySelectorAll(".photoeditor__userf");
const userFiltersContainer = document.querySelector(".userfilters__inputs");
const readyFitersContainer = document.querySelector(".readyfilters__items");
const photoMakerDownload = document.querySelector(".photomaker__dowload");
let isMove = false;
let isMobile = {
  Android: function () {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
      return (
              isMobile.Android()
              || isMobile.BlackBerry()
              || isMobile.iOS()
              || isMobile.Opera()
              || isMobile.Windows()
              );
  }
};


document.addEventListener("click", (e) => {
  let targetEl = e.target;
  if (targetEl.closest(".readyfilters__navigation-left")) {
    readyfilters.scrollBy(-105, 0);
  }
  if (targetEl.closest(".readyfilters__navigation-right")) {
    readyfilters.scrollBy(105, 0);
  }
  if (targetEl.closest(".photomaker__save-btn")) {
    let filter = getComputedStyle(photoMakerContaineer).filter;
    let photo = document.querySelector(".photomaker__preload img");
    if (photo) {
      html2canvas(photoMakerContaineer).then(canvas => {
        photo.src = canvas.toDataURL()
        photo.onload = () => {
          photoCanvas.width = photo.naturalWidth;
          photoCanvas.height = photo.naturalHeight;
          photoCanvasCtx.filter = filter;
          photoCanvasCtx.drawImage(photo, 0, 0);
          photoMakerDownload.href = photoCanvas.toDataURL();
          photoMakerDownload.classList.remove("disabled-link");
        }
      });
    }
  }
  if (
    targetEl.closest(".header__mobile") ||
    targetEl.closest(".header__nav-link")
  ) {
    document.querySelector(".header__mobile").classList.toggle("active-mobile");
    document
      .querySelector(".header__nav-list")
      .classList.toggle("active-mobile");
  }
});

photoseparator.addEventListener("mousedown", () => {
  isMove = true;
});
photoseparator.addEventListener("mouseup", () => {
  isMove = false;
});
photoseparator.addEventListener("touchstart", () => {
  isMove = true;
});
photoseparator.addEventListener("touchend", () => {
  isMove = false;
});
photocomparer.addEventListener("mousemove", movePhoto);
photocomparer.addEventListener("touchmove", movePhoto);
function movePhoto(e) {
  if (isMove) {
    e.preventDefault()
    const modifiedPhoto = document.querySelector(
      ".photocomparer__modified-photo"
    );
    let left = e.pageX - photocomparer.getBoundingClientRect().left;
    if (isMobile.any()) {
      left = e.touches[0].pageX - photocomparer.getBoundingClientRect().left;
    }
    if (left > 0 && left < photocomparer.offsetWidth) {
      modifiedPhoto.style.width = left + "px";
      photoseparator.style.left = left + "px";
    }
  }
}


const photomakerText = document.querySelector('.photomaker__text')
let isTextMove = false
photomakerText.addEventListener("mousedown", () => {
  console.log('stars')
  isTextMove = true;
});
photomakerText.addEventListener("mouseup", () => {
  isTextMove = false;
});
photomakerText.addEventListener("touchstart", () => {
  isTextMove = true;
});
photomakerText.addEventListener("touchend", () => {
  isTextMove = false;
});
photoMakerContaineer.addEventListener("mousemove", moveText);
photoMakerContaineer.addEventListener("touchmove", moveText);
function moveText(e) {

  if (isTextMove) {
    e.preventDefault()
    let left = e.pageX - photoMakerContaineer.getBoundingClientRect().left;
    let top = e.pageY - photoMakerContaineer.getBoundingClientRect().top;
    if (isMobile.any()) {
      left = e.touches[0].pageX - photoMakerContaineer.getBoundingClientRect().left;
      top = e.touches[0].pageY - photoMakerContaineer.getBoundingClientRect().top;
    }
    if (left > 0 && left < photoMakerContaineer.offsetWidth && top > 0 && top < photoMakerContaineer.offsetHeight - 20) {
      photomakerText.style.left = left + "px";
      photomakerText.style.top = top + "px";
    }
    console.log(left)
  }
}


photoInput.addEventListener("change", function () {
  if (this.files) {
    let file = this.files[0];
    if (file.type.match(/image.*/)) {
      photoMakerContaineer.innerHTML = "";
      photoOriginContainer.innerHTML = "";
      photoModifiedContainer.innerHTML = "";
      let filereader = new FileReader();
      filereader.onload = function () {
        let photo = new Image();
        photo.src = filereader.result;
        let photoOrigin = photo.cloneNode(true);
        let photoModified = photo.cloneNode(true);
        photoMakerContaineer.append(photo);
        photoOriginContainer.append(photoOrigin);
        photoModifiedContainer.append(photoModified);
        photocomparer.style.minHeight = "fit-content";
        photo.onload = function () {
          photoCanvas.width = this.naturalWidth;
          photoCanvas.height = this.naturalHeight;
        };
      };
      filereader.readAsDataURL(file);
    }
  }
});
userFiltersContainer.addEventListener("input", (e) => {
  if (e.target.closest(".photoeditor__userf")) {
    let filter = Array.from(userFilters)
      .map((item) => {
        if (item.name === "blur") {
          return `${item.name}(${item.value}px)`;
        } else {
          return `${item.name}(${item.value}%)`;
        }
      })
      .join(" ");
    photoMakerContaineer.style.filter = filter;
    photoModifiedContainer.style.filter = filter;
    photoMakerDownload.classList.add("disabled-link");
  }
});
readyFitersContainer.addEventListener("click", (e) => {
  let targetEl = e.target;
  if (targetEl.closest(".readyfilter__btn")) {
    let filter = getComputedStyle(targetEl).filter;
    photoMakerContaineer.style.filter = filter;
    photoModifiedContainer.style.filter = filter;
    photoMakerDownload.classList.add("disabled-link");
  }
});

//paint
const paintCavas = document.querySelector(".paint__canvas");
const paintCtx = paintCavas.getContext("2d");
const paintBody = document.querySelector(".paint__body");
const paintDownload = document.querySelector(".paint__download");
const paintColor = document.querySelector(".paint__color");
const paintEraiser = document.querySelector(".paint__eraiser");
paintDownload.href = paintCavas.toDataURL();
let isDrawing = false;
window.onload = function () {
  paintCavas.width = paintBody.offsetWidth;
};
paintBody.addEventListener("click", (e) => {
  if (e.target.closest(".paint__clear")) {
    paintCtx.clearRect(0, 0, paintCavas.width, paintCavas.height);
  }
});
paintBody.addEventListener("change", (e) => {
  if (e.target.closest(".paint__fill")) {
    paintCtx.fillStyle = e.target.value;
    paintCtx.fillRect(0, 0, paintCavas.width, paintCavas.height);
  }
  if (e.target.closest(".paint__width")) {
    paintCtx.lineWidth = e.target.value;
  }
  if (e.target.closest(".paint__color")) {
    if (paintEraiser.checked) {
      paintCtx.strokeStyle = "white";
    } else {
      paintCtx.strokeStyle = paintColor.value;
    }
  }
  if (e.target.closest(".paint__eraiser")) {
    if (e.target.checked) {
      paintCtx.strokeStyle = "white";
    } else {
      paintCtx.strokeStyle = paintColor.value;
    }
  }
});
function startDrawing(e) {
  isDrawing = true;
  paintCtx.beginPath();
  let coordsX = e.pageX - paintCavas.offsetLeft
  let coordsY = e.pageY - paintCavas.offsetTop
  if (isMobile.any()) {
    coordsX = e.touches[0].pageX - paintCavas.offsetLeft
    coordsY = e.touches[0].pageY - paintCavas.offsetTop
  }
  paintCtx.moveTo(
    coordsX,
    coordsY
  );
}
function draw(e) {
  e.preventDefault();

  if (isDrawing === true) {
    let coordsX = e.pageX - paintCavas.offsetLeft;
    let coordsY = e.pageY - paintCavas.offsetTop;
    if (isMobile.any()) {
      coordsX = e.touches[0].pageX - paintCavas.offsetLeft
      coordsY = e.touches[0].pageY - paintCavas.offsetTop
    }
    paintCtx.lineTo(coordsX, coordsY);
    paintCtx.stroke();
  }
}
function stopDrawing() {
  isDrawing = false;
  paintDownload.href = paintCavas.toDataURL();
}
paintCavas.onmousedown = startDrawing;
paintCavas.onmouseup = stopDrawing;
paintCavas.onmouseout = stopDrawing;
paintCavas.onmousemove = draw;

paintCavas.ontouchstart = startDrawing;
paintCavas.ontouchend = stopDrawing;
paintCavas.ontouchcancel = stopDrawing;
paintCavas.ontouchmove = draw;

//lang toggler
const langElements = document.querySelectorAll(".multilang");
const langToggler = document.querySelector(".header__lang-checkbox");

langToggler.addEventListener("change", togglelang);

function togglelang() {
  langElements.forEach((item) => {
    if (langToggler.checked) {
      item.innerText = item.dataset.eng;
      localStorage.setItem("photolang", "eng");
    } else {
      item.innerText = item.dataset.ru;
      localStorage.setItem("photolang", "ru");
    }
  });
}

if (localStorage.getItem("photolang")) {
  langToggler.checked = localStorage.getItem("photolang") === "eng";
  togglelang();
}



const gradientBtn = document.querySelector('.create-grdient')
gradientBtn.addEventListener('click', () => {
  let photo = document.querySelector(".photomaker__preload img");
  if (!photo) {
    return
  }
  let gradientAngle = 0
  let firstColorPercent = 0
  let secondColorPercent = 0
  let  gradientColor = 'black'
  const degShadow = document.querySelector('.deg-shadow')
  degShadow.classList.toggle('hidden')
  let gradientBlock = document.querySelector('.photomaker__gradient')
  if (!gradientBlock) {
    gradientBlock = document.createElement('div')
    gradientBlock.classList.add('photomaker__gradient')
    photoMakerContaineer.append(gradientBlock)
    gradientBlock.style.background = `linear-gradient(${gradientAngle}deg, ${gradientColor} ${firstColorPercent}% , transparent ${secondColorPercent}%)`
  }
  degShadow.addEventListener('input', (e) => {
    const targetEl = e.target
    if(targetEl.closest('.deg-shadow__round')) {
      gradientAngle = targetEl.value
    }
    if(targetEl.closest('.deg-shadow__size-first')) {
      firstColorPercent = targetEl.value
    }
    if(targetEl.closest('.deg-shadow__size-second')) {
      secondColorPercent = targetEl.value
    }
    if(targetEl.closest('.deg-shadow__color')) {
      gradientColor = targetEl.value
    }
    gradientBlock.style.background = `linear-gradient(${gradientAngle}deg, ${gradientColor} ${firstColorPercent}% , transparent ${secondColorPercent}%)`
  })
    }
)


const createTextBtn = document.querySelector('.create-text')
createTextBtn.addEventListener('click', () => {
  const textCreator = document.querySelector('.text-creator')
  textCreator.classList.toggle('hidden')
  let textnum
})

