// 请从开者中心获取 "Client-end (Target Recognition) URL"，格式如：https://af0c1ca3b41857bd8d6b44d480601c74.cn1.crs.easyar.com:8443/search
const app = new App('https://af0c1ca3b41857bd8d6b44d480601c74.cn1.crs.easyar.com:8443/search');
// 如果使用自定义方法获取token
app.setToken({
    'crsAppId': '6940d3889f2b6cc0710fd4e00f4506b1', // 云别库的CRS AppId
    'token': 'cNdxD+qO2bNuFibLGGKPFdgH/l4iG3ENAjQHHFdgGcd8te33l07naT3PcELP3NTGI4H45QNHW0gfK8zwazcDS/TKRJG7o0MiYoryOb8RrruG60RZdtMnB4l0F+Hg6jWSb0ZMaLtVy4UYuY8vhi3SfGRAO5f4OjeB8pVmyK/3exsP3jj7xMsanzJm+/GsHnKkkuY0udVeD3vnNB7sjudm92P+s/yyNAq8Ld0tith7G/4JpQtEwnD9pCgiYTqnuWBUW4UXsaI9AnTMalfxaJ7sfvrkmyrznYCJj4YgVYJCWMzmbJnBAlU/LYUx2w/R/C9wa4CB+zQsK4S4UAXw0p3bijHfcWiww/b0UT953KfeDB8NMwO3j25Xy9wB63XWJbpsSGCaBlvTNOVKp9pXdZgdPyq21ERjXMKPWvZf3BCcwrtOkuIDWGe8FSfIo6jlfoepEqMqH+N0VGJZh9gqjlw0kA==' // APIKey+APISecret生成token
});
// 如果使用EasyAR提供的集成环境
app.useEasyAr();
// 识别成功后的回调
app.callback = (msg) => {
    // 可以将 setting 作为meta上传到EasyAR的云识别，使用方法如下:
    const setting = JSON.parse(window.atob(msg.target.meta));
    // console.log(setting);
    playVideo(setting);
};
// 在手机上可能不会自动播放
function playVideo(setting) {
    location.href = setting.href
}
