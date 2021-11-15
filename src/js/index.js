import "../style/style.scss";

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
      photoCanvasCtx.filter = filter;
      photoCanvasCtx.drawImage(photo, 0, 0);
      photoMakerDownload.href = photoCanvas.toDataURL();
      photoMakerDownload.classList.remove("disabled-link");
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
    const modifiedPhoto = document.querySelector(
      ".photocomparer__modified-photo"
    );
    let left = e.pageX - photocomparer.getBoundingClientRect().left;
    modifiedPhoto.style.width = left + "px";
    photoseparator.style.left = left + "px";
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
        if (item.name == "blur") {
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
const paintColor = document.querySelector('.paint__color')
const paintEraiser = document.querySelector('.paint__eraiser')
paintDownload.href = paintCavas.toDataURL();
let isDrawing = false;
window.onload = function () {
  paintCavas.width = paintBody.offsetWidth;
}
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
        paintCtx.strokeStyle = 'white';
      } else {
        paintCtx.strokeStyle = paintColor.value;
      }
  }
  if (e.target.closest(".paint__eraiser")) {
    if (e.target.checked) {
        paintCtx.strokeStyle = 'white';
      } else {
        paintCtx.strokeStyle = paintColor.value;
      }
  }
});
function startDrawing(e) {
  isDrawing = true;
  paintCtx.beginPath();
  paintCtx.moveTo(
    e.pageX - paintCavas.offsetLeft,
    e.pageY - paintCavas.offsetTop
  );
}
function draw(e) {
  if (isDrawing == true) {
    let x = e.pageX - paintCavas.offsetLeft;
    let y = e.pageY - paintCavas.offsetTop;
    paintCtx.lineTo(x, y);
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

paintCavas.touchstart = startDrawing;
paintCavas.touchend = stopDrawing;
paintCavas.touchcancel = stopDrawing;
paintCavas.onmousemove = draw;
