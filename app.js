new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    }
    ,
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth =100;
            this.monsterHealth =100;
        },
        attack: function() {
            var damage = this.calculateDamage(10,3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for '+damage
            }) ;
            if(this.checkWhoWon()){
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(20,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for '+damage
            }) ;
            if(this.checkWhoWon()){
                return;
            }
            this.monsterAttacks();
        },
        heal: function() {
            if(this.playerHealth <=90){
                this.playerHealth += 10;
                this.monsterAttacks();
            }
            else{
                this.playerHealth=100;
                this.monsterAttacks();
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player healed himself by 10 points'
            }) ;
        },
        giveUp: function() {
            this.gameIsRunning= false;
            this.turns =[];

        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(12,5);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for '+damage
            }) ;
            this.checkWhoWon();
        },
        calculateDamage: function( max,min) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWhoWon: function() {
            if(this.monsterHealth <=0 ){
                if(confirm('You won, New Game ??')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning= false
                }
                return true;
            }
            else if(this.playerHealth <=0){
                if(confirm('You Lost, New Game ??')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning= false
                }
                return true;
            }
            return false;
        }
    }
})