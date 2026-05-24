/* ============================================================
   DCN Final Review — Shared Scripts
   Theme toggle, sidebar TOC scrollspy, copy buttons, quiz logic
   ============================================================ */

(function() {
  'use strict';

  // ---------- Theme ----------
  const root = document.documentElement;
  const stored = localStorage.getItem('dcn-theme');
  if (stored === 'dark') root.setAttribute('data-theme', 'dark');

  function toggleTheme() {
    const cur = root.getAttribute('data-theme');
    if (cur === 'dark') {
      root.removeAttribute('data-theme');
      localStorage.setItem('dcn-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('dcn-theme', 'dark');
    }
    updateThemeIcon();
  }
  function updateThemeIcon() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  }
  window.addEventListener('DOMContentLoaded', () => {
    updateThemeIcon();
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);

    // Active nav link
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.topnav .nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });

    setupCopyButtons();
    setupScrollSpy();
    setupQuizzes();
  });

  // ---------- Copy buttons on code blocks ----------
  function setupCopyButtons() {
    document.querySelectorAll('pre').forEach(pre => {
      if (pre.parentElement.classList.contains('code-wrap')) return;
      const wrap = document.createElement('div');
      wrap.className = 'code-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', () => {
        const txt = pre.innerText;
        navigator.clipboard.writeText(txt).then(() => {
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 1500);
        });
      });
      wrap.appendChild(btn);
    });
  }

  // ---------- Sidebar TOC scrollspy ----------
  function setupScrollSpy() {
    const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
    if (sidebarLinks.length === 0) return;
    const sections = Array.from(sidebarLinks)
      .map(a => document.getElementById(a.getAttribute('href').slice(1)))
      .filter(el => el !== null);

    function update() {
      const offset = 80;
      let activeIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top - offset < 0) activeIdx = i;
      }
      sidebarLinks.forEach((a, i) => {
        a.classList.toggle('toc-active', i === activeIdx);
      });
    }
    update();
    window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  }

  // ---------- Quiz logic ----------
  function setupQuizzes() {
    document.querySelectorAll('.quiz-q').forEach(q => {
      const type = q.dataset.type || 'mc';

      if (type === 'mc') {
        const options = q.querySelectorAll('.q-options li');
        let selected = null;
        options.forEach(li => {
          li.addEventListener('click', () => {
            if (q.classList.contains('answered')) return;
            options.forEach(o => o.classList.remove('selected'));
            li.classList.add('selected');
            selected = li;
          });
        });
        const submitBtn = q.querySelector('.btn-submit');
        const explainBtn = q.querySelector('.btn-explain');
        const explainBox = q.querySelector('.q-explain');
        if (submitBtn) {
          submitBtn.addEventListener('click', () => {
            if (!selected) { alert('请先选择一个选项 / Please pick an option'); return; }
            const correctIdx = parseInt(q.dataset.answer, 10);
            options.forEach((o, i) => {
              o.classList.remove('selected');
              if (i === correctIdx) o.classList.add('correct');
              else if (o === selected) o.classList.add('incorrect');
            });
            q.classList.add('answered');
            submitBtn.disabled = true;
          });
        }
        if (explainBtn && explainBox) {
          explainBtn.addEventListener('click', () => {
            explainBox.style.display = explainBox.style.display === 'block' ? 'none' : 'block';
          });
        }
      } else if (type === 'blank') {
        const inputs = q.querySelectorAll('.q-blank input');
        const submitBtn = q.querySelector('.btn-submit');
        const explainBtn = q.querySelector('.btn-explain');
        const explainBox = q.querySelector('.q-explain');
        const feedback = q.querySelector('.q-feedback');
        if (submitBtn) {
          submitBtn.addEventListener('click', () => {
            const answers = (q.dataset.answer || '').split('|').map(s => s.trim().toLowerCase());
            const userVals = Array.from(inputs).map(i => i.value.trim().toLowerCase());
            const allCorrect = userVals.every((v, i) => {
              const accepted = answers[i] ? answers[i].split(',').map(s => s.trim()) : [];
              return accepted.includes(v);
            });
            inputs.forEach(i => i.style.borderColor = allCorrect ? '#22c55e' : '#ef4444');
            if (feedback) {
              feedback.textContent = allCorrect ? '✓ 正确 Correct!' : '✗ 不对，参考答案：' + answers.join(', ');
              feedback.style.color = allCorrect ? '#16a34a' : '#dc2626';
              feedback.style.display = 'block';
            }
            q.classList.add('answered');
          });
        }
        if (explainBtn && explainBox) {
          explainBtn.addEventListener('click', () => {
            explainBox.style.display = explainBox.style.display === 'block' ? 'none' : 'block';
          });
        }
      } else if (type === 'open') {
        const explainBtn = q.querySelector('.btn-explain');
        const explainBox = q.querySelector('.q-explain');
        if (explainBtn && explainBox) {
          explainBtn.addEventListener('click', () => {
            explainBox.style.display = explainBox.style.display === 'block' ? 'none' : 'block';
          });
        }
      }
    });
  }
})();
