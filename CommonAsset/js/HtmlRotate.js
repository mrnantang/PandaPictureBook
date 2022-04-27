(function rotate(){
    var orientation=window.orientation;
    var pd = null;
    function createPd(){
        if(document.getElementById('preventTran') === null){
             pd = document.createElement('div');
             pd.setAttribute('id','preventTran');
             pd.style.position = 'fixed';
             pd.style.left = '0';
             pd.style.top = '0';
             pd.style.width = '100%';
             pd.style.height = '100%';
             pd.style.overflow = 'hidden';
             pd.style.backgroundColor = '#2e2e2e';
             pd.style.textAlign = 'center';
             pd.style.zIndex = '99999';
             document.getElementsByTagName('body')[0].appendChild(pd);
             var img = document.createElement('img');
             img.src = "";
             pd.appendChild(img);
             img.style.margin = '280px auto 30px'
             var br = document.createElement('br');
             var p = document.createElement('p');
             p.style.width = '100%';
             p.style.height = 'auto';
             p.style.fontSize = '22px';
             p.style.color = '#626262';
             p.style.lineHeight = '34px';
             p.style.textAlign = 'center';
             p.innerHTML = 'for your good experience';
             p.appendChild(br);
             p.innerHTML += 'Please operate your phone/tablet in landscape orientation';
             pd.appendChild(p);
         }
    }
    if(orientation==180||orientation==0){
         if(pd == null && document.getElementById('preventTran') === null) createPd();
         document.getElementById('preventTran').style.display = 'block';
    }
    window.onorientationchange=function(){
       if(pd == null && document.getElementById('preventTran') == null) createPd();
       document.getElementById('preventTran').style.display='none';
       rotate();
    };
     })();