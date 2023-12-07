
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

let input_search = document.querySelector("#search");
let result_search_area = document.querySelector(".result_search");

input_search.onkeyup  = () => {
    if (input_search.value.length > 0) {
        result_search_area.classList.add('show');  
    }
    else {
        result_search_area.classList.remove('show');
    }
}

let search = document.querySelector(".search_container")
let inside_search = document.querySelector(".search")

i=0

function showsearchmenu(){

    const faSearch = document.querySelector(".button-search");

    if( i == 0 ){
        
        faSearch.onclick = null
        setTimeout(() => {faSearch.onclick = showsearchmenu }, 1000);
        search.style.height = "55px"
        search.style.transition = "all 0.7s ease"
        setTimeout(() => {
            inside_search.style.pointerEvents = "auto"
            inside_search.style.transition = "opacity 0.3s  ease"
            inside_search.style.opacity = 1},700);
        i++
    }
    else{   
        faSearch.onclick = null
        setTimeout(() => {faSearch.onclick = showsearchmenu }, 1000);
        inside_search.style.transition = "opacity 0.3s  ease"
        inside_search.style.opacity = 0
        inside_search.style.pointerEvents = "none"
        setTimeout(() => {
            search.style.height = "0px"
            search.style.transition = "all 0.7s ease"
        },300);
        i--
        h = 0 
    }
}
h = 0 
window.onscroll = () => {
    if ( i === 1 && h == 0 ){
        h ++ 
        result_search_area.classList.remove('show');
        setTimeout(() => {showsearchmenu()}, 500);
        setTimeout(() => (input_search.value = "" , 2000));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy');
    let selectedItems = {};

    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const goodId = button.getAttribute('id');
            const selectedSize = button.parentElement.querySelector('select').value;

            selectedItems[goodId] = selectedSize;

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
        .then(data => { localStorage.clear();})
        .catch(error => console.error('Error:', error));
    });
});

let no_result = document.querySelector(".not_found")

var clear_goods_data = [];

for (let i = 0; i < goodsData.length; i++) {
    if (goodsData[i] % 2 !== 0) {
        clear_goods_data.push(goodsData[i]);
    }
    }
goodsData.forEach(function(good) {
});

input_search.addEventListener("input", performSearch);

function performSearch() {
    const searchTerm = input_search.value.toLowerCase();
    const matchingGoods = clear_goods_data.filter(good =>
      good.name.toLowerCase().includes(searchTerm)
    );
    if(input_search.value.length > 0 ){
        displayResults(matchingGoods);
    }
  }

function displayResults(results) {
    no_result.innerHTML = "";
    if (results.length == 0) {
        no_result.innerHTML = "No results found"; 
        let allElements = document.querySelectorAll("[class^='li_']");
        allElements.forEach(element => {
            element.style.display = "none";
    });
      return;
    }
    let allElements = document.querySelectorAll("[class^='li_']");
    allElements.forEach(element => {
      element.style.display = "none";
    });

    results.forEach(good => {
      let change = document.querySelector(`.li_${good.img_id}`)
      if (change) {
        change.style.display = "flex";
      }
    });
  }

