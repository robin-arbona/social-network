
function getUrl() {
    let url = this.entrypoint + '/';
    return this.param == null ? url : url + '/' + this.param;

}
function loadContent() {
    let results = this.fetchJson(this.getUrl());
    this.displayResults(results.educations);
}
function fetchJson() {
    let json = fetch(url)
        .then(reponse => reponse.json())
        .then(json => json);
    return json;
}
function displayResults(results) {
    results.array.forEach(result => {
        let educationElement = document.createElement("div");
        educationElement.innerHTML = formatEducation(result);
        document.querySelector(".education").appendChild(educationElement);
    });
}

let path = document.querySelector('#pathMain').getAttribute('value')
let urlParsed = window.location.pathname.split('/')
let param = urlParsed[urlParsed.indexOf('profil')];

const formatEducation = (education) => {
    return `
    <div class="card mb-6">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                <figure class="image is-48x48">
                    <img class="is-rounded" src="${education.user_picture}" alt="Placeholder image">
                </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">${education.education_name}</p>
                    <p class="subtitle is-6">@${education.user_name} ${education.user_firstname}</p>
                </div>
            </div>`;
}

console.log(educationElement);
