import { getIMG } from "./api";
import { elements } from "./refs";
import { Report } from 'notiflix/build/notiflix-report-aio';

elements.formEl.addEventListener('submit', handlerClick);

function handlerClick(evt) {
    evt.preventDefault();
    const search = evt.currentTarget.searchQuery.value;
    getIMG(search)
        .then((data) => {
            if (!data.totalHits) {
                elements.galleryEl.innerHTML = ""
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
                elements.galleryEl.innerHTML = createMarkup(data.hits)
            }
            
        })
        .catch(() => {
                /* elements.container.innerHTML = ""; */
               
            })
}

function createMarkup(data) {
  return data.map((item) => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = item;
        console.log(webformatURL);
        return `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
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
                    }).join('')
}