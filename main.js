var objects = [];
function preload() {
    sound = loadSound("alert.mp3");
    console.log("sound is loaded");
    sound.setVolume(1);
    sound.rate(1);
}
function setup() {
    canvas = createCanvas(500, 400);
    //canvas.center();
    canvas.position(430, 200);
    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function draw() {
    image(video, 0, 0, 500, 400);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
        if (objects[i].label == "person") {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("baby_status").innerHTML = "Baby found";
            sound.stop();
        } else {
            sound.play();
            document.getElementById("baby_status").innerHTML = "Baby Not Found";
        }
    }
}
function modelLoaded() {
    console.log('modelLoaded');
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
objects = results;
    }
}