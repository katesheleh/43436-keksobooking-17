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

document.querySelector('.map').classList.remove('map--faded');


