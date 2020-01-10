var momObj = function () {
    this.x;
    this.y;
    this.angle;
    // this.bigEye = new Image();
    // this.bigBody = new Image();
    // this.bigTail = new Image();

    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;

    this.momBodyCount = 0;
}
momObj.prototype.init = function () {//初始化鱼的位置
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    // this.bigEye.src = './src/bigEye0.png';
    // this.bigBody.src = './src/bigSwim0.png';
    // this.bigTail.src = './src/bigTail0.png';
}
momObj.prototype.draw = function () {
    this.x = lerpDistance(mx, this.x, 0.97);//使一个值趋于目标值
    this.y = lerpDistance(my, this.y, 0.97);
    //delta angle每一帧都要追随使用Math.atan2(y,x)来计算的
    var deltaY = my - this.y//坐标差
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;//鼠标和大鱼之间的角度差
    //让大鱼的坐标一直趋向于鼠标的坐标
    this.angle = lerpAngle(beta, this.angle, 0.6);

    //tail
    this.momTailTimer += deltaTime;
    if (this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;
        this.momTailTimer %= 50;
    }

    //Eye
    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer %= this.momEyeInterval;
        if (this.momTailCount == 0) {
            this.momEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.momEyeInterval = 200;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y)//原点
    ctx1.rotate(this.angle);//旋转画布
    var momTailCount = this.momTailCount;
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5)
    var momBodyCount = this.momBodyCount
    if (data.double == 1) {
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5)
    } else {
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5)
    }

    var momEyeCount = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
    ctx1.restore();
}