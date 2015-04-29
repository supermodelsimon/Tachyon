var projectile : Rigidbody = null;
var speed = 20;
var duration = 5;
private var isShooting = false;

function Update () {

	if ( Input.GetButton ("Fire1")) {
		if(!isShooting){
        	isShooting=true;
        	Invoke("Shoot", 0.39);
        }
	}
	else{
		CancelInvoke();
		isShooting=false;
	}
}

function Shoot () {
		clone = Instantiate(projectile, 
						GameObject.Find("skin_EXP_BE_R_laser01").transform.position, 
						transform.rotation);
		clone.transform.Rotate(90,0,0);
		clone.velocity = transform.TransformDirection( Vector3 (0, 0, speed));
		Destroy (clone.gameObject, duration);
}