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
                <link rel="stylesheet" href="http://${data.env}/style?name=chat">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            </head>
            <body class="blue-grey darken-2 white-text" style="overflow: hidden;">
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
                <script src="http://${data.env}/script?name=chat"></script>
            </body>
        </html>
        `;
    }
};