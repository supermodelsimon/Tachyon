#pragma strict

function OnTriggerEnter (other : Collider) {
		var object = other.GetComponent(CharacterMovement);
		object.disableGravity(true);		
}