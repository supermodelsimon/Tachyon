var elevator : Elevators;
var targetTag = "Player";

function OnTriggerExit(other : Collider){

	//we only want to move elevator if it was the player who collided
	if(other.CompareTag(targetTag)){
		//move the elevator int he selected direction
		elevator.moveElevator();
	}
}