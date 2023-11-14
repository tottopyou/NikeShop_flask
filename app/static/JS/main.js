
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


if(iconMenu)
{
    iconMenu.addEventListener("click",function(e)
    {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}