import axios from "axios";
import Notiflix from "notiflix";
import ImgApiService from "./imgApiService";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import InfiniteScroll from "infinite-scroll";
import Masonry from "masonry-layout";






const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');


const imgApiService = new ImgApiService();




searchForm.addEventListener('submit', onFormSubmit);
window.addEventListener('scroll', addMoreScroll);










function onFormSubmit(event) {
    event.preventDefault();

    if(event.currentTarget.elements.searchQuery.value === ''){
        return Notiflix.Notify.warning('Search something')
    }

    imgApiService.input = event.currentTarget.elements.searchQuery.value;


    imgApiService.resetPage();

    

    imgApiService.fetchImg()
    .then(data => {
        
        if(data.hits.length === 0){
            Notiflix.Notify.warning(
                'Sorry, there are no images matching your search query. Please try again.'
              );
        };

        if(data.hits.length > 0){
            Notiflix.Notify.success(
                `Hooray! We found ${data.totalHits} images.`
              );
        };
    
        
    galleryContainer.innerHTML = '';

    
    
    renderGallery(data.hits);

    

    });

    

    

    

    
};

function renderGallery(data) {

    

    
    const insertData = data.map ( ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
        return (
            `<a class="gallery__link" href=${largeImageURL}>
                <div class="gallery__photo-card post">
                    <div class="gallery__photo-thumb">
                        <img src=${webformatURL} alt=${tags} loading="lazy"/>
                    </div>
                    <div class="gallery__info">
                        <p class="gallery__info-item">
                            <b>Likes:</b><span> ${likes}</span>
                        </p>
                        <p class="gallery__info-item">
                            <b>Views:</b><span> ${views}</span>
                        </p>
                        <p class="gallery__info-item">
                            <b>Comments:</b><span> ${comments}</span>
                        </p>
                        <p class="gallery__info-item">
                            <b>Downloads:</b><span> ${downloads}</span>
                        </p>
                    </div>
                </div>
            </a>`
          )}
    )

    
    galleryContainer.insertAdjacentHTML('beforeend', insertData.join(''));
    

    // let msnry = new Masonry( galleryContainer,{
    //     itemSelector: '.gallery__link',
    //     gutter: 15,
    // }); 
     


    let lightBox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
        showCounter: false,
        nextOnImageClick: true,
        scrollZoom: false,
    });

    
    lightBox.refresh();

    

    

    
};

function addMoreScroll() {

    if (document.documentElement.scrollHeight - document.documentElement.scrollTop - 1 < document.documentElement.clientHeight) {
        imgApiService.fetchImg()
        .then(data => {
            
            renderGallery(data.hits);  
            if(data.hits.length === 0){
                Notiflix.Notify.warning("We're sorry, but this is the last page.");
            }
            
        });
    }
    
};





// loadMoreBtn.addEventListener('click', onLoadMoreClick);
// function onLoadMoreClick() {   
// };