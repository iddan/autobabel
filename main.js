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
            try {
                brackets.fs.writeFile(
                    file.parentPath + '/js/' + file.name + '.js',
                    babel.transform(file.contents, []).code,
                    'utf8'
                );
            } catch (e) {
                var DefaultDialogs = brackets.getModule('widgets/DefaultDialogs');
                var Dialogs = brackets.getModule('widgets/Dialogs');
                Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_ERROR, "", "Unable to transform ES6 and JSX files into ES5, see the debug logs for details.");
                brackets.fs.writeFile(
                    file.parentPath + file.name + '.js',
                    '',
                    'utf8'
                );
                throw e;
            }
            break;
        }
    });
});
