function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

var mapForUsers = document.querySelector('.map__pins');

var APPARTAMENT_TYPES = ["palace", "house", "flat", "bungalo"];
var APPARTAMENT_PRICES = [10000, 5000, 1000, 0];
var COUNT_MOCK_ELEMENTS = 8;
var appartments = [];
var similarListElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapwrapFaded = document.querySelector('.map--faded');
var mapwrap = document.querySelector('.map');
var mainpin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var mainForm = document.querySelector('.ad-form');
var mainFormDisabled = document.querySelector('.ad-form--disabled');
var formElements = mainForm.querySelectorAll('input, select, textarea, button');
var typeLivingSelect = mainForm.querySelector('#type');
var priceInput = mainForm.querySelector('#price');
var timeSelectWrapper = mainForm.querySelector('.ad-form__element--time');


var addMockElement = function (arr, count, type, x, y) {
    arr.push(
        {
            'author': {
                'avatar': 'img/avatars/user0' + count + '.png'
            },
            'offer': {
                'type': type
            },
            'location': {
                'x': x,
                'y': y
            }
        });
};

var createMock = function () {
    for (var i = 1; i <= COUNT_MOCK_ELEMENTS; i++) {
        addMockElement(appartments, i, APPARTAMENT_TYPES[Math.floor(getRandomNum(0, APPARTAMENT_TYPES.length))], getRandomNum(0, mapForUsers.clientWidth), getRandomNum(130, 160));
    }
};


var renderMapPin = function (pin) {

    var pinEl = mapPinTemplate.cloneNode(true);
    var pinImg = pinEl.querySelector('img');
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.type;
    pinEl.style.left = pin.location.x + pinImg.width / 2 + "px";
    pinEl.style.top = pin.location.y + pinImg.width + "px";

    return pinEl;

}

createMock();

var fragment = document.createDocumentFragment();
for (var i = 0; i < appartments.length; i++) {
    fragment.appendChild(renderMapPin(appartments[i]));
}
similarListElement.appendChild(fragment);

document.querySelector('.map').classList.add('map--faded');

function setFieldStatus(element, status) {
    for (var i = 0; i < element.length; i++) {
        element[i].disabled = status;
    }
    return true;
}

setFieldStatus(formElements, true);

var activationMapFormHandler = function () {
    mapwrap.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    setFieldStatus(formElements, false);
    addressInput.value = mainpin.style.left.replace('px', '') + ',' + mainpin.style.top.replace('px', '');
};

mainpin.addEventListener('click', activationMapFormHandler);
mainpin.addEventListener('mouseup', function (evt) {
    if (evt.keyCode === 13) {
        activationMapFormHandler;
    }
});

typeLivingSelect.addEventListener('change', function (evt) {
    var selectedOption = APPARTAMENT_TYPES.indexOf(evt.target.value);
    priceInput.min = APPARTAMENT_TYPES[selectedOption];
    priceInput.placeholder = APPARTAMENT_PRICES[selectedOption];
});

timeSelectWrapper.addEventListener('change', function (evt) {
    if (evt.target === timeSelectWrapper.elements[0]) {
        timeSelectWrapper.elements[1].value = timeSelectWrapper.elements[0].value;
    } else {
        timeSelectWrapper.elements[0].value = timeSelectWrapper.elements[1].value;
    }
});

console.log(timeSelectWrapper.elements);