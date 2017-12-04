module.exports = {
    path: '',
    cache: false,
    render: (data, params) => {

        const title = data.title + " - Home";

        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>${title}</title>
                <link rel="stylesheet" href="http://${data.env}/style?name=index">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            </head>
            <body class="blue-grey darken-2 white-text">
                <div class="container">
                    <h1 class="center-align" style="margin-bottom: 0">Todd Lewis Studios</h1>
                    <div class="center-align" style="margin-bottom: 1em"><small>(Byrd OS)</small></div>
                    <hr>
                    <div class="row">
                        <div class="home-btn col s6 m3"><a href="/files"><i class="fa fa-archive"></i><span>Files</span></a></div>
                        <div class="home-btn col s6 m3"><a href="/chat"><i class="fa fa-comments"></i><span>Chat</span></a></div>
                    </div>
                </div>
            </body>
        </html>
        `;
    }
};