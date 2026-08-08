/* ---------- Expressionale Designz — shared header search ---------- */
/* Wires up every search input/button on the page (desktop header AND  */
/* the mobile menu's search bar). Default behavior sends the query to  */
/* shop.html?q=... ; pass a custom onSubmit handler to filter in place */
/* (used by shop.html itself).                                         */

function initSiteSearch(onSubmit){
  const groups = document.querySelectorAll('.search, .mobile-search');

  groups.forEach(group => {
    const input = group.querySelector('input');
    const button = group.querySelector('button');
    if (!input || !button) return;

    function trigger(){
      const q = input.value.trim();
      if (typeof onSubmit === 'function') {
        onSubmit(q);
      } else {
        window.location.href = 'shop.html' + (q ? ('?q=' + encodeURIComponent(q)) : '');
      }
    }

    button.addEventListener('click', trigger);
    input.addEventListener('keyup', e => {
      if (e.key === 'Enter') trigger();
    });
  });
}
