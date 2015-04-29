var cursorImage : Texture2D;
var width = 35;
var height = 35;
var sensitivity = 20;
var inverted = false;

private var drawCursor = true;
private var xPos = 0;
private var yPos = 0;
private var savePos = false;


function Awake() {
    Screen.showCursor = false;
    var mousePos : Vector3 = Input.mousePosition;
    xPos = Screen.width/2;
    yPos = Screen.height/2;
}

function disableCursor(){
	drawCursor=false;
	Screen.lockCursor = true;
	savePos = true;
}

function enableCursor(){
	drawCursor=true;
}

function OnGUI() {
	if(drawCursor){
		//set the mouse position back to where it was when you lifted off
		if(savePos){
			Screen.lockCursor = false;
			savePos=false;
		}
	    var mousePos : Vector3 = Input.mousePosition;
	   	xPos += Input.GetAxis("Mouse X") * sensitivity;
	   	if(inverted)
	   		yPos += Input.GetAxis("Mouse Y") * sensitivity;
	   	else
	   		yPos -= Input.GetAxis("Mouse Y") * sensitivity;
	   	//check cursor has not gone off screen
	   	if(xPos<0){
	   		xPos=0;
	   	}
	   	else if(xPos>Screen.width){
	   		xPos=Screen.width;
	   	}
	    if(yPos<0){
	    	yPos = 0;
	    }
	    else if(yPos>Screen.height){
	    	yPos=Screen.height;
	    }
	    var pos : Rect = Rect(xPos,yPos,width,height);
	    GUI.Label(pos,cursorImage);
    }
}