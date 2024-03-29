const JOGADOR_TOKEN = 'X'
const COMPUTADOR_TOKEN = 'Y'

var VENCEDOR = '';

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

    function minmax(novaGrid, profundidade, jogador){
        //Ao chamar a função minmax verifica a situação do jogo para determinar como proceder
        const estado_jogo = acabouJogo(novaGrid);

        if(estado_jogo === false){ //Jogo em aberto, ainda há possibilidade de jogadas (novos nós)
            const valores = [];

            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    const grid_copia = _.cloneDeep(novaGrid);
                    if(grid_copia[i][j] === ' ') {
                        grid_copia[i][j] = jogador;
                        const valor = minmax(grid_copia, profundidade + 1, (jogador === JOGADOR_TOKEN)? COMPUTADOR_TOKEN : JOGADOR_TOKEN); //Alterna o valor do jogador
                        valores.push({
                            custo: valor,
                            jogada: {
                                i: i,
                                j: j
                            }
                        });
                    }
                }
            }

            if(jogador === COMPUTADOR_TOKEN){ //Retorna o max quando é a vez do computador
                const max = _.maxBy(valores, (v) =>{
                    return v.custo;
                });
                if(profundidade === 0){
                    return max.jogada;
                }
                else{
                    return max.custo;
                }
            }
            else{ //Retorna min quando é a vez do jogador

                const min = _.minBy(valores, (v) =>{
                    return v.custo;
                });

                if(profundidade === 0){
                    return min.jogada;
                }
                else{
                    return min.custo;
                }


            }


            
        } 
        else if(estado_jogo === null){ //Jogo finalizado, empatado
            return 0;
        }
        else if(estado_jogo === JOGADOR_TOKEN){ //Jogo finalizado, jogador venceu
            return profundidade - 10; //Mínimo para o jogador
        }
        else if(estado_jogo === COMPUTADOR_TOKEN){ //Jogo finalizado, computador venceu
            return 10 - profundidade; //Máximo para o computador
        }

    }

    function jogadaIA(algoritmo){
        if(algoritmo == 'minmax')
            return minmax(grid,0,COMPUTADOR_TOKEN)
        else
            return dfs(grid,0,COMPUTADOR_TOKEN)
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

    function verifica_vencedor(valor){
        if(valor === true){
            VENCEDOR = true;
            alert('Você venceu');
        }
        else if(valor === null){
            VENCEDOR = null;
            alert('Você nem ganhou nem perdeu');
        }
        else{
            VENCEDOR = false;
            alert('Você perdeu');
        }
    }
    
    $('.col').click(function(){
        var radio_buttons = $("input[name='modo']:checked").val();
        console.log(radio_buttons);

        if(radio_buttons === undefined){
            alert('Selecione o modo');
            return;
        }

        $this = $(this)

        if(($this.html() == ' ') && (VENCEDOR === '')){
            $this.html(JOGADOR_TOKEN);
            console.log($this.html())
            const i = $this.data('i');
            const j = $this.data('j');
            grid[i][j] = JOGADOR_TOKEN;

            if(acabouJogo(grid)){
                return verifica_vencedor(true);
            }
            else{
                //Se não acabou jogo I.A. precisa analisar sua jogada
                const movimento = jogadaIA(radio_buttons);
                if(movimento){
                    grid[movimento.i][movimento.j] = COMPUTADOR_TOKEN;
                    $('.col[data-i=' + movimento.i + '][data-j=' + movimento.j + ']').html(COMPUTADOR_TOKEN);
                }
                else{
                    return verifica_vencedor(null);
                }
            }

            if(acabouJogo(grid)){
                return verifica_vencedor(false);
            }
        }

    });

    $('#reiniciar').click(function(){
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                grid[i][j] = ' ';
                $('.col[data-i=' + i + '][data-j=' + j + ']').html(' ');
            }
        }
        VENCEDOR = ''
    })
});

