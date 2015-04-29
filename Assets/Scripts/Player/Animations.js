// "Animations.js" -- Animation controller script
public var idleAnimation : AnimationClip;
public var walkAnimation : AnimationClip;
public var runAnimation : AnimationClip;
public var jumpPoseAnimation : AnimationClip;

function Start () { 
//  animation["jump"].wrapMode = WrapMode.Once; 
    Idle();
}

function Walk() {
    animation.CrossFade(walkAnimation.name, 0.3);
}

 

function Run () { 
      animation.CrossFade(runAnimation.name, 0.3); 
}

 

function Idle () {
    animation.CrossFade(idleAnimation.name, 0.3);
}

  

function Jump () {
    animation.CrossFade(jumpPoseAnimation.name, 0.3);
}