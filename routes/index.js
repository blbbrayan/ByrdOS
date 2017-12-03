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
                <title>${title}</title>
            </head>
            <body class="blue-grey darken-2 white-text">
                <div class="container">
                    <h1 class="center-align" style="margin-bottom: 0">Todd Lewis Studios</h1>
                    <div class="center-align" style="margin-bottom: 1em"><small>(Byrd OS)</small></div>
                    <hr>
                    <div class="row">
                        <a class="btn col s12 grey" href="/files">files</a>                    
                    </div>
                </div>
                <style>
                    hr{
                        border: 1px solid;
                    }
                    
                </style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
            </body>
        </html>
        `;
    }
};