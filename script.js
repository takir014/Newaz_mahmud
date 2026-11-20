(function(){
  var root=document.documentElement, btn=document.getElementById('theme');
  function isDark(){
    var t=root.getAttribute('data-theme');
    if(t) return t==='dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function label(){ btn.textContent=isDark()?'Light mode':'Dark mode'; }
  try{ var saved=localStorage.getItem('theme'); if(saved) root.setAttribute('data-theme',saved); }catch(e){}
  label();
  btn.addEventListener('click',function(){
    var next=isDark()?'light':'dark';
    root.setAttribute('data-theme',next);
    try{ localStorage.setItem('theme',next); }catch(e){}
    label();
  });

  var filters=document.querySelectorAll('.filters button'), items=document.querySelectorAll('.project');
  filters.forEach(function(b){
    b.addEventListener('click',function(){
      var f=b.dataset.filter;
      filters.forEach(function(x){ x.setAttribute('aria-pressed', x===b ? 'true':'false'); });
      items.forEach(function(p){ p.hidden = !(f==='all' || p.dataset.cat===f); });
    });
  });

  document.getElementById('year').textContent=new Date().getFullYear();

  var dlg=document.getElementById('dlg');
  items.forEach(function(p){
    var b=document.createElement('button');b.type='button';b.className='more';b.textContent='Read details';
    b.addEventListener('click',function(){
      dlg.querySelector('h3').textContent=p.querySelector('h3').textContent;
      dlg.querySelector('.d-text').textContent=p.querySelector('p').textContent+'';
      dlg.querySelector('.d-stack').textContent='Built with: '+p.querySelector('.stack').textContent;
      dlg.showModal();
    });
    p.appendChild(b);
  });
  dlg.addEventListener('click',function(e){ if(e.target===dlg) dlg.close(); });

  var links=document.querySelectorAll('nav a');
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(en.isIntersecting){ links.forEach(function(l){ l.classList.toggle('active', l.getAttribute('href')==='#'+en.target.id); }); }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  document.querySelectorAll('section[id]').forEach(function(s){ io.observe(s); });

  var up=document.getElementById('up');
  window.addEventListener('scroll',function(){ up.classList.toggle('show',window.scrollY>600); });
  up.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });

  document.getElementById('copy').addEventListener('click',function(){
    var s=document.getElementById('copied');
    try{
      navigator.clipboard.writeText('you@example.com').then(function(){ s.textContent='Email copied.'; },function(){ s.textContent='Copy failed. Email: you@example.com'; });
    }catch(e){ s.textContent='Email: you@example.com'; }
  });

  document.getElementById('form').addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(e.target);
    var subject=encodeURIComponent('Portfolio message from '+d.get('name'));
    var body=encodeURIComponent(d.get('message')+'\n\n'+d.get('name')+' ('+d.get('email')+')');
    window.location.href='mailto:you@example.com?subject='+subject+'&body='+body;
  });

  var bar=document.getElementById('bar');
  window.addEventListener('scroll',function(){
    var d=document.documentElement, m=d.scrollHeight-d.clientHeight;
    bar.style.width=(m>0?d.scrollTop/m*100:0)+'%';
  });
  var rv=document.querySelectorAll('section,.hero-text,.photo');
  var rio=new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); rio.unobserve(en.target); } });
  },{threshold:.1});
  rv.forEach(function(el){ el.classList.add('reveal'); rio.observe(el); });
})();
