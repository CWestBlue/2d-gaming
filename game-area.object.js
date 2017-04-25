import * as _ from 'lodash';
var GameAreaObject = (function () {
    function GameAreaObject(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.gravity = 0;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.frame = 0;
        this.startOn = false;
        this.gameObjects = [];
        this.area = document.getElementById('area');
        this.height = height;
        this.width = width;
        this.canvas.id = name + 'Canvas';
        this.canvas.style.border = '1px solid black';
        this.canvas.style.width = width;
        this.canvas.style.height = height;
        this.area.id = name;
        this.area.appendChild(this.canvas);
    }
    GameAreaObject.prototype.start = function () {
        var _this = this;
        if (this.startOn === false) {
            if (this.doEveryFrame) {
                this.interval = setInterval(function () { _this.doEveryFrame(); }, 20);
                this.startOn = true;
            }
        }
    };
    GameAreaObject.prototype.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    GameAreaObject.prototype.stop = function () {
        var _this = this;
        this.startOn = false;
        clearInterval(this.interval);
        this.gameObjects.forEach(function (res) {
            if (res.bullets) {
                res.bullets.forEach(function (bull) {
                    _this.context.clearRect(bull.x, bull.y, bull.width, bull.height);
                    var index = _.findIndex(_this.gameObjects, function (o) { return o === bull; });
                    _this.gameObjects.splice(index, 1);
                });
                res.bullets = [];
            }
            _this.context.clearRect(res.x, res.y, res.width, res.height);
            res.update();
        });
        this.frame = 0;
    };
    GameAreaObject.prototype.everyinterval = function (frames) {
        if ((this.frame / frames) % 1 === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return GameAreaObject;
}());
export { GameAreaObject };
//# sourceMappingURL=game-area.object.js.map