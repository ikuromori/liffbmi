var params = (new URL(document.location)).searchParams;

$(function () {
    $('form').submit(function () {
        var height = $('textarea[name="height"]').val();
        var weight = $('textarea[name="weight"]').val();        
        var msg = `身長+${height}\n体重+${weight}`;
        sendText(msg);
        return false;
    });
});
