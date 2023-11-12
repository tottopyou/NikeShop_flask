


const  log_button = document.querySelector(".Log-in");
const  close_button = document.querySelector(".close-button");

log_button.addEventListener("click", log_menu);
close_button.addEventListener("click",close)

function log_menu (){
    document.querySelector(".Log_in").style.display = 'flex';
    var divs = document.querySelectorAll(".main div");
    setTimeout(() => {
        for (var i = 0; i < divs.length; i++){
            
            divs[i].style.filter = "blur(3px)";
            divs[i].style.opacity= 0.8;
        }
        },500);
    setTimeout(() => {document.querySelector(".Log_in").style.animationPlayState = 'paused';},1000);

}


function close (){
    document.querySelector(".Log_in").style.animationPlayState = '';
    var divs = document.querySelectorAll(".main div");
    setTimeout(() => {
        for (var i = 0; i < divs.length; i++){
            
            divs[i].style.filter = "blur(0px)";
            divs[i].style.opacity= 1;
        }
        },500);
    setTimeout(() => {document.querySelector(".Log_in").style.display = 'none';},1000);
    
} 



const aboba = document.querySelector('.create');
aboba.addEventListener('click', create_acc);

var i=1;

function create_acc (){
    
    if(i==1)
    {
        
        document.querySelector("#log").style.display = 'none';
        document.querySelector("#reg").style.display = 'flex';
        let ac = document.querySelector('.acc_acc');
        let cr = document.querySelector('.create')
        ac.innerHTML = 'Already have an account?' ;
        cr.innerHTML = 'Log In';
        i++;
    }
    else
    {   
        document.querySelector("#log").style.display = 'flex';
        document.querySelector("#reg").style.display = 'none';
        let ac = document.querySelector('.acc_acc');
        let cr = document.querySelector('.create')
        ac.innerHTML = 'No account? ' ;
        cr.innerHTML = 'Create one';
        i--;
    }

   
}


const light_button = document.querySelector('.light-img')
light_button.addEventListener("click",light)

function light(){

    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
        document.querySelector(".light-yellow").style.display = 'flex';
    } else {
        x.type = "password";
        document.querySelector(".light-yellow").style.display = 'none';
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