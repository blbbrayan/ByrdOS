window.onload=function(){
    /*load chat size*/document.getElementById('chat-container').style.height = innerHeight - 150 + 'px';
    /*change window location*/if(location.pathname !== '/chat') location.pathname = '/chat';
    /*change window location*/else if(location.search !== '') location.search = '';
};
/*send chat msg*/function submit(){window.open('http://localhost/msg?msg='+document.getElementById('chat').value,'_self')}