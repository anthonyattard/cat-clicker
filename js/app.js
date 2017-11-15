var clickCount = 0;

$('#cat-1-img').click(function(e) {
    clickCount ++;
    $('#cat-1-count').text("You've clicked the cat " + clickCount + " times");
});


$('#cat-2-img').click(function(e) {
    clickCount ++;
    $('#cat-2-count').text("You've clicked the cat " + clickCount + " times");
});