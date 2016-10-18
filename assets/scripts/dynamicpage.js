$(function() {
    var newHash      = "",
        $mainContent = $("#content-wrapper"),
        $pageWrap    = $("#page-wrap"),
        baseHeight   = 200,
        $el;

    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();

    $("nav").delegate("a", "click", function() {
        _filePath = $(this).attr("href");
        loadContent(_filePath);
        _browserPath = _filePath.substring(_filePath.lastIndexOf("/")+1,_filePath.lastIndexOf(".")); //get filename only
        history.pushState(null, null, _browserPath);

        return false;
    });

    function loadContent(href){
        $mainContent
        .find("#content")
        .fadeOut(200, function() {
            $mainContent.hide().load(href + " #content", function() {
                $mainContent.fadeIn(200, function() {
                    $pageWrap.animate({
                        height: baseHeight + $mainContent.height() + "px"
                    });
                });
                $("nav a").removeClass("current");
                // $("nav a[href$="+href+"]").addClass("current");
            });
        });
    }

    $(window).bind('popstate', function(){
       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
       loadContent(_link);
    });
});
