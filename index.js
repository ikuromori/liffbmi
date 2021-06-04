var params = (new URL(document.location)).searchParams;

$(function () {
    $('form').submit(function () {
        var height = $('textarea[name="height"]').val();
        var weight = $('textarea[name="weight"]').val();        
        var msg = `${height}${weight}`;
        sendText(msg);
        return false;
    });
});
