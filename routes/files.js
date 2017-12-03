const fs = require('fs');
module.exports = {
    path: 'files',
    cache: false,
    render: (data, params) => {

        const path = params.path || "";

        const title = data.title + " - Files";

        let list = "";

        if(!path)
            data.drives.forEach(drive=> {
                const name = drive.displayName;
                list += `<a class="col s12 btn grey" href="/files?path=${name}">${name} <small>(${drive.description})</small></a>`;
            });
        else if(fs.lstatSync(path).isDirectory()){
            let folders = '';
            let files = '';
            fs.readdirSync(path).forEach(name=> {
                const isDir = fs.lstatSync(path + '\\' + name).isDirectory();
                const ele = `<a class="col s12 btn grey" href="/files?path=${path + '\\' + name}"><i class="fa fa-${isDir?'folder':'file'}"></i> ${name}</a>`;
                if(isDir)
                    folders += ele;
                else
                    files += ele;
                list = folders + files;
            });
        }
        else return {file: path};

        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>${title}</title> 
            </head>
            <body class="blue-grey darken-2 white-text">
                <div class="container" style="padding-top: 10px">
                    <a class="btn blue" href="/">Home</a>
                    ${path ? `<a class="btn blue" href="/files?path=${path.substring(0, path.lastIndexOf("\\")).replace(/\\/g, '/')}">Back</a>` : ''}
                    <div class="row" style="padding-top: 10px">
                        ${list}                
                    </div>
                </div>
                <style>
                    .btn{
                        margin-bottom: 3px;
                    }
                </style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            </body>
        </html>
        `;
    }
};