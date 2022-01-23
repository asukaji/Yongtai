export function isMobile() {
  return /android/gi.test(navigator.userAgent) || /iphone|ipod|itouch/gi.test(navigator.userAgent);
}

export function shouldRenderMobileView(href = window.location.href) {
  if (isMobile()) return true;
  const [, , platform] = href.split(/\/+/);
  return platform === 'm';
}

let lastViewP = renderView();

function renderView() {
  if (lastViewP) lastViewP.then(instance => instance.destroy());
  if (shouldRenderMobileView()) {
    return import(
      /* webpackChunkName: "mobile" */
      './main-mobile'
    );
  } else {
    return import(
      /* webpackChunkName: "desktop" */
      './main-desktop'
    );
  }
}
