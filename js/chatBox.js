$( document ).ready(()=> {
  const { origin } = parent
  const { name } = window
  const send = $('.send');
  
  parent.postMessage(`[system] - ${window.name} joined the conversation.`, origin);
  
  $(message).keyup(e => {
    message.value ? send.addClass('ready') : send.removeClass('ready');
  });
  
  $('form').on('submit', (e) => {
    e.preventDefault();
    parent.postMessage(`[${name}]: ${message.value}`, origin);
    message.value = '';
    send.removeClass('ready');
    })
  
  $(window).on("message", e => {
    const log = document.getElementById('log');
    $('#log').html(`${e.originalEvent.data.join('<br>')}`)
    $('#chat-box').animate({scrollTop: $(document).height()}, 'slow')
  });
})