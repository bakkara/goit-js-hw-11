import { getIMG } from "./api";
import { elements} from "./refs";
import { Report } from 'notiflix/build/notiflix-report-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let page = 1;
elements.formEl.addEventListener('submit', handlerClick);

const options = {
    root: null,
    rootMargin: "300px",
    threshold: 0,
};

const observer = new IntersectionObserver(handlerPagination, options);

function handlerPagination(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page += 1;
            const search = elements.formEl.searchQuery.value;
            getIMG(search, page)
                .then(data => {
                    elements.galleryEl.insertAdjacentHTML('beforeend', createMarkup(data.hits));
                    const gallery = new SimpleLightbox('.gallery a').refresh();
        
                    if (data.hits.length === 0) {
                        Report.failure(
                    "We're sorry, but you've reached the end of search results.",
                    "Please try again.",
                    'Okay',
                        );
                        observer.unobserve(entry.target);
                    }
                })
            .catch(err => console.log(err))
        }
    });
}

function handlerClick(evt) {
    evt.preventDefault();
    page = 1;
    const search = elements.formEl.searchQuery.value;
    getIMG(search, page)
        .then((data) => {
            if (!data.totalHits) {
                elements.galleryEl.innerHTML = "";
                Report.failure(
                    "Sorry, there are no images matching your search query.",
                    "Please try again.",
                    'Okay',
                );
            } else {
                Report.success(
                    `Hooray! We found ${data.totalHits} images.`,
                    'Okay',
                );
                elements.galleryEl.innerHTML = createMarkup(data.hits);
                const gallery = new SimpleLightbox('.gallery a').refresh();
                if (data.totalHits > 40) {
                    observer.observe(elements.guard);
                } else {
                          Report.failure(
                    "We're sorry, but you've reached the end of search results.",
                    "Please try again.",
                    'Okay',
                );
        }
                
            }

        })
        .catch(() => {
            elements.galleryEl.innerHTML = "";
            Report.failure(
                "Sorry, there are no images matching your search query.",
                "Please try again.",
                'Okay',
            );

        });
}


function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
       return `<div class="photo-card">
                <a class="gallery__link" href="${largeImageURL}" rel="noreferrer noopener">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
                </a>
                <div class="info">
                    <p class="info-item">
                    <b>Likes </b> ${likes}
                    </p>
                    <p class="info-item">
                    <b>Views </b> ${views}
                    </p>
                    <p class="info-item">
                    <b>Comments</b> ${comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads</b> ${downloads}
                    </p>
                </div>
        </div>`
    }).join('');
}



