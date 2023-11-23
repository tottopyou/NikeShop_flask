

function count_plus(event) {
    const item = event.target.getAttribute('data-item');
    let counter = document.querySelector(`[data-item-count="${item}"]`);
    let countValue = parseInt(counter.innerHTML);
    countValue++;
    counter.innerHTML = countValue;
}

function count_minus(event) {
    const item = event.target.getAttribute('data-item');
    let counter = document.querySelector(`[data-item-count="${item}"]`);
    let countValue = parseInt(counter.innerHTML);
    if (countValue > 1) {
        countValue--;
        counter.innerHTML = countValue;
    }
}

const buttons_plus = document.querySelectorAll('.plus');
const buttons_minus = document.querySelectorAll('.minus');

if (buttons_plus.length > 0 && buttons_minus.length > 0) {
    buttons_plus.forEach(button => {
        button.addEventListener('click', count_plus);
    });

    buttons_minus.forEach(button => {
        button.addEventListener('click', count_minus);
    });
}
