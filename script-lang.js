document.addEventListener('DOMContentLoaded',()=>{
  const cur=document.querySelector(".current-language-4b56dc"),tog=cur?.closest(".language-toggle-4b56dc");
  if(cur&&tog){cur.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();tog.classList.toggle("active-4b56dc");});}
  document.addEventListener("click",()=>{document.querySelectorAll(".language-toggle-4b56dc.active-4b56dc").forEach(e=>e.classList.remove("active-4b56dc"));});
  const dd=document.querySelector(".language-dropdown-4b56dc");
  if(dd)dd.addEventListener("click",e=>e.stopPropagation());
  const p=window.location.pathname;let act=null;
  document.querySelectorAll(".language-link-4b56dc").forEach(a=>{
    const h=a.getAttribute("href");
    if((h==='/'&&p===h)||(h!=='/'&&p.startsWith(h))){a.classList.add("active-4b56dc");act=a;}
  });
  if(act){
    const fi=act.querySelector(".flag-4b56dc"),t=act.querySelector(".text-4b56dc")?.textContent||"";
    const cfi=document.querySelector(".current-language-4b56dc .flag-4b56dc"),ct=document.querySelector(".current-language-4b56dc .text-4b56dc");
    if(cfi&&fi){cfi.className=fi.className;}
    if(ct)ct.textContent=t;
  }
});