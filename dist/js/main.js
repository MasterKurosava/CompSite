(function(){
  var body = document.body,
      startX = -50,
      startY = -50,
      w = document.documentElement.offsetWidth,
      h = document.documentElement.offsetHeight;

	body.addEventListener('mousemove', function(evt){
    var posX = Math.round(evt.clientX / w * startX)
    var posY = Math.round(evt.clientY / h * startY)
    body.style.backgroundPosition = posX + 'px ' + posY + 'px'
  })
})()