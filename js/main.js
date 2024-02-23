import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/df380906f13f1a0ab49a3a7a56b0480b/raw/945b25b08e0c1994287b816d6bf367e04007bfd6/nft-data.txt';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const cardImageTemplate = document.getElementById('card-image-template');
const cardContentTemplate = document.getElementById('card-content-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardWrapperEl.appendChild(errorEl);
};

const renderCardContent = (data) => {
	const [title, description, image, statusInfo, authorInfo] =
		data.split('\n');
	const [ethereumAmount, remainingTime] = statusInfo.split(' | ');
	const [authorName, authorImage] = authorInfo.split(' | ');

	const cardTemplateNode = document.importNode(cardTemplate.content, true);
	const cardEl = cardTemplateNode.querySelector('.card');

	/* [card image] */
	const cardImageTemplateNode = document.importNode(
		cardImageTemplate.content,
		true
	);
	const cardImageEl = cardImageTemplateNode.querySelector('.card__image img');
	cardImageEl.src = './images/' + image;
	cardImageEl.alt = image.substring(0, image.indexOf('.'));

	/* [card content] */
	const cardContentTemplateNode = document.importNode(
		cardContentTemplate.content,
		true
	);
	const cardContentEl =
		cardContentTemplateNode.querySelector('.card__content');

	const cardTitleEl = cardContentEl.querySelector('.card__title a');
	cardTitleEl.textContent = title;

	const cardDescriptionEl = cardContentEl.querySelector('.card__desc');
	cardDescriptionEl.textContent = description;

	const cardStatusItemEls = cardContentEl.querySelectorAll(
		'.card__stats-list-item'
	);
	const cardEthereumAmountEl = cardStatusItemEls[0];
	cardEthereumAmountEl.querySelector('span').textContent = ethereumAmount;
	const cardRemainingTimeEl = cardStatusItemEls[1];
	cardRemainingTimeEl.querySelector('span').textContent = remainingTime;

	const cardAuthorImageEl = cardContentEl.querySelector('.card__author-img');
	cardAuthorImageEl.src = './images/' + authorImage;
	cardAuthorImageEl.alt = authorName;

	const cardAuthorNameEl = cardContentEl.querySelector(
		'.card__author-desc a'
	);
	cardAuthorNameEl.textContent = authorName;

	/* [init] */
	removeLoading();
	cardEl.appendChild(cardImageTemplateNode);
	cardEl.appendChild(cardContentTemplateNode);
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent, handleError);
