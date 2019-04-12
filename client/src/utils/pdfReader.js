
// Basic node example that prints document metadata and text content.
// Requires single file built version of PDF.js -- please run
// `gulp singlefile` before running the example.
//

// Run `gulp dist-install` to generate 'pdfjs-dist' npm package files.
var pdfjsLib = require('pdfjs-dist');

export const pdfUtil = {
  extractText (typedarray) {
    let allTextData;
    var loadingTask = pdfjsLib.getDocument(typedarray);
    return loadingTask.promise.then(function(doc) {
      console.log(doc)
      var numPages = doc.numPages;
      // console.log('# Document Loaded');
      // console.log('Number of Pages: ' + numPages);

      var lastPromise; // will be used to chain promises
      lastPromise = doc.getMetadata().then(function (data) {
        // console.log('# Metadata Is Loaded');
        // console.log('## Info');
        console.log(JSON.stringify(data.info, null, 2));
        // console.log();
        if (data.metadata) {
          // console.log('## Metadata');
          console.log(JSON.stringify(data.metadata.getAll(), null, 2));
          // console.log();
        }
      });

      var loadPage = function (pageNum) {
        return doc.getPage(pageNum).then(function (page) {
          // console.log('# Page ' + pageNum);
          // var viewport = page.getViewport({ scale: 1.0, });
          // console.log('Size: ' + viewport.width + 'x' + viewport.height);
          return page.getTextContent().then(function (content) {
          // Content contains lots of information about the text layout and
          // styles, but we need only strings at the moment
            var strings = content.items.map(function (item) {
              return item.str;
            });
            allTextData += strings.join(' ');
          }).then(function () {
            console.log();
            return allTextData;
          });
        });
      };
      // Loading of the first page will wait on metadata and subsequent loadings
      // will wait on the previous pages.
      for (var i = 1; i <= numPages; i++) {
        lastPromise = lastPromise.then(loadPage.bind(null, i));
      }
      return lastPromise;
    }).then(function (lastPromise) {
      return lastPromise;
    }).catch(function (err) {
      console.error('Error: ' + err);
    });

  }
}