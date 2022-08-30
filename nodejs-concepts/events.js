const event = require("events");
const EventEmitter = new event.EventEmitter();

let count = 0;

EventEmitter.on("increment", function () {
  
  console.log(++count);
}); 


function a(){
  return new Promise(async (resolve, reject) =>{
    // let x = 5
    // if(x == 5){
    //   resolve(x)
    // }
    EventEmitter.on("dooropen", function () {
  
      resolve("Ring Ring Ring")
    });
  })
}


EventEmitter.emit("dooropen", a().then((res) => {
  console.log(res)
}))

EventEmitter.emit("increment")
EventEmitter.emit("increment");
EventEmitter.emit("increment");
