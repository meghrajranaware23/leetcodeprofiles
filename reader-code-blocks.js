/* ══════════════════════════════════════════════════════════
   READER CODE BLOCKS — Shared copy buttons & tabbed code
   Used by all Ascension pack readers
   ══════════════════════════════════════════════════════════ */

const LANG_TAB_PREF_KEY = 'ascension-lang-pref';

const LANG_MAP = {
  'c++': { lang: 'cpp', label: 'C++' },
  'cpp': { lang: 'cpp', label: 'C++' },
  'python': { lang: 'python', label: 'Python' },
  'java': { lang: 'java', label: 'Java' },
};

const COPY_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

const CHECK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

export function getPreferredLang() {
  return localStorage.getItem(LANG_TAB_PREF_KEY) || 'cpp';
}

export function setPreferredLang(lang) {
  localStorage.setItem(LANG_TAB_PREF_KEY, lang);
}

export function isSolutionCodeBlock(pre) {
  if (pre.classList.contains('cr-diagram-block')) return false;
  if (pre.closest('.cr-solution-zone-content')) return true;
  if (pre.closest('details.cr-test-solution')) return true;
  return false;
}

export function wrapSolutionSection(root) {
  const h2s = root.querySelectorAll('h2');
  let solutionH2 = null;
  h2s.forEach(h2 => {
    if (/^solution$/i.test(h2.textContent.trim()) || /solution/i.test(h2.textContent)) {
      solutionH2 = h2;
    }
  });
  if (!solutionH2 || solutionH2.closest('.cr-solution-zone-content')) return null;

  const wrapper = document.createElement('div');
  wrapper.className = 'cr-solution-zone-content';
  solutionH2.parentNode.insertBefore(wrapper, solutionH2);
  let node = solutionH2;
  while (node) {
    const next = node.nextElementSibling;
    wrapper.appendChild(node);
    node = next;
  }
  return wrapper;
}

export function prepareSolutionRegions(root, lesson) {
  wrapSolutionSection(root);
  if (lesson?.type === 'test') {
    const details = root.querySelector('details');
    if (details) {
      details.classList.add('cr-test-solution');
    }
  }
}

export function postProcessCodeBlocks(root) {
  root.querySelectorAll('pre code').forEach(block => {
    if (block.closest('.cr-diagram-block')) return;
    if (!block.classList.contains('hljs')) {
      hljs.highlightElement(block);
    }
  });
}

function attachCopyButton(pre) {
  if (pre.querySelector('.cr-copy-btn')) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'cr-copy-btn';
  btn.innerHTML = COPY_ICON;
  btn.setAttribute('aria-label', 'Copy code');
  btn.title = 'Copy code';

  btn.addEventListener('click', () => {
    const code = pre.querySelector('code');
    if (!code) return;

    navigator.clipboard.writeText(code.textContent).then(() => {
      btn.innerHTML = CHECK_ICON;
      btn.classList.add('copied');
      btn.setAttribute('aria-label', 'Copied');
      setTimeout(() => {
        btn.innerHTML = COPY_ICON;
        btn.classList.remove('copied');
        btn.setAttribute('aria-label', 'Copy code');
      }, 2000);
    });
  });

  pre.style.position = 'relative';
  pre.appendChild(btn);
}

export function addCopyButtons(root) {
  root.querySelectorAll('pre').forEach(pre => {
    if (!isSolutionCodeBlock(pre)) return;
    attachCopyButton(pre);
  });
}

function switchTab(container, lang) {
  container.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  container.querySelectorAll('.code-tab-content').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.lang === lang);
  });
  setPreferredLang(lang);
}

function getTabScanRoots(root) {
  const roots = [root];
  root.querySelectorAll('.cr-solution-zone-content, details.cr-test-solution').forEach(el => {
    if (!roots.includes(el)) roots.push(el);
  });
  return roots;
}

function processTabGroupsInContainer(container, preferredLang) {
  const children = Array.from(container.children);
  let i = 0;

  while (i < children.length) {
    const el = children[i];

    if (el.tagName === 'H3') {
      const headerText = el.textContent.trim().toLowerCase();
      const langInfo = LANG_MAP[headerText];

      if (langInfo) {
        const group = [];
        let j = i;

        while (j < children.length) {
          const hEl = children[j];
          if (hEl.tagName !== 'H3') break;

          const hText = hEl.textContent.trim().toLowerCase();
          const hLang = LANG_MAP[hText];
          if (!hLang) break;

          const preEl = children[j + 1];
          if (!preEl || preEl.tagName !== 'PRE') break;

          group.push({
            lang: hLang.lang,
            label: hLang.label,
            headerEl: hEl,
            preEl,
          });
          j += 2;
        }

        if (group.length >= 2) {
          const tabContainer = document.createElement('div');
          tabContainer.className = 'code-tabs';

          const btnRow = document.createElement('div');
          btnRow.className = 'code-tab-buttons';

          group.forEach((item, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'code-tab-btn' + (
              item.lang === preferredLang
                ? ' active'
                : (idx === 0 && !group.some(g => g.lang === preferredLang) ? ' active' : '')
            );
            btn.dataset.lang = item.lang;
            btn.textContent = item.label;
            btn.addEventListener('click', () => switchTab(tabContainer, item.lang));
            btnRow.appendChild(btn);
          });

          if (!btnRow.querySelector('.active')) {
            btnRow.firstChild.classList.add('active');
          }

          tabContainer.appendChild(btnRow);

          const activeLang = btnRow.querySelector('.active')?.dataset.lang;
          group.forEach((item) => {
            const panel = document.createElement('div');
            panel.className = 'code-tab-content' + (item.lang === activeLang ? ' active' : '');
            panel.dataset.lang = item.lang;

            const clonedPre = item.preEl.cloneNode(true);
            clonedPre.querySelector('.cr-copy-btn')?.remove();
            panel.appendChild(clonedPre);

            if (isSolutionCodeBlock(item.preEl)) {
              attachCopyButton(clonedPre);
            }

            tabContainer.appendChild(panel);
          });

          group[0].headerEl.parentNode.insertBefore(tabContainer, group[0].headerEl);
          group.forEach(item => {
            item.headerEl.remove();
            item.preEl.remove();
          });

          i = Array.from(container.children).indexOf(tabContainer) + 1;
          children.length = 0;
          children.push(...Array.from(container.children));
          continue;
        }
      }
    }
    i++;
  }
}

export function createTabbedCodeBlocks(root, preferredLang = getPreferredLang()) {
  getTabScanRoots(root).forEach(scanRoot => {
    processTabGroupsInContainer(scanRoot, preferredLang);
  });
}

export function processLessonCodeBlocks(root, lesson) {
  prepareSolutionRegions(root, lesson);
  postProcessCodeBlocks(root);
  addCopyButtons(root);
  createTabbedCodeBlocks(root, getPreferredLang());
}
