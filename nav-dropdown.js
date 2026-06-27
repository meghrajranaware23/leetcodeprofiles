const DEFAULT_GAP = 8;
const DEFAULT_VIEWPORT_PAD = 16;

const controllersByDropdownId = new Map();

export function closeNavDropdown(dropdownId) {
  controllersByDropdownId.get(dropdownId)?.close();
}

export function portalDropdown(dropdown) {
  if (dropdown.parentElement === document.body) return;
  dropdown._navDropdownHome = dropdown.parentElement;
  document.body.appendChild(dropdown);
}

export function restoreDropdown(dropdown) {
  const home = dropdown._navDropdownHome;
  if (home && dropdown.parentElement === document.body) {
    home.appendChild(dropdown);
  }
  dropdown.style.top = '';
  dropdown.style.left = '';
  dropdown.style.visibility = '';
}

export function positionNavDropdown({
  trigger,
  dropdown,
  align = 'start',
  gap = DEFAULT_GAP,
  viewportPad = DEFAULT_VIEWPORT_PAD,
}) {
  if (!trigger || !dropdown || dropdown.hidden) return;

  portalDropdown(dropdown);

  const triggerRect = trigger.getBoundingClientRect();
  let top = triggerRect.bottom + gap;

  dropdown.style.visibility = 'hidden';
  dropdown.style.top = `${top}px`;
  dropdown.style.left = '0px';

  const dropRect = dropdown.getBoundingClientRect();
  let left = align === 'end'
    ? triggerRect.right - dropRect.width
    : triggerRect.left;

  if (left + dropRect.width > window.innerWidth - viewportPad) {
    left = Math.max(viewportPad, window.innerWidth - viewportPad - dropRect.width);
  }
  if (left < viewportPad) {
    left = viewportPad;
  }

  if (top + dropRect.height > window.innerHeight - viewportPad) {
    top = Math.max(viewportPad, triggerRect.top - gap - dropRect.height);
  }

  dropdown.style.top = `${top}px`;
  dropdown.style.left = `${left}px`;
  dropdown.style.visibility = '';
}

export function createNavDropdownController({
  triggerId,
  dropdownId,
  align = 'start',
  gap = DEFAULT_GAP,
  viewportPad = DEFAULT_VIEWPORT_PAD,
  bindKey = 'navDropdownBound',
  onOpen,
  onClose,
}) {
  function getElements() {
    return {
      trigger: document.getElementById(triggerId),
      dropdown: document.getElementById(dropdownId),
    };
  }

  function position() {
    const { trigger, dropdown } = getElements();
    positionNavDropdown({ trigger, dropdown, align, gap, viewportPad });
  }

  function close() {
    const { trigger, dropdown } = getElements();
    if (!dropdown || dropdown.hidden) return;

    dropdown.hidden = true;
    restoreDropdown(dropdown);
    trigger?.classList.remove('active');
    trigger?.setAttribute('aria-expanded', 'false');
    onClose?.();
  }

  function open() {
    const { trigger, dropdown } = getElements();
    if (!trigger || !dropdown) return;

    onOpen?.();
    dropdown.hidden = false;
    trigger.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
    position();
  }

  function toggle() {
    const { dropdown } = getElements();
    if (!dropdown) return;
    if (dropdown.hidden) open();
    else close();
  }

  function bind() {
    if (document.body.dataset[bindKey]) return;
    document.body.dataset[bindKey] = 'true';

    document.addEventListener('click', (e) => {
      const { trigger, dropdown } = getElements();
      if (!trigger || !dropdown) return;

      if (e.target.closest(`#${CSS.escape(triggerId)}`)) {
        toggle();
        return;
      }

      if (e.target.closest(`#${CSS.escape(dropdownId)}`)) {
        if (
          e.target.closest('.nav-dropdown__item, .courses-nav-dropdown__item, .site-nav-dropdown__item, .nav-dropdown__footer a[data-nav-close]')
        ) {
          close();
        }
        return;
      }

      if (!dropdown.hidden) {
        close();
      }
    });

    document.addEventListener('keydown', (e) => {
      const { dropdown, trigger } = getElements();
      if (e.key === 'Escape' && dropdown && !dropdown.hidden) {
        close();
        trigger?.focus();
      }
    });

    window.addEventListener('resize', () => {
      const { dropdown } = getElements();
      if (dropdown && !dropdown.hidden) {
        position();
      }
    });

    window.addEventListener(
      'scroll',
      () => {
        const { dropdown } = getElements();
        if (dropdown && !dropdown.hidden) {
          close();
        }
      },
      true,
    );
  }

  function removeOrphan() {
    const orphan = document.getElementById(dropdownId);
    if (orphan?.parentElement === document.body) {
      orphan.remove();
    }
  }

  const controller = { open, close, toggle, position, bind, removeOrphan, getElements };
  controllersByDropdownId.set(dropdownId, controller);
  return controller;
}
