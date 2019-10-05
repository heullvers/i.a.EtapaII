const JOGADOR_TOKEN = 'X'
const COMPUTADOR_TOKEN = 'Y'

$(document).ready(function(){
    const grid = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    function acabouJogo(novaGrid){
        //Verifica se o jogo acabou
        //Verificar horizontal, vertical e diagonal

        //Horizontal
        for (var i = 0; i < 3; i++) {
            if(novaGrid[i][0] !== ' ' && novaGrid[i][0] === novaGrid[i][1] && novaGrid[i][0] == novaGrid[i][2]){
                return novaGrid[i][0]
            }
        }

        //Vertical
        for (var i = 0; i < 3; i++) {
            if(novaGrid[0][i] !== ' ' && novaGrid[0][i] === novaGrid[1][i] && novaGrid[0][i] == novaGrid[2][i]){
                return novaGrid[0][i]
            }
        }

        //Diagonais
        //Topo esquerda
        if(novaGrid[0][0] !== ' ' && novaGrid[0][0] === novaGrid[1][1] && novaGrid[0][0] == novaGrid[2][2]){
            return novaGrid[0][0]
        }

        //Topo direita
        if(novaGrid[0][2] !== ' ' && novaGrid[0][2] === novaGrid[1][1] && novaGrid[0][2] == novaGrid[2][0]){
            return novaGrid[0][2]
        }


        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(novaGrid[i][j] === ' '){ //Existe posição livre e ainda não acabou o jogo
                    return false;
                }
            }
        }

        //Não existe posição livre e não há vencedores, jogo acabou empatado
        return null
    }

    function dfs(novaGrid, profundidade, jogador){
        //Ao chamar a função dfs verifica a situação do jogo para determinar como proceder
        const estado_jogo = acabouJogo(novaGrid);

        if(estado_jogo === false){ //Jogo em aberto, ainda há possibilidade de jogadas (novos nós)
            let comp_ganhou = false;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    const grid_copia = _.cloneDeep(novaGrid);
                    if(grid_copia[i][j] === ' ') {
                        grid_copia[i][j] = jogador;
                        comp_ganhou = dfs(grid_copia, profundidade + 1, (jogador === JOGADOR_TOKEN)? COMPUTADOR_TOKEN : JOGADOR_TOKEN); //Alterna o valor do jogador
                        if (comp_ganhou) {
                            var jogada = {
                                i: i,
                                j: j
                            };
                    
                            return jogada;
                        }
                    }
                }
            }            
        } 
        else if(estado_jogo === null){ //Jogo finalizado, empatado
            return false;
        }
        else if(estado_jogo === JOGADOR_TOKEN){ //Jogo finalizado, jogador venceu
            return false; //Mínimo para o jogador
        }
        else if(estado_jogo === COMPUTADOR_TOKEN){ //Jogo finalizado, computador venceu
            return true; //Máximo para o computador
        }

    }

    function jogadaIA(){
        return dfs(grid,0,COMPUTADOR_TOKEN)
    }
    
    $('.col').click(function(){
        $this = $(this)
        $this.html(JOGADOR_TOKEN);
        const i = $this.data('i');
        const j = $this.data('j');
        grid[i][j] = JOGADOR_TOKEN;

        if(acabouJogo(grid)){
            alert('Você venceu')
            return;
        }
        else{
            //Se não acabou jogo I.A. precisa analisar sua jogada
            const movimento = jogadaIA();
            grid[movimento.i][movimento.j] = COMPUTADOR_TOKEN;
            $('.col[data-i=' + movimento.i + '][data-j=' + movimento.j + ']').html(COMPUTADOR_TOKEN);
        }

        if(acabouJogo(grid)){
            alert('Você perdeu')
        }
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

