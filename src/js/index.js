import "../style/style.scss";

const readyfilters = document.querySelector(".readyfilters__items");
const photocomparer = document.querySelector(".photocomparer");
const photoseparator = document.querySelector(".photocomparer__separator");
const photoInput = document.querySelector('.photomaker__upload-input')
const photoMakerContaineer = document.querySelector('.photomaker__preload')
const photoOriginContainer = document.querySelector('.photocomparer__origin-photo')
const photoModifiedContainer = document.querySelector('.photocomparer__modified-photo')
const photoCanvas = document.querySelector('.photomaker__canvas')
const photoCanvasCtx = photoCanvas.getContext("2d");
const userFilters = document.querySelectorAll('.photoeditor__userf')
const userFiltersContainer = document.querySelector('.userfilters__inputs')
const readyFitersContainer = document.querySelector('.readyfilters__items')
const photoMakerDownload = document.querySelector('.photomaker__dowload')
let isMove = false;
document.addEventListener("click", (e) => {
  let targetEl = e.target;
  if (targetEl.closest(".readyfilters__navigation-left")) {
    readyfilters.scrollBy(-105, 0);
  }
  if (targetEl.closest(".readyfilters__navigation-right")) {
    readyfilters.scrollBy(105, 0);
  }
  if (targetEl.closest('.photomaker__save-btn')) {
    let filter = getComputedStyle(photoMakerContaineer).filter
    let photo = document.querySelector('.photomaker__preload img')
    if (photo) {
    photoCanvasCtx.filter = filter
    photoCanvasCtx.drawImage(photo, 0, 0)
    photoMakerDownload.href = photoCanvas.toDataURL()
    photoMakerDownload.classList.remove('disabled-link')
    }
  }
  if (targetEl.closest('.header__mobile') || targetEl.closest('.header__nav-link')) {
      document.querySelector('.header__mobile').classList.toggle('active-mobile')
      document.querySelector('.header__nav-list').classList.toggle('active-mobile')
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
userFiltersContainer.addEventListener('input', (e)=> {
    if (e.target.closest('.photoeditor__userf')) {
       let filter = Array.from(userFilters).map((item)=> {
            if (item.name == 'blur') {
                return `${item.name}(${item.value}px)`
            }
            else {
                return `${item.name}(${item.value}%)`
            }
        }).join(' ')
        photoMakerContaineer.style.filter = filter
        photoModifiedContainer.style.filter = filter
        photoMakerDownload.classList.add('disabled-link')
    }
}
)
readyFitersContainer.addEventListener('click', (e)=> {
    let targetEl = e.target
    if (targetEl.closest('.readyfilter__btn')) {
        let filter = getComputedStyle(targetEl).filter
        photoMakerContaineer.style.filter = filter
        photoModifiedContainer.style.filter = filter
        photoMakerDownload.classList.add('disabled-link')
    }
})