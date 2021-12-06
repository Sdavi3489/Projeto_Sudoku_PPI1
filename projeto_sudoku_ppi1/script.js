function hide() {
  var x = document.getElementById("regras");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function escolherDificuldade() {
  var x = document.getElementById("dificuldade");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function hideEndGame() {
  var x = document.getElementById("endGame");
  if (x.style.display === "none") {
    x.style.display = "block";
    console.log('block')
  } else {
    $('#grade').remove();//remove a tabela antiga
    let grade = $('<table id="grade"></table>');
    $('#jogo').append(grade);//coloca uma nova tabela
    x.style.display = "none";
    console.log('none')
  }
}

function info_autores() {
  var x = document.getElementById("info");
  if (x.style.display === "none") {
    x.style.display = "block";
    console.log('block')
  } else {
    x.style.display = "none";
    console.log('none')
  }
}

let dificuldade = '';

function start() {

  hideEndGame();
  escolherDificuldade();
  console.log('O jogo começou!');
  console.log(dificuldade);
  let prejogo1 = [
    ['4', '', '9', '7', '', '', '', '3', '2'],
    ['2', '8', '1', '6', '9', '', '', '', '5'],
    ['7', '3', '', '4', '8', '2', '', '', '6'],
    ['', '', '', '2', '7', '', '9', '', ''],
    ['', '', '', '', '', '8', '2', '', ''],
    ['', '', '2', '', '', '5', '6', '1', '3'],
    ['9', '', '', '', '1', '', '3', '7', '8'],
    ['1', '5', '', '3', '', '', '', '', ''],
    ['', '', '', '', '', '9', '5', '6', '']
  ]

  let prejogo2 = [
    ['1', '', '', '3', '', '', '9', '2', ''],
    ['3', '', '', '4', '', '', '8', '5', ''],
    ['6', '', '', '9', '', '1', '', '7', ''],
    ['4', '7', '9', '', '1', '', '', '', ''],
    ['', '', '2', '', '6', '', '1', '', ''],
    ['', '', '', '', '8', '', '4', '3', '7'],
    ['', '5', '', '8', '', '7', '', '', '2'],
    ['', '8', '4', '', '', '2', '', '', '3'],
    ['', '6', '3', '', '', '5', '', '', '9']
  ]

  let prejogo3 = [
    ['', '1', '', '', '', '', '7', '', ''],
    ['7', '', '', '', '8', '4', '', '', '6'],
    ['', '', '', '', '', '', '8', '3', ''],
    ['', '4', '9', '', '', '', '2', '', ''],
    ['8', '', '', '', '', '', '', '1', ''],
    ['5', '3', '', '6', '', '2', '9', '', '4'],
    ['9', '', '', '1', '', '', '', '7', '8'],
    ['', '8', '', '', '', '', '4', '', ''],
    ['3', '', '', '2', '', '', '', '', '1']
  ]

  let sudoku = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']
  ];

  if (dificuldade == 'facil') {
    sudoku = prejogo1
  } else if (dificuldade == 'medio') {
    sudoku = prejogo2
  } else {
    sudoku = prejogo3;
  }


  $(document).ready(
    function () {
      for (let l = 0; l <= 8; l++) {
        let tr = $('<tr>');
        for (let c = 0; c <= 8; c++) {
          let input = $(`<input type="text" id="c${l}${c}" value="${sudoku[l][c]}">`)
          let td = $('<td>');
          td.append(input);
          tr.append(td);
          input.on('input',

            function () {
              let e = $(this);
              let lin = e.attr('id')[1];
              let col = e.attr('id')[2];
              let valor = e.val();

              if (valor != isNaN('')) {
                if (jogada_valida(sudoku, lin, col, valor)) {
                  sudoku[lin][col] = valor;
                  $(this).removeClass('invalida');
                }
                else {
                  alert('Jogada Inválida!')
                  $(this).addClass('invalida');

                }
              }
              else {
                sudoku[lin][col] = '';
                $(this).removeClass('invalida');
              }

              if (FimdeJogo(sudoku, col)) {
                alert('Fim de jogo')
              }
            });
        }

        $('#grade').append(tr);
      }
    }
  );

  function jogada_valida(sudoku, lin, col, valor) {
    let c = []// array com todas colunas para usar a opção de filtrar
    let linha1 = 0
    let coluna1 = 0


    if (lin < 3) {
      linha1 = 2
    }
    else if (lin < 6) {
      linha1 = 5
    }
    else { linha1 = 8 }

    if (col < 3) {
      coluna1 = 2
    }
    else if (col < 6) {
      coluna1 = 5
    }
    else { coluna1 = 8 }


    for (let i = 0; i <= 8; i++) {
      c.push(sudoku[i][col])
    }


    for (let i = (linha1 - 2); i <= linha1; i++) {
      for (let j = (coluna1 - 2); j <= coluna1; j++) {

        if (valor == sudoku[i][j]) {
          return false
        }
      }
    }

    if (sudoku[lin].filter(x => x == valor) == valor) {
      return false
    }
    else if (c.filter(x => x == valor) == valor) {
      return false
    }
    if (sudoku[lin].filter(x => x != valor) != valor) {
      return true
    }
    else if (c.filter(x => x != valor) != valor) {
      return true
    }
  }

  function FimdeJogo(sudoku, col) {

    for (let i = 0; i <= 8; i++) {
      for (let l in sudoku[i]) {

        if (sudoku[i][l] == '') {
          return false
        }
      }
    }

    for (let l = 0; l <= 8; l++) {
      if (sudoku[l][col] == '') {
        return false
      }
      return true
    }
  }

}