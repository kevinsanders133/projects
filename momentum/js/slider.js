const next = document.querySelector('.slide-next');
const prev = document.querySelector('.slide-prev');

next.addEventListener('click', getSlideNext);
prev.addEventListener('click', getSlidePrev);

function getSlideNext() {
    if (bgNum === 20) bgNum = 1;
    else bgNum++;
    setBg();
}

function getSlidePrev() {
    if (bgNum === 1) bgNum = 20;
    else bgNum--;
    setBg();
}