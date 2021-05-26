
status="";
objects = [];

function preload()
{
    
    alarm = loadSound("alarm.mp3");
    
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetection = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
image(video, 0,0,380, 380);

if (status != "")
{
    r = random(255);
    g= random(255);
    b= random(255);
    objectDetection.detect(video, gotResult);   
    alarm.stop();
    for(i= 0; i < objects.length; i++)
    {
 
        document.getElementById("status").innerHTML = "Status: Baby Detected";
        percentage = floor(objects[i].confidence * 100);
        fill(r,g,b);
        text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == "person")
        {
            document.getElementById("number-of-objects-detected").innerHTML = "Baby found"
            console.log("stop");
            alarm.stop();
        }
        else 
        {
            document.getElementById("number-of-objects-detected").innerHTML = "Baby not found";
            console.log("play");
            alarm.play();
        }
    }
    if(objects.length == 0)
    {
        document.getElementById("number-of-objects-detected").innerHTML = "Baby not found";
            console.log("play");
            alarm.play();
    }

}
   
}




function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}






