
$( document ).ready(()=> {
  let count=1;
  const { origin } = window
  
  $('#iFrame-adder').click(() => {
    let counter = count++ ;
    
    $("body").append(`
        <div class="chat-wrap">
            <h2>iFrame${counter}</h2>
            <div class="fa fa-times fa-2x close"></div>
            <div class="iframe-wrap">
                <iframe class="chat" name="iFrame${counter}" src="./chatBox.html"></iframe>
            </div>
        </div>
    `)
    
    $('.chat-wrap').drags()
    
    $('.close').off('mousedown', close);
    $('.close').on('mousedown', close);
  });
  
  
  let messages = [];
  
  window.addEventListener('message', (e) => {
    messages.push(e.data);
    
    $('iframe').each(i => {
      $('iframe')[i].contentWindow.postMessage(messages, origin)
    });
  }, false);
  
  
  function close(e) {
    e.stopPropagation();
    const name = $(this).parent().children(":first").html();
    $(this).parent().remove()
  
    messages.push(`[system] - ${name} left the conversation.`);
    
   $('iframe').each(i => {
     $('iframe')[i].contentWindow.postMessage(messages, origin)
   });
  }
  
  //taken from jQuery UI draggable
  let zIndex = 1
  $.fn.drags = function (opt) {
    opt = $.extend({handle: "", cursor: "move"}, opt);
    if (opt.handle === "") {
      var $el = this;
    } else {
      var $el = this.find(opt.handle);
    }
    return $el.css('cursor', opt.cursor).on("mousedown", function (e) {
      if (opt.handle === "") {
        var $drag = $(this).addClass('draggable');
      } else {
        var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
      }
      var z_idx = $drag.css('z-index'),
        drg_h = $drag.outerHeight(),
        drg_w = $drag.outerWidth(),
        pos_y = $drag.offset().top + drg_h - e.pageY,
        pos_x = $drag.offset().left + drg_w - e.pageX;
      $drag.css('z-index', zIndex++).parents().on("mousemove", function (e) {
        $('.draggable').offset({
          top: e.pageY + pos_y - drg_h,
          left: e.pageX + pos_x - drg_w
        }).on("mouseup", function () {
          $(this).removeClass('draggable').css('z-index', z_idx);
        });
      });
      e.preventDefault(); // disable selection
    }).on("mouseup", function () {
      if (opt.handle === "") {
        $(this).removeClass('draggable');
      } else {
        $(this).removeClass('active-handle').parent().removeClass('draggable');
      }
    });
  }
})
