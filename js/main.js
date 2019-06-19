function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

var mapForUsers = document.querySelector('.map__pins');

var APPARTAMENT_TYPES = ["palace", "flat", "house", "bungalo"];
var COUNT_MOCK_ELEMENTS = 8;

var appartments = [];

var similarListElement = document.querySelector('.map__pins');

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


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

var mainForm = document.querySelector('.ad-form');
var mainFormDisabled = document.querySelector('.ad-form--disabled');

var inputElements = mainForm.querySelectorAll('input');
var selectElements = mainForm.querySelectorAll('select');
var textareaElements = mainForm.querySelectorAll('textarea');
var btnElements = mainForm.querySelectorAll('button');

function setFieldStatus(element, status) {
    for (var i = 0; i < element.length; i++) {
        element[i].disabled = status;
    }
}

setFieldStatus(inputElements, true);
setFieldStatus(selectElements, true);
setFieldStatus(textareaElements, true);
setFieldStatus(btnElements, true);

var inputActive = setFieldStatus(inputElements, false);
var selectActive = setFieldStatus(selectElements, false);
var textareaActive = setFieldStatus(textareaElements, false);
var btnActive = setFieldStatus(btnElements, false);


var mapwrapFaded = document.querySelector('.map--faded');
var mapwrap = document.querySelector('.map');
var mainpin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');

mainpin.addEventListener('click', function () {
    mapwrap.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    inputActive;
    selectActive;
    textareaActive;
    btnActive;
    addressInput.value = mainpin.style.left.replace('px', '') + ',' + mainpin.style.top.replace('px', '');
});

mainpin.addEventListener('mouseup', function (evt) {
    if (evt.keyCode === 13) {
        mapwrap.classList.remove('map--faded');
        mainForm.classList.remove('ad-form--disabled');
        inputActive;
        selectActive;
        textareaActive;
        btnActive;
        addressInput.value = mainpin.style.top + ',' + mainpin.style.top;
        addressInput.value = mainpin.style.left.replace('px', '') + ',' + mainpin.style.top.replace('px', '');
    }
});