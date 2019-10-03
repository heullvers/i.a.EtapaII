const PLAYER_TOKEN = 'X'
const COMPUTER_TOKEN = 'Y'

$(document).ready(function(){
    const grid = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    
    $('.col').click(function(){
        $(this).html(PLAYER_TOKEN)
    });
});

