var doors : Collider[];
var floorHeights : float[];
var elevator : Transform;
//negative speed means going down
var speed = 1.0;
var playerObjectName : String;
var startingFloor=1;
private var player;
private var move=false;
private var inside=false;

function Awake(){
	player = GameObject.FindWithTag("Player").transform;
}

function moveElevator(){
	if(inside){
		inside=false;		
	}
	else{
		inside=true;
		moveUp();
	}
}

function moveUp(){
	if(startingFloor+1<floorHeights.Length){
		startingFloor+=1;
		if(speed<0)
			speed = -speed;
		//close doors
		Debug.Log(startingFloor);
		for(var i=0; i<doors.Length ; i++)
			doors[i].isTrigger = false;
	}
	//outside the range of the array, maybe do something here
	else{ 
		moveDown();
		return;
	}
	move=true;

}

function moveDown(){
	if(startingFloor-1>0){
		startingFloor-=1;
		if(speed>0)
			speed *= -1;
		//close doors
		for(var i=0; i<doors.Length ; i++)
			doors[i].isTrigger = false;	
	}
	//outside the range of the array, maybe do something here
	else 
		return;
	move=true;
}

function Update(){
	if(elevator.position.y){
		if(speed>0 && elevator.position.y>=floorHeights[startingFloor]){
			elevator.position.y = floorHeights[startingFloor];
			for(var i=0; i<doors.Length ; i++)
				doors[i].isTrigger = true;		
			move=false;
			return;	
		}
		else if(speed<0 && elevator.position.y<=floorHeights[startingFloor]){
			elevator.position.y = floorHeights[startingFloor];
			for(var j=0; j<doors.Length ; j++)
				doors[j].isTrigger = true;		
			move=false;
			return;	
		}
        elevator.Translate(0, Time.deltaTime*speed, 0, Space.World);
        player.Translate(0, Time.deltaTime*speed, 0, Space.World);
    }
}