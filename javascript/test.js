const api_key = "dddddd";
const base_url = "https://api.giphy.com/v1/gifs";
const search_endpoint = `${base_url}/search`;
const trending_endpoint = `${base_url}/trending`;

function add_to_body(response) {
    let src = response.data[0].images.fixed_height.url;
    let img = document.createElement("img");
    img.setAttribute("src", src);
    document.body.appendChild(img);
}

function make_search() {
    const q = "linux";
    let url = `${search_endpoint}?q=${q}&api_key=${api_key}`;
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(url);
            add_to_body(response);
        })
        .catch(reason => console.log(reason));
}

function make_trending() {
    let url = `${trending_endpoint}?api_key=${api_key}`;
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(url);
            add_to_body(response);
        })
        .catch(reason => console.log(reason));
}
//make_search();
//make_trending();