document.addEventListener('DOMContentLoaded', () => {
  // Activate sidebar nav
  const sideBarElements = document.querySelectorAll('.sidenav');
  // eslint-disable-next-line no-undef
  M.Sidenav.init(sideBarElements);
  // Load Page Content
  let page = window.location.hash.substr(1);
  if (page === '') page = 'home';

  // eslint-disable-next-line no-shadow
  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        const content = document.querySelector('#body-content');
        if (xhttp.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = '<p>404 Page Not Found</p>';
        } else {
          content.innerHTML = '<p>You Cant Access This Page</p>';
        }
      }
    };
    xhttp.open('GET', `pages/${page}.html`, true);
    xhttp.send();
  }
  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status !== 200) return;

        // Load list menu link
        document
          .querySelectorAll('.topnav, .sidenav')
          .forEach((sideBarElement) => {
            const sideBarElementsItem = sideBarElement;
            sideBarElementsItem.innerHTML = xhttp.responseText;
          });

        // Sign event listener for each menu link
        document
          .querySelectorAll('.sidenav a, .topnav a')
          .forEach((sideBarElement) => {
            sideBarElement.addEventListener('click', (event) => {
              // Close sidenav
              const sidenav = document.querySelector('.sidenav');
              // eslint-disable-next-line no-undef
              M.Sidenav.getInstance(sidenav).close();

              // Load Called content page
              page = event.target.getAttribute('href').substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  loadPage(page);
  loadNav();
});
