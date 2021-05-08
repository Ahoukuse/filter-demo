const defaultClass = 'demo ';

function clearChildrenNode(root) {
    let children = root.childNodes;
    let length = children.length;
    for (let index = 0; index < length; index++) {
        root.removeChild(children[0]);
    }
}

function createBr(){
    let br = document.createElement('br');
    adjustment.appendChild(br);
}

function createSlider(name, desc,callback,opts={}) {
    let ranger = document.createElement('input');
    ranger.id = name;
    ranger.setAttribute('type','range');
    ranger.setAttribute('min', opts.min != undefined ? opts.min: '0');
    ranger.setAttribute('max', opts.max != undefined ? opts.max: '1');
    ranger.setAttribute('value', opts.value != undefined ? opts.value: '1');
    ranger.setAttribute('step','.01');
    let span = document.createElement('span');
    span.innerText = desc;
    let value_span = document.createElement('span');
    value_span.innerText =  opts.value != undefined ? opts.value: '1';
    ranger.addEventListener('input',(e)=>{
        callback(ranger.value);
        value_span.innerText = ranger.value;
    });

    adjustment.appendChild(span);
    adjustment.appendChild(ranger);
    adjustment.appendChild(value_span);
}


function createColorPicker(name,desc,callback,opts = {}){
    let picker = document.createElement('input');
    picker.id = name;
    picker.setAttribute('type','color');

    picker.addEventListener('input',(e)=>{
        callback(picker.value);
    });

    let span = document.createElement('span');
    span.innerText = desc;
    adjustment.appendChild(span);
    adjustment.appendChild(picker);
}

function grayscaleAdj() {
    demo.style.setProperty('--value',0);
    createSlider('gray','灰度值',(value)=>{
        demo.style.setProperty('--value',value);
    },{
        value: 0
    });
}

function SepiaAdj() {
    demo.style.setProperty('--value',0);
    createSlider('sepia','Sepia',(value)=>{
        demo.style.setProperty('--value',value);
    },{
        value: 0
    });
}

function saturateAdj() {
    demo.style.setProperty('--value',1);
    createSlider('saturate','色彩饱和度',(value)=>{
        demo.style.setProperty('--value',value);
    },{
        max: 10,
        value: 1
    });
}

function hueRotateAdj() {
    demo.style.setProperty('--value','0deg');
    createSlider('hueRotate','色相旋转',(value)=>{
        demo.style.setProperty('--value',value+'deg');
    },{
        max: 360,
        value: 0
    });
}

function invertAdj() {
    demo.style.setProperty('--value','0');
    createSlider('invert','反转',(value)=>{
        demo.style.setProperty('--value',value);
    },{
        value:0
    });
}

function opacityAdj() {
    demo.style.setProperty('--value','1');
    createSlider('opacity','透明度',(value)=>{
        demo.style.setProperty('--value',value);
    },{
        value:1
    });
}

function brightnessAdj() {
    demo.style.setProperty('--value','1');
    createSlider('brightness','亮度',(value)=>{
        demo.style.setProperty('--value',value);
    },{
        max: 10,
        value: 1
    });
}

function contrastAdj() {
    demo.style.setProperty('--value','1');
    createSlider('contrast','对比度',(value)=>{
        demo.style.setProperty('--value',value);
    },{
        max: 10,
        value: 1
    });
}
function blurAdj() {
    demo.style.setProperty('--value','0px');
    createSlider('blur','高斯模糊',(value)=>{
        demo.style.setProperty('--value',value+'px');
    },{
        max: 10,
        value: 0
    });
}
function drop_shadow() {
    demo.style.setProperty('--x-value','0px');
    demo.style.setProperty('--y-value','0px');
    demo.style.setProperty('--r-value','0px');
    demo.style.setProperty('--color-value','#000000');


    createSlider('x_shadow','x轴阴影',(value)=>{
        demo.style.setProperty('--x-value',value+'px');
    },{
        min: -20,
        max: 20,
        value: 0
    });
    createBr();
    createSlider('y_shadow','y轴阴影',(value)=>{
        demo.style.setProperty('--y-value',value+'px');
    },{
        min: -20,
        max: 20,
        value: 0
    });
    createBr();
    createSlider('rad_shadow','blur',(value)=>{
        demo.style.setProperty('--r-value',value+'px');
    },{
        max: 20,
        value: 0
    });
    createBr();
    createColorPicker('picker','颜色',(value)=>{
        demo.style.setProperty('--color-value',value);
    });
}

const renderList = [grayscaleAdj,SepiaAdj,saturateAdj,hueRotateAdj,invertAdj,opacityAdj,brightnessAdj,contrastAdj,blurAdj,drop_shadow];


function main() {
    var adjustment = document.getElementById('adjustment');
    var demo = document.getElementById('demo');
    const select = document.getElementById('filter-selection');
    demo.className = defaultClass + select.options[select.selectedIndex].getAttribute('value');
    renderList[select.selectedIndex]();
    let onChange = function(e) {
        clearChildrenNode(adjustment);
        demo.className = defaultClass + select.options[select.selectedIndex].getAttribute('value');
        if (select.selectedIndex < renderList.length) {
            renderList[select.selectedIndex]();
        }
    }
    select.addEventListener('change',onChange);
}

window.addEventListener('load',main);