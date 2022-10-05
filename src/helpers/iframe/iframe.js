import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

function downloadFile(url) {
    console.log(url)
  let $iframe, iframeDoc, iframeHtml;

  if (($iframe = window.$("#download_frame")).length === 0) {
    $iframe = window
      .$(
        '<iframe id="download_frame" style="display: none;" src="about:blank"></iframe>'
      )
      .appendTo("body");
  }

  iframeDoc = $iframe[0].contentWindow;
  if (iframeDoc.document) {
    iframeDoc = iframeDoc.document;
  }

  iframeHtml =
    '<html><head></head><body><form method="POST" action="' +
    url +
    '"><input type="hidden" name="0" value="' +
    "0" +
    '"></form></body></html>';

  iframeDoc.open();
  iframeDoc.write(iframeHtml);

  return window.$(iframeDoc).find("form").submit();
}

const iframe = {
  downloadFile: (url) => downloadFile(url)
};

export default iframe;
