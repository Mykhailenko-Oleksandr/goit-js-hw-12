import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api"
import { clearGallery, createGallery, hideLoader, showLoader } from "./js/render-functions";

import icon from './img/error.svg';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', onFormSubmit)
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)

function onFormSubmit(event) {
    event.preventDefault()

    const value = form.elements['search-text'].value.trim();

    if (value === '') {
     return iziToast.error({
            class: 'izi-toast',
            message: "You have not entered anything in the search!",
            messageColor: '#fff',
            messageSize: '16',
            messageLineHeight: '24',
            backgroundColor: '#ef4040',
            iconUrl: icon,
            position: 'topRight',
            progressBarColor: '#b51b1b',
            theme: 'dark',
        });
    }

    clearGallery();
    showLoader();

    getImagesByQuery(value)
        .then(data => {
            if (data.hits.length === 0) {
               return iziToast.error({
                    class: 'izi-toast',
                    message: "Sorry, there are no images matching <br/>your search query. Please try again!",
                    messageColor: '#fff',
                    messageSize: '16',
                    messageLineHeight: '24',
                    backgroundColor: '#ef4040',
                    iconUrl: icon,
                    position: 'topRight',
                    progressBarColor: '#b51b1b',
                    theme: 'dark',
                });
            } else {
                createGallery(data.hits);
            }
        })
        .catch(error => {
            return iziToast.error({
                class: 'izi-toast',
                message: error.message,
                messageColor: '#fff',
                messageSize: '16',
                messageLineHeight: '24',
                backgroundColor: '#ef4040',
                iconUrl: icon,
                position: 'topRight',
                progressBarColor: '#b51b1b',
                theme: 'dark',
            })
        })
        .finally(() => {
            hideLoader();
    })

}