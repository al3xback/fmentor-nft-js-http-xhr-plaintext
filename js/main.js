import { sendHttpRequest } from './util.js';

const mainContainerEl = document.querySelector('main .container');
const cardTemplate = document.getElementById('card-template');

const URL =
	'https://gist.githubusercontent.com/al3xback/df380906f13f1a0ab49a3a7a56b0480b/raw/e6e8255bc605a89c6b4e1bc59f8d2002c6a389a8/gistfile1.txt';

const renderCardContent = (data) => {
	const [title, desc, image, ethereumAmount, remainingTime, ...author] =
		data.split('\n');

	const cardEl = document.importNode(cardTemplate.content, true);

	const cardImageEl = cardEl.querySelector('.card__image img');
	cardImageEl.src = './images/' + image;
	cardImageEl.alt = image.substring(0, image.indexOf('.'));

	const cardTitleEl = cardEl.querySelector('.card__title a');
	cardTitleEl.textContent = title;

	const cardDescEl = cardEl.querySelector('.card__desc');
	cardDescEl.textContent = desc;

	const cardStatusItemEls = cardEl.querySelectorAll('.card__stats-list-item');
	const cardEthereumAmountEl = cardStatusItemEls[0];
	cardEthereumAmountEl.querySelector('span').textContent =
		ethereumAmount + ' ETH';
	const cardRemainingTimeEl = cardStatusItemEls[1];
	cardRemainingTimeEl.querySelector('span').textContent =
		remainingTime + ' days left';

	const cardAuthorImageEl = cardEl.querySelector('.card__author-img');
	cardAuthorImageEl.src = './images/' + author[1];
	cardAuthorImageEl.alt = author[1].substring(0, image.indexOf('.'));

	const cardAuthorNameEl = cardEl.querySelector('.card__author-desc a');
	cardAuthorNameEl.textContent = author[0];

	mainContainerEl.appendChild(cardEl);
};

sendHttpRequest('GET', URL, renderCardContent);