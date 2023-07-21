import { getIMG } from "./api";
import { elements } from "./refs";

elements.formEl.addEventListener('submit', handlerClick);

function handlerClick(evt) {
    evt.preventDefault();
    const search = evt.currentTarget.searchQuery.value;
    getIMG(search)
        .then(data => elements.galleryEl.innerHTML = createMarkup(data.hits));
}

function createMarkup(data) {
  return data.map((item) => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = item;
        console.log(webformatURL);
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: </b> ${likes}
    </p>
    <p class="info-item">
      <b>Views: </b> ${views}
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