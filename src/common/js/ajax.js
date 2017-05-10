function ajax (url, data) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr)
      } else {
        reject({
          errorType: 'status_error',
          xhr: xhr
        })
      }
    }
    xhr.onerror = reject
    xhr.send(data)
})
}