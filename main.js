define(function (require, exports, module) {

    var DocumentManager = brackets.getModule('document/DocumentManager'),
        babel           = require('babel-5.8.22.min');

    DocumentManager.on('documentSaved', function () {
        var doc = DocumentManager.getCurrentDocument();
        var file = {
            parentPath: doc.file._parentPath,
            name: doc.file._name.split('.')[0],
            ext: doc.file._name.split('.').pop(),
            contents: doc.file._contents
        };
        switch (file.ext) {
        case 'jsx':
            brackets.fs.writeFile(
                file.parentPath + file.name + '.js',
                babel.transform(file.contents, []).code,
                'utf8'
            );
            break;
        }
    });
});
