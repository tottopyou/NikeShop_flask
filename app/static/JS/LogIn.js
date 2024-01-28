


const  log_button = document.querySelector(".Log-in");
const  close_button = document.querySelector(".close-button");

log_button.addEventListener("click", log_menu);
close_button.addEventListener("click",close)

function log_menu (){
    document.querySelector(".Log_in").style.display = 'flex';
    var divs = document.querySelectorAll(".main div:not(.search):not(.search_container):not(.result_search):not(.header__menu):not(.menu__icon):not(.menu__list)"); 
    setTimeout(() => {
        for (var i = 0; i < divs.length; i++){
            
            divs[i].style.filter = "blur(3px)";
            divs[i].style.opacity= 0.8;
            divs[i].style.pointerEvents = "none";
        }
        },500);
    setTimeout(() => {document.querySelector(".Log_in").style.animationPlayState = 'paused';},1000);
}


function close (){
    document.querySelector(".Log_in").style.animationPlayState = '';
    var divs = document.querySelectorAll(".main div:not(.search):not(.search_container):not(.result_search):not(.header__menu):not(.menu__icon):not(.menu__list)");
    setTimeout(() => {
        for (var i = 0; i < divs.length; i++){
            
            divs[i].style.filter = "blur(0px)";
            divs[i].style.opacity= 1;
            divs[i].style.pointerEvents = "auto";
        }
        },500);
    setTimeout(() => {document.querySelector(".Log_in").style.display = 'none';},1000);
    
} 



const change_create = document.querySelector('.create');
change_create.addEventListener('click', create_acc);

var i = true;

function create_acc (){
    
    if(i==true)
    {   
        document.querySelector("#log").style.display = 'none';
        document.querySelector("#reg").style.display = 'flex';
        let ac = document.querySelector('.acc_acc');
        let cr = document.querySelector('.create');
        change_reset.style.display = 'none'
        ac.innerHTML = 'Already have an account?' ;
        cr.innerHTML = 'Log In';
        i = false;
    }
    else
    {   
        document.querySelector("#log").style.display = 'flex';
        document.querySelector("#reg").style.display = 'none';
        let ac = document.querySelector('.acc_acc');
        let cr = document.querySelector('.create')
        change_reset.style.display = 'flex'
        ac.innerHTML = 'No account? ' ;
        cr.innerHTML = 'Create one';
        i = true;
    }
}

const change_reset = document.querySelector('.reset_pass');
change_reset.addEventListener('click', reset_pass);

var j = true;

function reset_pass (){
    
    if(j==true)
    {  
        document.querySelector("#log").style.display = 'none';
        document.querySelector("#google_apear").style.display = 'none';
        document.querySelector("#reset").style.display = 'flex';
        document.querySelector("#reset").style.margin = "auto 0px 0px 0px";
        let ac = document.querySelector('.acc_acc');
        let cr = document.querySelector('.create')
        change_reset.innerHTML = 'Cancel' 
        ac.innerHTML = '' ;
        cr.innerHTML = '';
        j = false;
    }
    else
    {   
        document.querySelector("#log").style.display = 'flex';
        document.querySelector("#google_apear").style.display = 'block';
        document.querySelector("#reset").style.display = 'none';
        document.querySelector("#reset").style.margin = "0px 0px 0px 0px";
        let ac = document.querySelector('.acc_acc');
        let cr = document.querySelector('.create')
        change_reset.innerHTML = 'Reset password' 
        ac.innerHTML = 'No account? ' ;
        cr.innerHTML = 'Create one';
        j = true;
    }
}


const light_button = document.querySelector('#light-img_1')
light_button.addEventListener("click",light)

function light(){

    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
        document.querySelector("#light-yellow_1").style.display = 'flex';
    } else {
        x.type = "password";
        document.querySelector("#light-yellow_1").style.display = 'none';
    }
}

const light_button_2 = document.querySelector('#light-img_2')
light_button_2.addEventListener("click",light_2)

function light_2(){

    var x = document.getElementById("pass_2");
    if (x.type === "password") {
        x.type = "text";
        document.querySelector("#light-yellow_2").style.display = 'flex';
    } else {
        x.type = "password";
        document.querySelector("#light-yellow_2").style.display = 'none';
    }
}


const f_pass = document.querySelector(".f_pass").value;
const s_pass = document.querySelector(".s_pass").value;

const create_button = document.getElementById("create_button")

create_button.disable = true

if (f_pass == s_pass ){
    create_button.disable = false
}
else{
    create_button.disable = true
}