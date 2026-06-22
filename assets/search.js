import * as params from '@params';

let fuse;
let searchBox = document.getElementById('search');
let resList = document.getElementById('tableListBody');

function cardHTML(item) {
    let tagList = '';
    if (item.tags) {
        item.tags.forEach(tag => {
            tagList += `<li><a href="${tag.permalink}">${tag.title}</a></li>`
        });
    }
    const thumb = item.image
        ? `<img class="cardThumb" src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">`
        : '';
    return `<div class="card"><a class="cardLink" href="${item.permalink}">${thumb}<span class="cardTitle">${item.title}</span></a><ul class="tagsList">${tagList}</ul></div>`;
}

window.onload = () => {
    fetch(params.BaseURL + 'index.json')
        .then(res => res.json())
        .then(data => {
            const options = {
                distance: 100,
                threshold: 0.0,
                ignoreLocation: true,
                keys: [
                    'title',
                    'tags.title',
                ]
            };
            const myIndex = Fuse.createIndex(options.keys, data)
            fuse = new Fuse(data, options, myIndex);
        });
}

searchBox.addEventListener('input', () => {
    let resultSet = '';
    let results = fuse.search(searchBox.value);
    if (results.length !== 0) {
        for (let item of results) {
            resultSet += cardHTML(item.item);
        }
    } else {
        for (let item of fuse.getIndex().docs) {
            resultSet += cardHTML(item);
        }
    }
    resList.innerHTML = resultSet;
})
