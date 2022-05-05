var audioFallo = new Audio("audio/fallo.ogg");
var audioSeleccion = new Audio("audio/seleccion.ogg");
var audioShowRed = new Audio("audio/showred.ogg");
var audioShowblue = new Audio("audio/showblue.ogg");
var audioShowYellow = new Audio("audio/showyellow.ogg");
var audioShowGreen = new Audio("audio/showgreen.ogg");

inicio = function() {
  var game = new SimonGame();
  game.init();
  go.style.visibility='hidden';
  };

function SimonGame() {
    var self = this
    const colors        = ['red', 'green', 'blue', 'yellow'];
    this.sequence       = [];
    this.userClickCount = 0;
    this.level          = 1;

      
    this.init = function() {
        this.generateSequence();
        this.showSequence();
        document.querySelectorAll('button').forEach(function(button) {
            button.addEventListener('click', self.checkUserInput);
        })
      }

    this.generateSequence = function() {
        const randomColor = Math.floor(Math.random() * 4)
        this.sequence.push(colors[randomColor])
    }

    this.showSequence = function() {
        var buttons = document.getElementById('buttons-container');
        buttons.classList.add('blocked');
        var current = 0
        var interval = setInterval(function () {
            
           if(!self.sequence[current]) {
               clearInterval(interval)
               buttons.classList.remove('blocked');
               return
           }

           var button = document.getElementById(self.sequence[current])
           button.classList.add('active')
           switch(self.sequence[current]) {
            case 'red': audioShowRed.play(); break;
            case 'green': audioShowGreen.play(); break;
            case 'blue': audioShowblue.play(); break;
            case 'yellow': audioShowYellow.play(); break;
           }
           setTimeout(function() {
               button.classList.remove('active')
               
           },1000)
           current++

        },2000)
    }

    this.checkUserInput = function() {
         audioSeleccion.play();
        var colorInput = this.getAttribute('id');
        var currentColor = self.sequence[self.userClickCount];
    
        if (currentColor !== colorInput) {
          audioFallo.play();
          self.gameOver();
          return;
        }
    
        self.userClickCount++;
        if (self.userClickCount === self.sequence.length) {
          // finished round
          self.finishedRound();
        }
      }

      this.finishedRound = function() {
        this.generateSequence();
        this.showSequence();
        this.userClickCount = 0;
        this.level++;
        document.getElementById('counter').innerHTML = self.level
      }

      this.gameOver = function() {
        alert('Game Over!! Try it again!');
        self.sequence = [];
        self.userClickCount = 0;
        self.level = 1;
        document.getElementById('counter').innerHTML = 1;
    
        document.querySelectorAll('button').forEach(function(button) {
          button.removeEventListener('click', self.chekUserInput);
        })
        go.style.visibility='visible';
      }
  }

let go = document.getElementById("inicio");
go.addEventListener('click', inicio);

//////////////////////////////////////////////////////////





