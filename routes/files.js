const fs = require('fs');
module.exports = {
    path: 'files',
    cache: false,
    render: (data, params) => {

        const path = params.path || "";

        const title = data.title + " - Files";

        let list = "";
        let breadcrumbs = "";

        if(!path)
            data.drives.forEach(drive=> {
                const name = drive.displayName;
                list += `<a class="col s12 btn grey" href="/files?path=${name}">${name} <small>(${drive.description})</small></a>`;
            });
        else if(fs.lstatSync(path).isDirectory()){
            let folders = '';
            let images = '';
            let files = '';
            fs.readdirSync(path).forEach(name=> {
                const isDir = fs.lstatSync(path + '\\' + name).isDirectory();
                const anchor = `<a class="col s12 btn grey" href="/files?path=${path + '/' + name}"><i class="fa fa-${isDir?'folder':'file'}"></i> ${name}</a>`;
                if(isDir)
                    folders += anchor;
                else if(name.includes('.png')) {
                    const itemPath = (path + '/' + name).replace(/\\/g, '/');
                    images += `<a class="col s3 m1 a-img" href="/files?path=${itemPath}"><img width="100%" src="/img?path=${itemPath}"></a>`;
                }else
                    files += anchor;
                list = folders + images + files;
            });
        }
        else return {file: path};

        path.split('/').forEach((breadcrumb, i)=> {
            if(!(i === 0 && breadcrumb === ''))
                breadcrumbs += `<a href="/files?path=${path.substring(0, path.indexOf(breadcrumb) + breadcrumb.length)}" class="bc a-img"><span>/</span> ${breadcrumb}</a>`
        });

        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>${title}</title>
                <style>
                    .btn{
                        margin-bottom: 3px;
                    }
                    .btn.grey:hover{
                        background-color: #ababab !important;
                    }
                    .a-img{
                        transition: .3s;
                    }
                    .a-img:hover{
                        background-color: rgba(255, 255, 255, .1);
                    }
                    .list-container{
                        padding-top: 10px;
                        overflow: auto;
                        border-bottom: 2px solid white;
                    }
                    .list-container::-webkit-scrollbar { 
                        display: none; 
                    }
                    .bc{
                        color: white;
                        padding: 9px 5px 9px 0;
                        height: 36px;
                        line-height: 32px;
                        overflow: hidden; 
                    }
                    .bc span{
                        padding-right: 5px;
                    }
                    .bc-container{
                        animation: bc-ani 1s;
                        display: inline-block;
                        overflow-x: auto;
                        white-space: nowrap;
                    }
                    .bc-container::-webkit-scrollbar { 
                        display: none; 
                    }
                    @keyframes bc-ani{
                        0%{
                            background: white;
                        }
                        100%{
                            background: rgba(0,0,0,0);
                        }
                    }
                    .bc i{
                        padding-right; 3px;
                    }
                </style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> 
            </head>
            <body class="blue-grey darken-2 white-text">
                <div class="container" style="padding-top: 10px">
                    <div class="row">
                        <a class="btn blue col s2" href="/">Home</a>
                        <div class="bc-container col s10">
                            <a class="bc a-img" href="/files">root</a>
                            ${breadcrumbs}
                        </div>
                    </div>
                    <div class="row list-container" id="list-container">
                        ${list}
                    </div>
                    <div class="row">
                        <input type="file" multiple="multiple">
                    </div>
                </div>
                <script>window.onload=function(){document.getElementById('list-container').style.height = innerHeight - 150 + 'px'}</script>
            </body>
        </html>
        `;
    }
};