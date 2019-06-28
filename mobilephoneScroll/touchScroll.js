var TouchScroll = /** @class */ (function () {
    function TouchScroll(params) {
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.limit = 0;
        this.bool = true;
        this.target = params.target;
        this.des = params.des;
        this.noScrolls = params.onScrolls || [];
        this.init();
    }
    ;
    TouchScroll.prototype.init = function () {
        this.setParent();
        if (this.pHeight <= 0 && this.pWidth <= 0)
            return;
            console.log(this.pHeight)
        this.bindEvents();
        this.bindNoScroll();
    };
    TouchScroll.prototype.setParent = function () {
        // 设置父级
        this.parent = this.target.parentNode;
        this.pWidth = this.target.getBoundingClientRect().width +
            parseInt(this.getStyle(this.target, 'marginLeft')) +
            parseInt(this.getStyle(this.target, 'marginRight'))
            - this.parent.getBoundingClientRect().width;
        this.pHeight = this.target.getBoundingClientRect().height +
            parseInt(this.getStyle(this.target, 'marginTop')) +
            parseInt(this.getStyle(this.target, 'marginBottom'))
            - this.parent.getBoundingClientRect().height;
        this.target.style.transition = 'transform 0.1s linear';
        this.parent.style.overflow = 'hidden';
        this.parent.addEventListener('touchmove', function (e) { return e.preventDefault(); }, false);
    };
    TouchScroll.prototype.getStyle = function (obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        }
        else {
            return document.defaultView.getComputedStyle(obj, null)[attr];
        }
    };
    TouchScroll.prototype.bindNoScroll = function () {
        if (this.noScrolls.length > 0) {
            this.noScrolls.forEach(function (item) {
                console.log(item);
                item.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
            });
        }
    };
    TouchScroll.prototype.binds = function (obj, fn) {
        return function (e) {
            // console.log('arg',e); 
            arguments[0] = e;
            fn.apply(obj, arguments);
        };
    };
    TouchScroll.prototype.bindEvents = function () {
        this._touchStartHandler = this.binds(this, this.touchStartHandler);
        this.target.addEventListener('touchstart', this._touchStartHandler, false);
    };
    TouchScroll.prototype.touchStartHandler = function (e) {
        console.log(e);
        var touch = e.targetTouches[0];
        this.startX = touch.pageX;
        this.startY = touch.pageY;
        this._touchMoveHandler = this.binds(this, this.touchMoveHandler);
        this._touchEndHandler = this.binds(this, this.touchEndHandler);
        this.target.addEventListener('touchmove', this._touchMoveHandler, false);
        this.target.addEventListener('touchend', this._touchEndHandler, false);
    };
    TouchScroll.prototype.touchMoveHandler = function (e) {
        // 核心
        e.preventDefault();
        // 限流-start
        this.limit++;
        if (this.limit >= 5) {
            this.limit = 0;
            this.bool = true;
        }
        if (!this.bool)
            return;
        this.bool = false;
        // 限流-end
        var touch = e.targetTouches[0];
        var offsetX = touch.pageX - Number(this.startX);
        var offsetY = touch.pageY - Number(this.startY);
        var rangX = offsetX + this.endX;
        var rangY = offsetY + this.endY;
        if (Math.abs(rangY) > this.pHeight) {
            rangY = -this.pHeight;
        }
        if (rangY > 0) {
            rangY = 0;
        }
        if (Math.abs(rangX) > this.pWidth) {
            rangX = -this.pWidth;
        }
        if (rangX > 0) {
            rangX = 0;
        }
        // this.offsetX = offsetX;
        // this.offsetY = offsetY;
        // console.log(rangX);
        console.log(rangY);
        this.endX = rangX;
        this.endY = rangY;
        if (this.des == 'y') {
            // y滚动
            this.target.style.transform = "translateY(" + rangY + "px)";
        }
        else if (this.des == 'x') {
            // x滚动
            this.target.style.transform = "translateX(" + rangX + "px)";
        }
        else {
            this.target.style.transform = "translate(" + rangX + "px," + rangY + "px)";
        }
    };
    TouchScroll.prototype.touchEndHandler = function (e) {
        this.target.removeEventListener('touchmove', this._touchMoveHandler);
        this.target.removeEventListener('touchend', this._touchEndHandler);
    };
    return TouchScroll;
}());
