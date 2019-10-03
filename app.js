const JOGADOR_TOKEN = 'X'
const COMPUTADOR_TOKEN = 'Y'

$(document).ready(function(){
    const grid = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    function acabouJogo(){
        //Verifica se o jogo acabou
        //Verificar horizontal, vertical e diagonal

        //Horizontal
        for (var i = 0; i < 3; i++) {
            if(grid[i][0] !== ' ' && grid[i][0] === grid[i][1] && grid[i][0] == grid[i][2]){
                return grid[i][0]
            }
        }

        //Vertical
        for (var i = 0; i < 3; i++) {
            if(grid[0][i] !== ' ' && grid[0][i] === grid[1][i] && grid[0][i] == grid[2][i]){
                return grid[0][i]
            }
        }

        //Diagonais
        //Topo esquerda
        if(grid[0][0] !== ' ' && grid[0][0] === grid[1][1] && grid[0][0] == grid[2][2]){
            return grid[0][0]
        }

        //Topo direita
        if(grid[0][2] !== ' ' && grid[0][2] === grid[1][1] && grid[0][2] == grid[2][0]){
            return grid[0][2]
        }


        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(grid[i][j] === ' '){ //Existe posição livre e ainda não acabou o jogo
                    return false;
                }
            }
        }

        //Não existe posição livre e não há vencedores, jogo acabou empatado
        alert('Empate')
        return null
    }

    function minmax(novaGrid, profundidade, jogdor){
        //Ao chamar a função minmax verifica a situação do jogo para determinar como proceder
        const estado_jogo = acabouJogo(novaGrid);

        if(estado_jogo === false){
            
        } 
        else if(estado_jogo === null){

        }
        else if(estado_jogo === JOGADOR_TOKEN){

        }
        else if(estado_jogo === COMPUTADOR_TOKEN)

    }

    function jogadaIA(){
        return minmax(grid,0,COMPUTADOR_TOKEN)
    }
    
    $('.col').click(function(){
        $this = $(this)
        $this.html(JOGADOR_TOKEN);
        const i = $this.data('i');
        const j = $this.data('j');
        grid[i][j] = JOGADOR_TOKEN;

        if(acabouJogo()){
            alert('Você venceu')
            return;
        }
        else{
            //Se não acabou jogo I.A. precisa analisar sua jogada
            const movimento = jogadaIA();
            grid[movimento.i][movimento.j] = COMPUTADOR_TOKEN;
            $('.col[data-i=' + movimento.i + '][data-j=' + movimento.j + ']').html(COMPUTADOR_TOKEN);
        }

        if(acabouJogo()){
            alert('Você perdeu')
        }

        console.log(grid)
    });

    $('#reiniciar').click(function(){
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                grid[i][j] = ' ';
                $('.col[data-i=' + i + '][data-j=' + j + ']').html(' ');
            }
        }
    })
});

