import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api"
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, showLoader, showLoadMoreButton } from "./js/render-functions";

import icon from './img/error.svg';

console.log('start code');

const form = document.querySelector('.form');
export const loadMoreBtn = document.querySelector('.load-more-btn');
export const gallery = document.querySelector('.gallery');
export const loader = document.querySelector('.js-loader');


form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

let value;
let page;

async function onFormSubmit(event) {
    event.preventDefault()
    hideLoadMoreButton()

    console.log('start fn');

    page = 1;
    value = form.elements['search-text'].value.trim();

    if (value === '') {
        return iziToastError("You have not entered anything in the search!");
    }

    clearGallery();
    showLoader();

    try {
        const data = await getImagesByQuery(value, page);

        if (data.hits.length === 0) {
            iziToastError("Sorry, there are no images matching <br/>your search query. Please try again!");
        } else {
            createGallery(data.hits);
        }

        if (data.totalHits > 15) {
            showLoadMoreButton();
        }

        form.elements['search-text'].value = '';
    } catch (error) {
        iziToastError(error.message);
    } finally {
        hideLoader();
    }

    console.log('end fn');
}

async function onLoadMoreBtnClick() {
    showLoader();
    page += 1;
    loadMoreBtn.disabled = true;
    try {
        const data = await getImagesByQuery(value, page);
        createGallery(data.hits);

        if (data.totalHits <= 15 * page) {
            hideLoadMoreButton();
            iziToastInforming("We're sorry, but you've reached the end of search results.");
            page = 1;
        }

        const itemGallery = gallery.children
        const rect = itemGallery[0].getBoundingClientRect()
        window.scrollBy({
            top: rect.height * 2,
            behavior: "smooth",
        });
    } catch (error) {
        iziToastError(error.message);
    } finally {
        loadMoreBtn.disabled = false;
        hideLoader();
    }
}

function iziToastError(message) {
    return iziToast.error({
        class: 'izi-toast',
        message: message,
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

function iziToastInforming(message) {
    return iziToast.info({
        class: 'izi-toast',
        message: message,
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '24',
        backgroundColor: '#09f',
        position: 'topRight',
        progressBarColor: '#b8e3ff',
        theme: 'dark',
    });
}