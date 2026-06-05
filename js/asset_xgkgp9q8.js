(function(){
  var K='promo_popup_closed';
  if(localStorage.getItem(K))return;
  setTimeout(function(){
    var o=document.getElementById('promo-overlay-giaom0');
    if(o)o.style.display='flex';
  },15000);
  function close(){
    document.getElementById('promo-overlay-giaom0').style.display='none';
    localStorage.setItem(K,'1');
  }
  document.getElementById('promo-close-btn-giaom0').addEventListener('click',close);
  document.getElementById('promo-overlay-giaom0').addEventListener('click',function(e){
    if(e.target===this)close();
  });
})();
