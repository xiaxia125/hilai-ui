// 扩展 Window 接口
declare global {
  interface Window {
    webkitRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
    mozRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  }
}

Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
const requestAnimFrame = (typeof window !== 'undefined')
  ? (window.requestAnimationFrame || 
     window.webkitRequestAnimationFrame || 
     window.mozRequestAnimationFrame || 
     function(callback) { window.setTimeout(callback, 1000 / 60) })
  : function(callback) { setTimeout(callback, 1000 / 60) }

// 添加 isClient 判断
const isClient = typeof window !== 'undefined'

function setScrollTop(amount: number) {
  if (!isClient) return
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

function getScrollTop() {
  if (!isClient) return 0
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(amount) {
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

function position() {
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export function scrollTo(to: number, duration: number = 500, callback?: () => void) {
  if (!isClient) return
  const start = getScrollTop()
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = (typeof (duration) === 'undefined') ? 500 : duration
  var animateScroll = function() {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    setScrollTop(val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}
