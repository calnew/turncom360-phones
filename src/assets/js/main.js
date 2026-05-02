/* =========================================================
   TurnCom360 — Plug & Play Phone Systems
   main.js — mobile menu, smooth scroll, comparison table hover
   ========================================================= */
(function() {
  'use strict';

  /* ============ Mobile menu toggle ============ */
  var toggle = document.querySelector('.mobile-toggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ============ Smooth scroll for on-page anchors ============ */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = anchor.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ============ Comparison table: highlight TurnCom360 column on row hover ============
     The .ours cells already have CSS hover, but this adds a visual column emphasis
     on the TurnCom360 column header when any row is hovered.
  ============ */
  var table = document.querySelector('.compare-table');
  if (table) {
    var rows = table.querySelectorAll('tbody tr');
    rows.forEach(function(row) {
      row.addEventListener('mouseenter', function() {
        var ourCell = row.querySelector('td.ours');
        if (ourCell) ourCell.style.outline = '2px solid rgba(192,57,43,0.3)';
      });
      row.addEventListener('mouseleave', function() {
        var ourCell = row.querySelector('td.ours');
        if (ourCell) ourCell.style.outline = '';
      });
    });
  }

})();
