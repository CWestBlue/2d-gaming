var ObjectComponent = (function () {
    function ObjectComponent(game, width, height, look, xPos, yPos, type) {
        this.barriers = [];
        this.bullets = [];
        this.score = 1;
        this.game = game;
        this.width = width;
        this.height = height,
            this.color = look;
        this.x = xPos;
        this.y = yPos;
        this.type = type;
        this.create(type);
        this.game.gameObjects.push(this);
        this.typeOf();
    }
    ObjectComponent.prototype.newPos = function (barrier) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        if (barrier) {
            if (this.hitBarrier()) {
                if (!(this.leavesWith() === 'bottom')) {
                    return;
                }
                else {
                    this.speedY = 0;
                }
            }
        }
    };
    ObjectComponent.prototype.typeOf = function () {
        switch (this.type) {
            case 'image':
                this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                break;
            case 'text':
                this.ctx.font = this.width + " " + this.height;
                this.ctx.fillStyle = this.color;
                this.ctx.fillText(this.text, this.x, this.y);
                break;
            default:
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
        }
        ;
    };
    ObjectComponent.prototype.add = function (barrier) {
        this.barriers.push(barrier);
    };
    ObjectComponent.prototype.hitBarrier = function () {
        var _this = this;
        var right = this.game.canvas.width;
        var bottom = this.game.canvas.height;
        if (this.leavesWith()) {
            switch (this.leavesWith()) {
                case 'right':
                    this.x = this.game.canvas.width - this.width;
                    this.speedX = 0;
                    break;
                case 'left':
                    this.x = 0;
                    break;
                case 'bottom':
                    this.y = this.game.canvas.height - this.height;
                    this.speedY = 0;
                    this.speedY = 0;
                    // this.gravity = 0;
                    break;
                case 'top':
                    this.y = 0;
                    break;
            }
            return true;
        }
        if (this.barriers.length > 0) {
            this.barriers.forEach(function (obj) {
                if (_this.crashWith(obj)) {
                    _this.y = obj.y - _this.height;
                    return true;
                }
            });
        }
        return false;
    };
    ObjectComponent.prototype.travelpath = function () {
        if (this.path) {
            var deltaX = this.path.x - this.x;
            var deltaY = this.path.y - this.y;
            var angle = Math.atan2(deltaY, deltaX);
            this.speedX = this.path.speed * Math.cos(angle);
            this.speedY = this.path.speed * Math.sin(angle);
            if (this.isShoot) {
                this.path.x += deltaX;
                this.path.y += deltaY;
            }
        }
        else {
            return;
        }
    };
    ObjectComponent.prototype.jump = function (n) {
        console.log('madeit');
        var originalSpeed = this.speedY;
        this.speedY = -n;
        // setTimeout(() => { this.gravitySpeed = originalSpeed; }, 40);
    };
    ObjectComponent.prototype.shoot = function (x, y, speed, object) {
        console.log('shoot');
        var arrow = new ObjectComponent(this.game, object.width, object.height, object.color, this.x, this.y, object.type);
        arrow.isShoot = true;
        arrow.path = {
            x: x,
            y: y,
            speed: speed
        };
        this.bullets.push(arrow);
    };
    ObjectComponent.prototype.update = function (barrier, ground) {
        if (this.barriers.length > 0) {
            this.barriers.forEach(function (res) {
                res.update(false);
            });
        }
        if (this.bullets.length > 0) {
            this.bullets.forEach(function (res) {
                res.update(false);
            });
        }
        this.travelpath();
        this.newPos(barrier);
        this.ctx = this.game.context;
        this.typeOf();
    };
    ObjectComponent.prototype.create = function (type) {
        if (type === "image") {
            this.image = new Image();
            this.image.src = this.color;
        }
        var groundCount = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = this.game.gravity;
        this.speedY = 0;
        this.ctx = this.game.context;
    };
    ObjectComponent.prototype.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            return false;
        }
        else {
            return true;
        }
    };
    ObjectComponent.prototype.leavesWith = function () {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = 0;
        var otherright = this.game.canvas.width;
        var othertop = 0;
        var otherbottom = this.game.canvas.height;
        if ((mytop < othertop) ||
            (mybottom > otherbottom) ||
            (myleft < otherleft) ||
            (myright > otherright)) {
            if (mytop < othertop) {
                return 'top';
            }
            if (mybottom > otherbottom) {
                return 'bottom';
            }
            if (myleft < otherleft) {
                return 'left';
            }
            if (myright > otherright) {
                return 'right';
            }
        }
        else {
            return;
        }
    };
    return ObjectComponent;
}());
export { ObjectComponent };
//# sourceMappingURL=game.objects.component.js.map