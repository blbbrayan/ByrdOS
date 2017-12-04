module.exports = {
    path: 'chat',
    cache: false,
    render: (data, params) => {

        const title = data.title + " - Chat";

        const chat = data.chat || [];

        let chatItems = '';
        chat.forEach(chatItem => chatItems += `<div class="chat">${chatItem}</div>`);

        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>${title}</title>
            </head>
            <body class="blue-grey darken-2 white-text"> 
                <div class="container" style="padding-top: 10px">
                    <div class="row">
                        <div class="row">
                            <a class="btn blue col s2" href="/">Home</a>
                        </div>
                        <div class="row chat-container" id="chat-container">
                            ${chatItems !== '' ? chatItems : `<span>No messages found</span>`}
                        </div>
                        <div class="chat-input row">
                            <input id="chat" class="col s10" placeholder="Chat">
                            <a class="col s2" onclick="submit()"><i class="fa fa-commenting"></i></a>
                        </div>
                    </div>
                </div> 
                <script>
                window.onload=function(){
                    /*load chat size*/document.getElementById('chat-container').style.height = innerHeight - 150 + 'px';
                    /*change window location*/if(location.pathname !== '/chat') location.pathname = '/chat';
                    /*change window location*/else if(location.search !== '') location.search = '';
                };
                /*send chat msg*/function submit(){window.open('http://localhost/msg?msg='+document.getElementById('chat').value,'_self')}
                </script>
                <style>
                    .chat-container{
                        border: 4px solid white;
                        border-radius: 6px;
                        background-color: rgba(255,255,255,.05);
                    }
                    .chat-container span{
                        width: 100%;
                        text-align: center;
                        display: block;
                        margin-top: 33%;
                        font-size: 150%;
                    }
                    .chat-input{
                        border: 2px solid white;
                        border-radius: 3px;
                        height: 50px;
                        text-align: center;
                        color: white;
                    }
                    .chat-input input{
                        border: none !important;
                        height: 44px !important;
                        background-color: rgba(255,255,255,0.1) !important;
                    }
                    .chat-input a{
                        height: 46px;
                        line-height: 46px;
                        color: white;
                        font-size: 150%;
                        border-left: 2px solid white;
                        background-color: #2196f3;
                    }
                </style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            </body>
        </html>
        `;
    }
};