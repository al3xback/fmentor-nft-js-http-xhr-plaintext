const url = 'https://al3xback.github.io/fmentor-nft-js-http-xhr-plaintext/';

const xhr = new XMLHttpRequest();

xhr.open('GET', url);

xhr.onload = function () {
    console.log(this.responseText);
};

xhr.send();
