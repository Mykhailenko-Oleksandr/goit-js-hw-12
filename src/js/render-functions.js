import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.js-loader');

let modalImg = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  captionClass: 'gallery-caption',
})

export function createGallery(images) {
    const galleryMarkup = images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
<li class="gallery-item">
 <a class="gallery-link" href="${largeImageURL}" >
           <img
             class="gallery-image"
             src="${webformatURL}"
             alt="${tags}"
           />
         </a>
         <ul class="gallery-item-list">
         <li class="gallery-item-list-item"> 
         <h2 class="gallery-item-list-subtitle">Likes</h2>
         <p class="gallery-item-list-text">${likes}</p>
         </li>
         <li class="gallery-item-list-item"> 
         <h2 class="gallery-item-list-subtitle">Views</h2>
         <p class="gallery-item-list-text">${views}</p>
         </li>
         <li class="gallery-item-list-item"> 
         <h2 class="gallery-item-list-subtitle">Comments</h2>
         <p class="gallery-item-list-text">${comments}</p>
         </li>
         <li class="gallery-item-list-item"> 
         <h2 class="gallery-item-list-subtitle">Downloads</h2>
         <p class="gallery-item-list-text">${downloads}</p>
         </li>
         </ul>
</li> `
  ).join('');
  
  gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    
  modalImg.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
loader.classList.add('is-visible')
}

export function hideLoader() {
loader.classList.remove('is-visible')
}