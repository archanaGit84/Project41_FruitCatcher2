class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form();
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();
        var scorePos = 20;

        for(var plr in allPlayers){
           // console.log(plr)
             
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            textSize(15);
            stroke("black")
            fill("white");
            //text(allPlayers[plr].name, x-20, y+20)
            text(allPlayers[plr].name +":   " + allPlayers[plr].score, 20, scorePos)
            scorePos += 20;
        

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            if(index === player.index){
                textSize(12);
                strokeWeight(5)
                stroke("black")
                fill("red");
                text(allPlayers[plr].name, x-20, y+20)
            }
                 


            

        }


        // Give movements for the players using arrow keys
        
        if(player.index!= null){
            if (keyIsDown(RIGHT_ARROW)) {
                player.distance -= 10
                player.update();
            }
            if (keyIsDown(LEFT_ARROW)) {
                player.distance += 10
                player.update();
            }

            this.calculateScore();
           
        }
       

        // Create and spawn fruits randomly
       
        
    }

    end(){
        fruitGroup.setVelocityYEach = 0;
        player1.destroy();
        player2.destroy();
       console.log("Game End");
       textSize(30);
       text("red");
       text("Game End", width/2, height/2)
    }

    spawnFruits(){
        var fruits = createSprite(random(100, 900), 10, 10, 10);
        fruits.velocityY = 6;
        fruits.lifetime = height/6;
        var rand = Math.round(random(1,5));
         switch(rand){
            case 1: fruits.addImage("fruit1",fruit1_img);
                     break;
            case 2: fruits.addImage("fruit1", fruit2_img);
                     break;
            case 3: fruits.addImage("fruit1", fruit3_img);
                    break;
            case 4: fruits.addImage("fruit1", fruit4_img);
                     break;
            case 5: fruits.addImage("fruit1", fruit5_img);
                    break;
        }
        fruitGroup.add(fruits);
    }

    calculateScore(){
        for (var i = 0; i < fruitGroup.length; i++) {
            if (fruitGroup.get(i).isTouching(players)) {
                fruitGroup.get(i).destroy();
                player.score =player.score+1;
                player.update();
                if(player.score > 9){
                    this.update(2);
                }
                
            }
            
        }
    }
}