let numBau = 0;
let numCua = 0;
let numTom = 0;
let numCa = 0;
let numHuou = 0;
let numGa = 0;

let selected = [numBau, numCua, numTom, numCa, numHuou, numGa];
let check = [0,0,0,0,0,0];

// đặt cược
const num = document.querySelectorAll('.num-js');
const act = document.querySelectorAll('.act');
let count = 0;
let cond = false;
for (let i = 0; i < act.length; i++) {
    act[i].onclick = function () {
        if (count < 3) {
            num[i].innerHTML = parseInt(num[i].innerHTML) + 1;
            count++;
            selected[i]++;
        }
        cond = true;
    }
}

// nút đặt lại
const reset = document.querySelector('.reset-button');
const resetb = document.querySelector('.reset-button button');
reset.onclick = function () {
    count = 0;
    for (let i = 0; i < act.length; i++) {
        num[i].innerHTML = 0;
        selected[i] = 0;
        cond = false;
        check[i] = 0;
    }
    resultIndex = []
}

// nút quay
const play = document.querySelector('.play-button');
const playb = document.querySelector('.play-button button');

// random
let imgs = [
    "./img/bau.png",
    "./img/cua.png",
    "./img/tom.png",
    "./img/ca.png",
    "./img/huou.png",
    "./img/ga.png"
];
// random từ 0 đến 5
function getRandomIndex() {
    return Math.floor(Math.random() * 6);
}

// dãy vị trí của kết quả
let dem = 0;
let resultIndex = [];
function RandomImages(div) {
    let counter = 0;
    let interval = setInterval(function() {
        div.innerHTML = ''; 
        let imgIndex = getRandomIndex();
        let imgSrc = imgs[imgIndex]; 
        let img = document.createElement('img');
        img.src = imgSrc;
        div.appendChild(img);
        
        counter++;
        if (counter === 100) {
            resultIndex.push(imgIndex);
            dem++;
            if(dem === 3){
                for(let i = 0; i<3; i++){
                    check[resultIndex[i]]++;
                }   
                dem = 0;
            }
            clearInterval(interval);
        }
    }, 50);
  
}

let div1 = document.querySelector('.play-imgs-1');
let div2 = document.querySelector('.play-imgs-2');
let div3 = document.querySelector('.play-imgs-3');

play.onclick = function () {
    // vô hiệu hóa các nút khác
    if(cond === true && count === 3){
        for (let i = 0; i < act.length; i++) {
            act[i].classList.add('disabled-button');
        }
        reset.classList.add('disabled-button');
        playb.classList.add('grey');
        resetb.classList.add('grey');
        
        // random kết quả
        RandomImages(div1);
        RandomImages(div2);
        RandomImages(div3);

        // ra kết quả
        setTimeout(function () {
            for (let i = 0; i < act.length; i++) {
                act[i].classList.remove('disabled-button');
            }
            reset.classList.remove('disabled-button');
            playb.classList.remove('grey');
            resetb.classList.remove('grey');
            let ans = false;
            for(let i = 0; i < 6; i++){
                if(check[i] !== selected[i]){
                    ans = true;
                }
            }
            if(ans){
                console.log('Bạn đã đoán sai với kết quả: ' + yourSelected(selected));
                ans = false
            }
            else{
                console.log('Bạn đã đoán đúng với kết quả: ' + yourSelected(selected));
            }
        }, 5000);
    
    } 
}

// hàm in ra lựa chọn
function yourSelected(arr) {
    const items = ['Bầu', 'Cua', 'Tôm', 'Cá', 'Hươu', 'Gà'];
    let print = '';
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            print += items[i] + ' ' + arr[i] + ' ';
        }
    }
    
    return print;
}

