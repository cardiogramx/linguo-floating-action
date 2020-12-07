(function ($) {
    'use strict';

    function renderView() {

        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = "https://www.linguoapis.com/linguofab/linguo.fab.css";
        document.head.prepend(link);

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js';
        document.head.appendChild(script);

        var customClass = $("#linguo-fab-element").data('linguofab-class');

        customClass = customClass ? customClass : "bg-success text-white";

        console.log(customClass)

        var str =
            `<div class="fixed-action-btn"> \
      <a class="btn-floating btn-large ${customClass}"> \
        <i class="gd-music-alt"></i> \
      </a> \
      <ul> \
        <li><a class="btn-floating" id="male"><i class="text-primary">M</i></a></li> \
        <li><a class="btn-floating" id="female"><i class="text-success">F</i></a></li> \
      </ul> \
    </div>`;

        var floatbar = document.createElement("div");
        floatbar.innerHTML = str;

        document.body.appendChild(floatbar);
    }

    function getAllText() {

        var el = document.getElementById('linguo-fab-element');

        var walker = document.createTreeWalker(
            el ? el : document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        var node;
        var temp;
        var textNodes = [];

        while (node = walker.nextNode()) {
            if ((temp = node.nodeValue.replace(/[^a-zA-Z0-9./' ]/g, " ").trim()) != '')
                textNodes.push(temp);
        }

        console.log(textNodes.join(" "))
        return textNodes.join(" ");
    }

    renderView();

    $(document).ready(function () {

        setTimeout(function () { $('.fixed-action-btn').floatingActionButton(); }, 5000);

        var hostname = document.location.hostname;

        $('#male').on('click', function () {
            $.ajax({
                url: 'https://www.linguoapis.com/api/v1/Speech/GetAudioFromText',
                method: 'POST',
                contentType: 'application/json',
                dataType: 'binary',
                processData: 'false',
                data: JSON.stringify({
                    text: getAllText(),
                    source: "en",
                    target: "en",
                    gender: "male"
                }),
                xhrFields: {
                    responseType: 'blob'
                },
                success: function (data) {
                    var a = document.createElement('a');
                    var url = window.URL.createObjectURL(data);
                    a.href = url;
                    a.download = (hostname ? hostname : 'audio') + '.wav';
                    document.body.append(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                }
            });
        });

        $('#female').on('click', function () {
            $.ajax({
                url: 'https://www.linguoapis.com/api/v1/Speech/GetAudioFromText',
                method: 'POST',
                contentType: 'application/json',
                dataType: 'binary',
                processData: 'false',
                data: JSON.stringify({
                    text: getAllText(),
                    source: "en",
                    target: "en",
                    gender: "female"
                }),
                xhrFields: {
                    responseType: 'blob'
                },
                success: function (data) {
                    var a = document.createElement('a');
                    var url = window.URL.createObjectURL(data);
                    a.href = url;
                    a.download = (hostname ? hostname : 'audio') + '.wav';
                    document.body.append(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                }
            });
        });

    });

})(jQuery);
