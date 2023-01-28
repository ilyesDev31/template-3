const logo = document.querySelector('.logo');
const otherLinks = document.querySelector('.other');
const megaMenu = document.querySelector('.mega-menu');
const sections = Array.from(document.querySelectorAll('.section'));
const links = Array.from(document.querySelectorAll('header li'));
const skills = document.querySelectorAll('.skills .container .bars > div');
// events timer variables
const timer = document.querySelectorAll('.timer div');
let days = 4;
let hours = 3;
let min = 30;
let sec = 15;

// reloading page
logo.addEventListener('click', reloadPage);
otherLinks.addEventListener('click', showMenu);

function reloadPage(){
    location.reload();
}

function showMenu(){
    megaMenu.classList.toggle('active');
}

function removeActive(list){
    list.forEach(li => li.classList.remove('active'));
}

links.forEach(link =>{
link.onclick = function(){
    let div =document.querySelector(`div.${this.className.split(' ')[0]}`).getBoundingClientRect().y;
    window.scrollTo(0, window.scrollY + div);
}
});





// event timer initialize function
function initTimer(){
timer[0].innerHTML = days < 10 ?  `0${days}` : days ;
timer[1].innerHTML = hours < 10 ?  `0${hours}` : hours;
timer[2].innerHTML = min < 10 ?  `0${min}` : min;
timer[3].innerHTML = sec < 10 ?  `0${sec}` : sec;
}
window.addEventListener('DOMContentLoaded', function(){
    initTimer();
    stateInit();
});


let interval = setInterval(() =>{
  if(sec > 0){
    sec--;
  }else if(sec ===0){
    if(min > 0){
        sec = 59;
        min--;
    }else if(min ===0){
        if(hours > 0){
            hours--;
            min = 59;
            sec = 59;
        }else if(hours === 0){
            if(days > 0){
                days--;
                hours = 23;
                min = 59;
                sec = 59;
            }else if(days === 0){
                clearInterval(interval)
            }
        }
    }
  }


    initTimer();

}, 1000);

let stateObj = {
    clients : 0,
    projects : 0,
    countries:0,
    money: 0,
}

let triggerCounter= false;

function stateInit(){
let statBox = document.querySelectorAll('.stats .box .static');
let objKeys = Object.keys(stateObj);
for(let i =0; i < objKeys.length; i++){
    statBox[i].innerHTML = stateObj[objKeys[i]]
}
}

function triggerCount(){

let intervals = setInterval(() =>{
    if(stateObj['clients'] < 150){
        stateObj['clients']++
    }
    if(stateObj['projects'] < 135){
        stateObj['projects']++;
    }
    if(stateObj['countries'] < 50){
        stateObj['countries']++;
    }
    if(stateObj['money'] < 500){
        stateObj['money']++;
    }
    if(stateObj['money'] === 500){
        clearInterval(intervals)
    }
    stateInit(intervals)
}, 5)
}


window.onscroll = function(){
    let y= this.scrollY;
    // skills section bars
    if(sections[sections.indexOf(sections.filter(sec => sec.classList.contains('skills'))[0])].getBoundingClientRect().top <= window.innerHeight / 2.5){
skills.forEach(skill => skill.classList.add('active'));
    }
    // landing section and removing
    if(y <= y + sections[0].getBoundingClientRect().top){
        removeActive(links);
    }
sections.forEach((sec, i) =>{
    if(sec.getBoundingClientRect().top <= 1){
        removeActive(links);
     if(i > 2){
        links[3].classList.add('active');
     }else{
        links[i].classList.add('active');
     }
    }
});
// statistics counter
let stats = sections.filter(sec => sec.classList.contains('stats'))[0];
if(stats.getBoundingClientRect().top <= 0) {
    if(!triggerCounter){
        triggerCounter = true;
        triggerCount();
    }
}
}