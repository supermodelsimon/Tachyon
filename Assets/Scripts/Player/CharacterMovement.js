// Movement Variables:

var jumpSpeed:float = 9.0; 
var jumpCooldown:float = 1.0;
var gravity:float = 15;
var walkSpeed:float = 1.7; 
var rotateSpeed:float = 150.0;
private var weight:float = 0.0; 
private var jumpTime:float = 0.0; 
private var grounded:boolean = false; 
private var moveDirection:Vector3 = Vector3.zero; 
private var isWalking:boolean = true; 
private var moveStatus = playerStatus.idle; 
private var isJumping:boolean = false;
private var xSpeed = 250.0; 
private var ySpeed = 120.0; 
private var yMinLimit = -40; 
private var yMaxLimit = 80; 
private var x = 0.0; 
private var y = 0.0; 
private var facing = horizontal.right;
var controller:CharacterController;

private enum horizontal{
left,
right
}

private enum playerStatus{
walking,
jumping,
idle
}

// Script Variables
private var anim;

 

// ------------------------------------------------------------------ AWAKE ! ---------------------
function Awake(){
    // Load Script Variables:
    anim = GetComponent (Animations);
    controller = GetComponent(CharacterController); 
    weight = gravity;
}

// -------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------- UPDATE ---------------------------------------
// -------------------------------------------------------------------------------------------------------------

function Update () {
    moveDirection = new Vector3(Input.GetAxis("Horizontal"),moveDirection.y,0);       
	moveDirection.x *= walkSpeed; 
	
	
	// Only jump while -----------------  GROUNDED -------------
   if(grounded) {
   		if(isJumping){
   			isJumping = false;
   			jumpTime = Time.time + jumpCooldown;
   		}
   		//If grounded reset gravity
   		moveDirection.y = 0;
        // Jump! 
        if(Input.GetButtonDown("Jump") && Time.time > jumpTime){
            anim.Jump();
            moveDirection.y = jumpSpeed; 
            isJumping = true;
            moveStatus = playerStatus.jumping;
        }
	}   
	else{
    	//Apply gravity
    	moveDirection.y -= weight * Time.deltaTime; 
    } 
	
	
	
	if(moveDirection.x != 0) {
	    anim.Walk();
	    moveStatus = playerStatus.walking;
	    if (facing == horizontal.right && moveDirection.x < 0){
	    	facing = horizontal.left;
	    	transform.Rotate(0,180,0);
	    }
	    else if(facing == horizontal.left && moveDirection.x > 0){
	    	facing = horizontal.right;
	    	transform.Rotate(0,-180,0);
	    }
	} 
	else if (grounded){
	    anim.Idle();
	    moveStatus = playerStatus.idle;
	}	
	
    //Move controller
    if(moveDirection != Vector3.zero){
    	moveDirection.z = 0;	    
	    var flags = controller.Move(moveDirection * Time.deltaTime); 
	    grounded = (flags & CollisionFlags.Below) != 0; 
	}
};

function disableGravity (zeroGravity : boolean){

if (zeroGravity)
	weight = 0;
else
	weight = gravity;
}

static function ClampAngle (angle : float, min : float, max : float) { 
   		if (angle < -360) 
      		angle += 360; 
   		if (angle > 360) 
      		angle -= 360; 
   return Mathf.Clamp (angle, min, max); 
} 

// -------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------- END UPDATE  --------------------------------
// -------------------------------------------------------------------------------------------------------------

@script RequireComponent(CharacterController)