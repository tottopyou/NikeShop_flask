
const menuLinks=document.querySelectorAll('.menu__link[data-goto]');
const menuBody=document.querySelector('.menu__body');
const iconMenu=document.querySelector('.menu__icon');

if(menuLinks.length>0)
{
    menuLinks.forEach(menuLink=>
        {
            menuLink.addEventListener('click',onMenuLinkClick)
        });
        function onMenuLinkClick(e)
        {
            const menuLink=e.target;
            if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto))
            {
                const gotoBlock=document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue=gotoBlock.getBoundingClientRect().top+pageYOffset-document.querySelector('header').offsetHeight;
                
                if (iconMenu.classList.contains('_active'))
                {
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                }

                window.scrollTo(
                    {
                        top:gotoBlockValue,
                        behavior:"smooth"
                    });
                    e.preventDefault();
            }
        }
}

function alert_buy (){
    alert("If you wanna add goods to the basket, you should be authorized");
}

if(iconMenu)
{
    iconMenu.addEventListener("click",function(e)
    {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy');
    let selectedItems = {};

    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const goodId = button.getAttribute('id');
            const selectedSize = button.parentElement.querySelector('select').value;

            console.log(goodId);
            console.log(selectedSize);

            selectedItems[goodId] = selectedSize;
            console.log(selectedItems);

            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {   
    window.addEventListener('beforeunload', () => {
        const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || {};
        fetch('/indexBasket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedItems: selectedItems }),
        })
        .then(response => response.text())
        .then(data => {console.log(localStorage), localStorage.clear();})
        .catch(error => console.error('Error:', error));
    });
});