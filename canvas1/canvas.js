let canvas= document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

innerHeight = canvas.height;
innerWidth = canvas.width;

let c = canvas.getContext('2d');

// c.fillStyle = "rgba(255,0,0,0.5)";
// c.fillRect(100,100,100,100);
// c.fillStyle = "rgba(0,255,0,0.5)";
// c.fillRect(400,500,100,100);
// c.fillStyle = "rgba(0,0,255,0.5)";
// c.fillRect(300,200,100,100);


// //Line
// c.beginPath(); //start a path without any preceding
// c.moveTo(50,300); //creates a starting point
// c.lineTo(300,100); //300px from the starting point on x-axis and 100 px on y-axis 
// c.lineTo(200,10); //300px from the starting point on x-axis and 100 px on y-axis 
// c.strokeStyle = "#fa34ac";
// c.stroke(); //draw the stroke

// //arc
// c.beginPath();
// c.arc(300,300,30,0,Math.PI * 2,false);
// c.strokeStyle = "blue";
// c.stroke();

//  for(let i = 0;i < 3;i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     let red = Math.random() * 50;
//     let blue = Math.random().toFixed() * 40
//     let green = Math.random().toFixed() * 10

//     c.beginPath();
//     c.arc(x,y,50,0,Math.PI * 2,false);
//     c.strokeStyle = `rgb(${red},${blue},${green})`;
//     c.lineWidth = "100";
//     c.stroke();
//     console.log(red,blue,green);
    
// }

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.8) * 8;
// var dy = (Math.random() + 0.5) * 8;

    var mouse = {
        x: undefined,
        y: undefined
    }
    window.addEventListener('mousemove',function(event){
       mouse.x = event.x;
       mouse.y = event.y;

    });

    window.addEventListener('resize',function(){
        canvas.width = window.innerWidth;
        canvas.height= window.innerHeight;
        
        innerHeight = canvas.height;
        innerWidth = canvas.width;

        init();
        
    });

    const maxRadius = 60;
    const minRadius = 4;

        let colorArray = [
            '#2C3E58',
            '#E74C3C',
            '#ECF0F1',
            '#349808',

            '#298989'
        ]
 function Circle(x,y,dx,dy,radius,minRadius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.stroke();  
        c.fillStyle = this.color; 
        c.fill()
      
    };
    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y > -50) {
                (this.radius < maxRadius)?
            this.radius += 1:null
        }else if(this.radius > this.minRadius){
            this.radius -= 1;
        }
        
    };
 }

 
 var circleArray = [];

function init(){

    circleArray= [];

    for(let i = 0;i < 800;i++){
    var radius = Math.random() * 5 + 1;    
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = Math.random() * 8;
    var dy = Math.random() * 8;
    
        circleArray.push(new Circle(x,y,dx,dy,radius,radius));
    }
    
}

    function animate(){
        requestAnimationFrame(animate);
        c.clearRect(0,0,innerWidth,innerHeight); //clears th frame and renders a new canvas
        for(var i =0; i< circleArray.length;i++){
            circleArray[i].draw();
            circleArray[i].update();
        }
    }
    
    animate();
    init();
