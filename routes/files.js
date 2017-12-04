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
            const pathFiles = fs.readdirSync(path.substr(path.length-1) === ':' ? path + '/' : path);
            pathFiles.forEach(name=> {
                if(name.substring(0, 1) === '.')
                    return null;
                console.log('name', name);
                const isDir = fs.lstatSync(path + '/' + name).isDirectory();
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
        else return {file: path.replace(/\//g, '\\')};

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
                <link rel="stylesheet" href="http://${data.env}/style?name=files">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> 
            </head>
            <body class="blue-grey darken-2 white-text" style="overflow: hidden">
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
                        <input type="file" name="file" id="file" multiple="multiple">
                        <label for="file" class="file" id="file-label"><i class="fa fa-cloud-upload"></i> Upload Files</label>
                    </div>
                </div>
                <script src="http://${data.env}/script?name=files"></script>
            </body>
        </html>
        `;
    }
};