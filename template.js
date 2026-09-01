// Template system - ładuje header i sidebar na każdej stronie
(function() {
  'use strict';

  // Header HTML
  const headerHTML = `
    <header class="eud-page-header">
      <div class="eud-page-header-container">
        <a href="/index.html" class="eud-page-logo-link">
          <img src="https://cdn.prod.website-files.com/699727cab4fdc7be0c710882/6998471017ae8da96d921632_501ee60c4c1aaf1ae38225dd1e503cd1_Logo.svg" alt="TrueLoyal Logo" class="eud-page-logo">
        </a>
        <div class="eud-page-header-actions" id="header-actions">
          <!-- Dynamically filled by pages -->
        </div>
      </div>
    </header>
  `;

  // Sidebar HTML
  const sidebarHTML = `
    <aside class="eud-page-sidebar">
      <nav class="eud-page-nav">
        <ul>
          <li>
            <h1>Local Files</h1>
          </li>
          <li>
            <h4>Webcomponent</h4>
            <a href="/embeds/local/webcomponent.html">✅ Webcomponent Files</a>
          </li>
          <li>
            <h4>Iframe to Webcomponent</h4>
            <a href="/embeds/local/iframe_to_webcomponent.html">✅ Artur's Account</a>
          </li>
          <li>
            <h4>Iframe</h4>
            <a href="/embeds/local/iframe.html">✅ Artur's Account</a>
          </li>

          <li>
            <h1>Production</h1>
          </li>
          <li>
            <h4>Webcomponent</h4>
            <a href="/embeds/webcomponent.html">✅ New Webcomponent</a>
          </li>
          <li>
            <h4>Iframe</h4>
            <a href="/embeds/artur_iframe.html">✅ Artur IFRAME</a>
          </li>
          <li>
            <a href="/embeds/embed_eud_test_karola.html">✅ Karola IFRAME</a>
            <a href="/embeds/embed_eud_test_karola_isDev.html">Karola WebComponent</a>
          </li>

          <li>
            <h1>Tests</h1>
          </li>
          <li>
            <a href="/embeds/script_old_snipet_artur.html">#4 Artur all.js CDN</a>
            <a href="/embeds/script_old_snipet_artur_2.html">Artur all.js Local</a>
            <a href="/embeds/test.html">Karola Test</a>
            <a href="/embeds/test_artur.html">Artur Test</a>
          </li>
        </ul>
      </nav>
    </aside>
  `;

  // Funkcja do załadowania template
  function loadTemplate() {
    const body = document.body;

    // Dodaj header na początek body
    body.insertAdjacentHTML('afterbegin', headerHTML);

    // Znajdź lub stwórz container
    let container = document.querySelector('.eud-page-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'eud-page-container';

      // Przenieś całą zawartość body (poza headerem) do containera jako main
      const main = document.createElement('main');
      main.className = 'eud-page-main';

      // Przenieś wszystkie dzieci body (poza headerem) do main
      const children = Array.from(body.children).filter(child =>
        !child.classList.contains('eud-page-header')
      );
      children.forEach(child => main.appendChild(child));

      // Dodaj sidebar i main do containera
      container.innerHTML = sidebarHTML;
      container.appendChild(main);

      body.appendChild(container);
    }

    // Oznacz aktywny link w menu
    highlightActiveLink();
  }

  // Podświetl aktywny link
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.eud-page-nav a');

    links.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  }

  // Załaduj template gdy DOM jest gotowy
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTemplate);
  } else {
    loadTemplate();
  }

  // Eksportuj funkcję do dodawania rzeczy do header actions
  window.EUDTemplate = {
    addHeaderAction: function(html) {
      const actions = document.getElementById('header-actions');
      if (actions) {
        actions.insertAdjacentHTML('beforeend', html);
      }
    }
  };
})();
