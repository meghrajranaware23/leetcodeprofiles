const BOOT_PENDING_ATTR = 'data-boot-pending';

export function markBootPending() {
  document.documentElement.setAttribute(BOOT_PENDING_ATTR, '');
}

export function clearBootPending() {
  document.documentElement.removeAttribute(BOOT_PENDING_ATTR);
}
