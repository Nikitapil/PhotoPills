import "../style/style.scss";

const readyfilters = document.querySelector(".readyfilters__items");
const photocomparer = document.querySelector(".photocomparer");
const photoseparator = document.querySelector(".photocomparer__separator");
const photoInput = document.querySelector('.photomaker__upload-input')
const photoMakerContaineer = document.querySelector('.photomaker__preload')
const photoOriginContainer = document.querySelector('.photocomparer__origin-photo')
const photoModifiedContainer = document.querySelector('.photocomparer__modified-photo')
const photoCanvas = document.querySelector('.photomaker__canvas')
let isMove = false;
document.addEventListener("click", (e) => {
  let targetEl = e.target;
  if (targetEl.closest(".readyfilters__navigation-left")) {
    readyfilters.scrollBy(-105, 0);
  }
  if (targetEl.closest(".readyfilters__navigation-right")) {
    readyfilters.scrollBy(105, 0);
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
    console.log(left);
    photoseparator.style.left = left + "px";
  }
}

photoInput.addEventListener('change', function() {
    if (this.files) {
        let file = this.files[0]
        if (file.type.match(/image.*/)) {
            photoMakerContaineer.innerHTML = ''
            photoOriginContainer.innerHTML = ''
            photoModifiedContainer.innerHTML = ''
            let filereader = new FileReader()
            filereader.onload = function () {
                let photo = new Image()
                photo.src = filereader.result
                let photoOrigin = photo.cloneNode(true)
                let photoModified = photo.cloneNode(true)
                photoMakerContaineer.append(photo)
                photoOriginContainer.append(photoOrigin)
                photoModifiedContainer.append(photoModified)
                photocomparer.style.minHeight = 'fit-content'
                photo.onload = function () {
                    photoCanvas.width = this.naturalWidth;
                    photoCanvas.height = this.naturalHeight; 
                }
            }
            filereader.readAsDataURL(file);
        }
    }
})
