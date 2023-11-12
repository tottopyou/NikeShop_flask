
const default_username = document.getElementById("name").value;

document.getElementById("name").addEventListener('input', button_apear)

function button_apear(){
    if (document.getElementById("name").value != default_username) {
        document.querySelector(".change_username").style.display = 'flex';
    }
    else{
        document.querySelector(".change_username").style.display = 'none'    
        }
    
}

const default_email = document.getElementById("email").value;

document.getElementById("email").addEventListener('input', button_apear2)

function button_apear2(){
    if (document.getElementById("email").value != default_email) {
        document.querySelector(".change_email").style.display = 'flex';
    }
    else{
        document.querySelector(".change_email").style.display = 'none'    
        }
    
}
