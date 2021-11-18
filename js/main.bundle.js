(()=>{"use strict";const e=document.querySelector(".readyfilters__items"),t=document.querySelector(".photocomparer"),o=document.querySelector(".photocomparer__separator"),n=document.querySelector(".photomaker__upload-input"),r=document.querySelector(".photomaker__preload"),a=document.querySelector(".photocomparer__origin-photo"),i=document.querySelector(".photocomparer__modified-photo"),l=document.querySelector(".photomaker__canvas"),c=l.getContext("2d"),s=document.querySelectorAll(".photoeditor__userf"),d=document.querySelector(".userfilters__inputs"),u=document.querySelector(".readyfilters__items"),h=document.querySelector(".photomaker__dowload");let f=!1,m={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return m.Android()||m.BlackBerry()||m.iOS()||m.Opera()||m.Windows()}};function g(e){if(f){e.preventDefault();const n=document.querySelector(".photocomparer__modified-photo");let r=e.pageX-t.getBoundingClientRect().left;m.any()&&(r=changedTouches[0].pageX-t.getBoundingClientRect().left),r>0&&r<t.offsetWidth&&(n.style.width=r+"px",o.style.left=r+"px")}}document.addEventListener("click",(t=>{let o=t.target;if(o.closest(".readyfilters__navigation-left")&&e.scrollBy(-105,0),o.closest(".readyfilters__navigation-right")&&e.scrollBy(105,0),o.closest(".photomaker__save-btn")){let e=getComputedStyle(r).filter,t=document.querySelector(".photomaker__preload img");t&&(c.filter=e,c.drawImage(t,0,0),h.href=l.toDataURL(),h.classList.remove("disabled-link"))}(o.closest(".header__mobile")||o.closest(".header__nav-link"))&&(document.querySelector(".header__mobile").classList.toggle("active-mobile"),document.querySelector(".header__nav-list").classList.toggle("active-mobile"))})),o.addEventListener("mousedown",(()=>{f=!0})),o.addEventListener("mouseup",(()=>{f=!1})),o.addEventListener("touchstart",(()=>{f=!0})),o.addEventListener("touchend",(()=>{f=!1})),t.addEventListener("mousemove",g),t.addEventListener("touchmove",g),n.addEventListener("change",(function(){if(this.files){let e=this.files[0];if(e.type.match(/image.*/)){r.innerHTML="",a.innerHTML="",i.innerHTML="";let o=new FileReader;o.onload=function(){let e=new Image;e.src=o.result;let n=e.cloneNode(!0),c=e.cloneNode(!0);r.append(e),a.append(n),i.append(c),t.style.minHeight="fit-content",e.onload=function(){l.width=this.naturalWidth,l.height=this.naturalHeight}},o.readAsDataURL(e)}}})),d.addEventListener("input",(e=>{if(e.target.closest(".photoeditor__userf")){let e=Array.from(s).map((e=>"blur"==e.name?`${e.name}(${e.value}px)`:`${e.name}(${e.value}%)`)).join(" ");r.style.filter=e,i.style.filter=e,h.classList.add("disabled-link")}})),u.addEventListener("click",(e=>{let t=e.target;if(t.closest(".readyfilter__btn")){let e=getComputedStyle(t).filter;r.style.filter=e,i.style.filter=e,h.classList.add("disabled-link")}}));const p=document.querySelector(".paint__canvas"),_=p.getContext("2d"),y=document.querySelector(".paint__body"),v=document.querySelector(".paint__download"),S=document.querySelector(".paint__color"),L=document.querySelector(".paint__eraiser");v.href=p.toDataURL();let k=!1;function q(e){k=!0,_.beginPath();let t=e.pageX-p.offsetLeft,o=e.pageY-p.offsetTop;m.any()&&(t=e.touches[0].pageX-p.offsetLeft,o=e.touches[0].pageY-p.offsetTop),_.moveTo(t,o)}function w(e){if(e.preventDefault(),1==k){let t=e.pageX-p.offsetLeft,o=e.pageY-p.offsetTop;m.any()&&(t=e.touches[0].pageX-p.offsetLeft,o=e.touches[0].pageY-p.offsetTop),_.lineTo(t,o),_.stroke()}}function E(){k=!1,v.href=p.toDataURL()}window.onload=function(){p.width=y.offsetWidth},y.addEventListener("click",(e=>{e.target.closest(".paint__clear")&&_.clearRect(0,0,p.width,p.height)})),y.addEventListener("change",(e=>{e.target.closest(".paint__fill")&&(_.fillStyle=e.target.value,_.fillRect(0,0,p.width,p.height)),e.target.closest(".paint__width")&&(_.lineWidth=e.target.value),e.target.closest(".paint__color")&&(L.checked?_.strokeStyle="white":_.strokeStyle=S.value),e.target.closest(".paint__eraiser")&&(e.target.checked?_.strokeStyle="white":_.strokeStyle=S.value)})),p.onmousedown=q,p.onmouseup=E,p.onmouseout=E,p.onmousemove=w,p.ontouchstart=q,p.ontouchend=E,p.ontouchcancel=E,p.ontouchmove=w;const b=document.querySelectorAll(".multilang"),A=document.querySelector(".header__lang-checkbox");function T(){b.forEach((e=>{A.checked?(e.innerText=e.dataset.eng,localStorage.setItem("photolang","eng")):(e.innerText=e.dataset.ru,localStorage.setItem("photolang","ru"))}))}A.addEventListener("change",T),localStorage.getItem("photolang")&&("eng"===localStorage.getItem("photolang")?A.checked=!0:A.checked=!1,T())})();