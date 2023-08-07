/*
해당 코드는 React 프로젝트의 service worker 등록과 관련된 코드입니다.
Service worker는 웹 앱의 성능과 오프라인 기능을 개선하기 위해 사용되는 기술로,
캐시를 활용하여 웹 앱의 자원들을 로컬에 저장하여 웹 페이지 로딩 속도를 향상시키고, 오프라인 상태에서도 일부 기능을 사용할 수 있도록 도와줍니다.

isLocalhost: 현재 호스트가 로컬환경인지를 판단하는 변수입니다.

register(): Service worker 등록을 수행하는 함수로, process.env.NODE_ENV가 'production'이고 브라우저가 service worker를 지원하는 경우 실행됩니다.

registerValidSW(swUrl): 올바른 Service worker 파일(swUrl)을 등록하는 함수입니다.

checkValidServiceWorker(swUrl): Service worker의 유효성을 검사하는 함수로, 서비스 워커가 존재하지 않거나 유효하지 않으면 페이지를 새로고침합니다.

unregister(): 등록된 Service worker를 해제하는 함수입니다.

크게 두 가지 시나리오를 다룹니다.
첫 번째 시나리오는 로컬 개발 환경에서 동작하는 경우(isLocalhost가 true인 경우)이고,
두 번째 시나리오는 실제 운영 환경에서 동작하는 경우(isLocalhost가 false인 경우)입니다.

로컬 개발 환경에서는 서비스 워커가 아직 등록되지 않았는지 확인하고, 서비스 워커와 관련된 추가 정보를 개발자에게 제공합니다.
운영 환경에서는 올바른 서비스 워커를 등록하고, 새로운 콘텐츠가 추가되었을 때 새로고침 메시지를 출력하거나 모든 콘텐츠가 오프라인으로 사용 가능함을 알려줍니다.

이 코드는 React 앱의 빌드 설정과 함께 작동하며, 프로덕션 환경에서 더 나은 사용자 경험을 제공하기 위해 service worker를 등록하는 것입니다.

[출처] Chat GPT
*/

// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
)

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location)
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl)

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://goo.gl/SC7cgQ'
          )
        })
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl)
      }
    })
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              console.log('New content is available; please refresh.')
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.')
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl)
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}
