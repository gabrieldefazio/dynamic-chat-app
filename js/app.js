'use strict';

function addChat() {
  const iframe = document.createElement('iframe');
  iframe.src = 'chatBox.html';
  document.body.appendChild(iframe);
}

function message() {
}