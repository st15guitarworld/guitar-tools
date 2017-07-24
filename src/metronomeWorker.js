const workercode = () => {
    let timerId = null;
    let interval = 100; 
    
    let onmessage = (e) =>{
         switch(e.data.type) {
            case "start":    
                console.log("starting");
                timerId = setInterval(() => {postMessage("tick");}, interval);
                break;
            case "interval":
                console.log("setting interval");
                interval = e.data.interval;
                console.log("interval = "+interval);

                if(timerId){
                    clearInterval(timerId);
                    timerId = setInterval(()=> { postMessage("tick")},interval);
                }
                break;
            case "stop":
                console.log("stopping");
                clearInterval(timerId);
                timerId=null;
                break;

             default:
                 console.log("Recieved Message: " + e);
                 break;
        }
    }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const metronomeWorker = URL.createObjectURL(blob);
export default metronomeWorker;
