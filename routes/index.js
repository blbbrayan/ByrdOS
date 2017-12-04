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
            </head>
            <body class="blue-grey darken-2 white-text">
                <div class="container">
                    <h1 class="center-align" style="margin-bottom: 0">Todd Lewis Studios</h1>
                    <div class="center-align" style="margin-bottom: 1em"><small>(Byrd OS)</small></div>
                    <hr>
                    <div class="row">
                        <div class="home-btn col s3"><a href="/files"><i class="fa fa-archive"></i><span>Files</span></a></div>
                        <div class="home-btn col s3"><a href="/chat"><i class="fa fa-comment"></i><span>Chat</span></a><div>
                    </div>
                </div>
                <style>
                    hr{
                        border: 1px solid;
                    }
                    .home-btn{
                        text-align: center;
                    }
                    .home-btn a{
                        color: white;
                        width: 80%;
                        display: inline-block;
                        background: #9e9e9e;
                        height: 120px;
                        border-bottom: 6px solid white;
                        border-radius: 3px;
                        box-shadow: 0 3px 5px 0 rgba(0,0,0,0.3);
                        transition: .3s;
                    }
                    .home-btn a:hover{
                        background-color: #ababab;
                    }
                    .home-btn i{
                        display: block;
                        font-size: 30px;
                        padding: 25px;
                    }
                    .home-btn a:hover i{
                        animation: btn-hover 1s infinite;
                    }
                    @keyframes btn-hover {
                        0%{
                            padding-top: 25px;
                            padding-bottom: 25px;
                        }
                        50%{
                            padding-top: 20px;
                            padding-bottom: 30px;
                        }
                        100%{
                            padding-top: 25px;
                            padding-bottom: 25px;
                        }
                    }
                </style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            </body>
        </html>
        `;
    }
};