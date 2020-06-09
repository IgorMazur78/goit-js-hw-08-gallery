"use strict";
// Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
//  пока грузится изображение, мы не видели предыдущее.
// Следующий функционал не обязателен при сдаче задания,
// но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

// =======================================
// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, и указываться в href ссылки (это необходимо для доступности).

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>
// //
// //
import images from "./gallery-items.js";
const gallery = document.querySelector(".js-gallery");
const lightboxOpen = document.querySelector(".js-lightbox");
// const lightboxContent = document.querySelector(".lightbox__content");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxImg = document.querySelector(".lightbox__image");
const btn = document.querySelector(".lightbox__button");

const itemsGallery = images
  .map(
    (e) =>
      `<li class="gallery__item" ><a class="gallery__link" href="${e.original}" ><img class="gallery__image" src="${e.preview}" data-source ="${e.original}" alt="${e.description}" ></a>
</li>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", itemsGallery);

const handelUlclick = (el) => {
  el.preventDefault();
  if (el.target === el.currentTarget) {
    return;
  }
  lightboxOpen.classList.add("is-open");

  lightboxImg.alt = el.target.alt;

  lightboxImg.src = el.target.dataset.source;
};
const exitLightbox = (elem) => {
  if (elem.target === btn || elem.target === lightboxOverlay) {
    lightboxOpen.classList.remove("is-open");
    lightboxImg.setAttribute("src", " ");
  }
};
const escLightbox = (es) => {
  if (es.code === "escape") {
    lightboxOpen.classList.remove("is-open");
    lightboxImg.setAttribute("src", " ");
  }
};
window.addEventListener("keydown", escLightbox);
gallery.addEventListener("click", handelUlclick);
lightboxOpen.addEventListener("click", exitLightbox);
// lightboxOpen.addEventListener("click", exitLightbox);
// ===============
// /const nav = document.querySelector(".js-nav");

// /nav.addEventListener("click", handleNavClick);

// function handleNavClick(event) {
//   event.preventDefault();

//   const target = event.target;
//   console.log("event target: ", target); // посмотрите что тут

//   // Проверяем тип узла, если не ссылка выходим из функции
//   if (target.nodeName !== "A") return;

//   setActiveLink(target);
// }

// function setActiveLink(nextActiveLink) {
//   const currentActiveLink = nav.querySelector("a.active");

//   if (currentActiveLink) {
//     currentActiveLink.classList.remove("active");
//   }

//   nextActiveLink.classList.add("active");
// }
