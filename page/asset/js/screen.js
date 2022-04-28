const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
var screen_width = width; //屏幕宽度
if (width < height) {
screen_width = height; //如果 是竖屏，灵感的宽度就等于屏高
const contentDOM = document.getElementById('app');
contentDOM.style.width = height + 'px';
contentDOM.style.height = width + 'px';
contentDOM.style.top = (height - width) / 2 + 'px';
contentDOM.style.left = 0 - (height - width) / 2 + 'px';
contentDOM.style.transform = 'rotate(90deg)';
}
//根据手机旋转的角度来判断
const evt = "onorientationchange" in window ? "orientationchange" : "resize"; //旋转事件
window.addEventListener(evt, function () { //事件监听
if (window.orientation === 90 || window.orientation === -90) { //旋转到 90 或 -90 度，即竖屏到横屏
screen_width = height; //横屏，灵感的宽度就等于屏高
contentDOM.style.width = height + 'px';
contentDOM.style.height = width + 'px';
contentDOM.style.top = '0px';
contentDOM.style.left = '0px';
contentDOM.style.transform = 'none'; //不旋转；
}else{ //旋转到 180 或 0 度，即横屏到竖屏
screen_width = height; //竖屏，灵感的宽度就等于屏高
contentDOM.style.width = height + 'px';
contentDOM.style.height = width + 'px';
contentDOM.style.top = (height - width) / 2 + 'px';
contentDOM.style.left = 0 - (height - width) / 2 + 'px';
contentDOM.style.transform = 'rotate(90deg)'; //旋转90度
}
}, false);