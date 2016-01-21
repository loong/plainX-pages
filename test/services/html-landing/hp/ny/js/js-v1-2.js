var isMobile = false;
var systemInfo = navigator.userAgent.toLowerCase() + navigator.platform.toLowerCase();
if (systemInfo.indexOf('windows phone') >= 0 || systemInfo.indexOf('ipad') >= 0 || systemInfo.indexOf('iphone') >= 0 || systemInfo.indexOf('blackberry') >= 0 || systemInfo.indexOf('android') >= 0)
{
    isMobile = true;
}
var socialLng = lng;
if (lng == "en")
{
    socialLng = "www";
}
var socialLngFb = {
    en: "http%3A%2F%2Fwww.facebook.com/wix",
    de: "http%3A%2F%2Fwww.facebook.com/wix",
    pl: "http%3A%2F%2Fwww.facebook.com/wix",
    ru: "http%3A%2F%2Fwww.facebook.com/wix",
    it: "http%3A%2F%2Fwww.facebook.com/wix",
    ko: "http%3A%2F%2Fwww.facebook.com/wix",
    ja: "http%3A%2F%2Fwww.facebook.com/WixJapan",
    es: "http%3A%2F%2Fwww.facebook.com/WixEspanol",
    pt: "http%3A%2F%2Fwww.facebook.com/WixPortugues",
    fr: "http%3A%2F%2Fwww.facebook.com/WixFrancais"
};

var ui;
var ani_interval = 5000;
var safe_zone = null;
var scrollPos;
var tourVideo = null;
var stage_1_Animation = null;
var resolutionManager = null;
var my_account_url;
var postreg_url;
var shortHost = document.location.host.substr(document.location.host.indexOf('.'));
var host_lang = document.location.host.split(".")[0];
if (host_lang == "static" || host_lang == "test")
{
    host_lang = "www";
}
my_account_url = 'http://' + host_lang + shortHost + '/create/my-account';
postreg_url = 'http://' + host_lang + shortHost + '/new/account';
function ResolutionManager()
{
    this.timer = null;
    this.screenTimer = null;
    this.steps = [1280,1600,1920];
    this.screenWidth = window.screen.availWidth;
    this.width = document.getElementsByTagName('html')[0].clientWidth;
    this.currentStepInx = 2;
    var selfResolutionManager = this;
    if (!ie8)
    {
        for (var i = 0; i < this.steps.length; i++)
        {
            if (this.width <= this.steps[i])
            {
                this.currentStepInx = i;
                break;
            }
        }
    }
}

function VideoPlayer()
{
    this.vtable = null;
    this.onVideoClose = null;
    var selfVideoPlayer = this;
    this.showDemoVideo = function (div)
    {
        var vtable = document.createElement('table');
        vtable.setAttribute('cellpadding','0');
        vtable.setAttribute('cellspacing','0');
        var vtBody = document.createElement('tbody');
        vtable.appendChild(vtBody);
        var vtd = vtable.insertRow(0).insertCell(0);
        vtd.table = vtable;
        vtd.setAttribute('align','center');
        vtd.setAttribute('valign','middle');
        vtd.style.width = '100%';
        vtd.style.height = '100%';
        vtable.className = 'vtable';
        vtable.selfVideo = this;
        if (!ie8)
        {
            vtable.addEventListener('click',this.closeVideo,false);
        } else
        {
            vtable.attachEvent('onclick',this.closeVideo);
        }
        document.body.appendChild(vtable);
        vtd.appendChild(div);
        this.vtable = vtable;
        setTimeout(function ()
        {
            vtable.style.opacity = 1;
        },80);
    }
    this.closeVideo = function (e)
    {
        var table = selfVideoPlayer.vtable;
        var target = null;
        if (ie8)
        {
            target = e.srcElement;
        } else
        {
            target = e.target;
        }
        if ((target == table.rows[0].cells[0]) || (target == table.rows[0].cells[0].children[0].children[0]))
        {
            table.style.opacity = 0;
            setTimeout(function ()
            {
                document.body.removeChild(table);
            },360);
            if (table.selfVideo.onVideoClose != null)
            {
                table.selfVideo.onVideoClose();
            }
        }
    }
    this.createVideo = function (_onVideoClose,width,height,imageUrl,videoUrl,videoTitle,autoPlay)
    {
        this.onVideoClose = _onVideoClose;
        var flashVars = "video_url=" + videoUrl + "&image_url=" + imageUrl + "&auto_play=" + autoPlay;
        var flashObj = '<div class="closeVideoButton" style="left:$width$px;" ></div><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="$width$" height="$height$" id="wixvideo" align="middle">';
        flashObj += '<param name="movie" value="' + staticHostVideo + 'wixvideo_purple.swf?v=6" />';
        flashObj += '<param name="quality" value="high" />';
        flashObj += '<param name="bgcolor" value="#000000" />';
        flashObj += '<param name="play" value="true" />';
        flashObj += '<param name="loop" value="true" />';
        flashObj += '<param name="wmode" value="transparent" />';
        flashObj += '<param name="scale" value="noscale" />';
        flashObj += '<param name="menu" value="true" />';
        flashObj += '<param name="devicefont" value="false" />';
        flashObj += '<param name="salign" value="lt" />';
        flashObj += '<param name="allowScriptAccess" value="sameDomain" />';
        flashObj += '<param name="allowFullScreen" value="true" />';
        flashObj += '<param name="flashvars" value="$flashvars$" />';
        flashObj += '<embed menu="true" flashvars="$flashvars$" id="wixvideo" wmode="transparent" scale="noscale" salign="lt" quality="high" height="$height$" width="$width$" type="application/x-shockwave-flash" src="' + staticHostVideo + 'wixvideo_purple.swf?v=5" allowscriptaccess="always" allowfullscreen="true" bgcolor="#000000" >';
        flashObj += '</object>';
        flashObj = flashObj.replace(/\$width\$/g,width);
        flashObj = flashObj.replace(/\$height\$/g,height);
        flashObj = flashObj.replace(/\$flashvars\$/g,flashVars);
        var div = document.createElement('div');
        div.style.width = width + 'px';
        div.style.height = height + 'px';
        div.style.position = 'relative';
        div.style.border = 'solid 5px white';
        div.style.borderRadius = '4px 0px 4px 4px';
        div.innerHTML = flashObj;
        this.showDemoVideo(div);
    }
    this.createYoutubeVideo = function (_onVideoClose,width,height,embedcode)
    {
        this.onVideoClose = _onVideoClose;
        var div = document.createElement('div');
        div.style.width = width + 'px';
        div.style.height = height + 'px';
        div.style.position = 'relative';
        div.innerHTML = embedcode;
        this.showDemoVideo(div);
    }
}
function ITween(component,duration,startVals,endVals,inx,tweenProps,params,style,color)
{
    this._totalVals = 0;
    if (startVals != null)
    {
        this._totalVals = startVals.length;
    }
    this._active;
    this._toFree = false;
    this._duration = duration;
    this._Function = null;
    this._pDelta = 0;
    this._onc = null;
    this._oupd = null;
    this._delay = 0;
    if (tweenProps != null)
    {
        if (tweenProps.Function != null)
            this._Function = tweenProps.Function;
        if (tweenProps.onComplete != null)
            this._onc = tweenProps.onComplete;
        if (tweenProps.onUpdate != null)
            this._oupd = tweenProps.onUpdate;
        if (tweenProps.delay != null)
            this._delay = tweenProps.delay * 1000;
        if (tweenProps.units != null)
            this._units = tweenProps.units;
    }
    if (this._units == undefined)
    {
        this._units = 'px';
    }
    this._endVals = endVals;
    this._startVals = startVals;
    this._inx = inx;
    this._startTime;
    this._initTime = tick;
    this._pauseTime = tick;
    this._sprite = component;
    this._style = style;
    this._params = params;
    for (var i = 0; i < this._totalVals; i++)
    {
        this._endVals[i] -= this._startVals[i];
    }
    if (color != null)
    {
        this._color = color;
    }
    if (this._delay > 0.0)
    {
        this._startTime = this._initTime;
        this._active = false;
    } else
    {
        this._startTime = this._initTime;
        this._active = true;
    }
}
function ISizeTween()
{
    this.prototype = ISizeTween.prototype;
    this.ie = false;
    this.opera = false;
    this.firefox = false;
    if (document.createEventObject)
    {
        this.ie = true;
    } else if (window.attachEvent || window.opera)
    {
        this.opera = true;
    }
    if (navigator.userAgent.indexOf("Firefox") != -1)
    {
        this.firefox = true;
    }
    ITweenBase.apply(this);
    ISizeTween.prototype.setObjectCurrentStyle = function (component,prop,value)
    {
        if (this.ie && component.Enabled != undefined)
        {
            component[prop] = value;
        } else
        {
            component.style[prop] = value;
        }
    }
    ISizeTween.prototype.getObjectCurrentStyle = function (component,prop)
    {
        if (this.ie && component.Enabled != undefined)
        {
            return parseFloat(component[prop]);
        }
        if (prop == 'backgroundPositionY' && this.opera)
        {
            return parseFloat((component.currentStyle['backgroundPosition'].split(' ')[1]));
        }
        if (prop == 'scrollTop')
        {
            return parseFloat(component.style['scrollTop']);
        }
        if (component.selectorText != undefined || component.parentRule != undefined)
        {
            return parseFloat(component.style[prop]);
        } else
        {
            if (!component.currentStyle)
            {
                var v = window.getComputedStyle(component,"").getPropertyCSSValue(prop);
                return parseFloat(v.getFloatValue(v.primitiveType));
            } else
            {
                if (component.currentStyle[prop] == undefined)
                {
                    return parseFloat(component.style[prop]);
                } else
                {
                    return parseFloat(component.currentStyle[prop]);
                }
            }
        }
    }
    ISizeTween.prototype.getObjectCurrentStyleAsString = function (component,prop)
    {
        if (this.ie && component.Enabled != undefined)
        {
            return (component[prop]).toString();
        }
        var compStyle;
        if (window.getComputedStyle)
        {
            compStyle = window.getComputedStyle(component,"");
        } else
        {
            compStyle = component.currentStyle;
        }
        return compStyle[prop].toString();
    }
    ISizeTween.prototype.to = function (component,duration,toVars,tweenProps)
    {
        if (component != null && duration != null && duration >= 0)
        {
            var style;
            if (this.ie && component.Enabled != undefined)
            {
                style = component;
            } else
            {
                style = component.style;
            }
            var params = new Array();
            var startVals = new Array();
            var endVals = new Array();
            for (var v in toVars)
            {
                params.push(v);
                startVals.push(this.getObjectCurrentStyle(component,v));
                endVals.push(toVars[v]);
            }
            if (!isMainLoop)
            {
                tick = 0;
            }
            var tween = new ITween(component,duration,startVals,endVals,this.tweenLen,tweenProps,params,style,null);
            this.tweens.push(tween);
            this.tweenLen = this.tweens.length;
            if (!isMainLoop)
            {
                isMainLoop = true;
                timedCount();
            }
        }
    }
    ISizeTween.prototype.colorTo = function (component,duration,colorProp,toColor,tweenProps)
    {
        if (component != null && duration != null && duration >= 0)
        {
            var colorStr = component[colorProp];
            var color = new Object();
            if (colorStr.indexOf('#') == 0)
            {
                colorStr = colorStr.replace('#','');
            }
            if (colorStr.length == 8)
            {
                color._startAVals = parseInt(colorStr.substr(0,2),16);
                color._endAVals = parseInt(toColor.substr(0,2),16) - color._startAVals;
                color._startRVals = parseInt(colorStr.substr(2,2),16);
                color._endRVals = parseInt(toColor.substr(2,2),16) - color._startRVals;
                color._startGVals = parseInt(colorStr.substr(4,2),16);
                color._endGVals = parseInt(toColor.substr(4,2),16) - color._startGVals;
                color._startBVals = parseInt(colorStr.substr(6,2),16);
                color._endBVals = parseInt(toColor.substr(6,2),16) - color._startBVals;
                color.a = color.r = color.g = color.b = 0;
                color.hasAlpha = true;
            } else
            {
                color._startRVals = parseInt(colorStr.substr(0,2),16);
                color._endRVals = parseInt(toColor.substr(0,2),16) - color._startRVals;
                color._startGVals = parseInt(colorStr.substr(2,2),16);
                color._endGVals = parseInt(toColor.substr(2,2),16) - color._startGVals;
                color._startBVals = parseInt(colorStr.substr(4,2),16);
                color._endBVals = parseInt(toColor.substr(4,2),16) - color._startBVals;
                color.r = color.g = color.b = 0;
                color.hasAlpha = false;
            }
            color._colorProp = colorProp;
            if (!isMainLoop)
            {
                tick = 0;
            }
            var tween = new ITween(component,duration,null,null,this.tweenLen,tweenProps,null,null,color);
            this.tweens.push(tween);
            this.tweenLen = this.tweens.length;
            if (!isMainLoop)
            {
                isMainLoop = true;
                timedCount();
            }
        }
    }
    ISizeTween.prototype.toHex = function (val)
    {
        val = parseInt(val);
        val = Math.max(0,val);
        val = Math.min(val,255);
        val = Math.round(val);
        return '0123456789ABCDEF'.charAt((val - val % 16) / 16) + '0123456789ABCDEF'.charAt(val % 16);
    };
    ISizeTween.prototype.renderTween = function (inx)
    {
        var factor;
        var p;
        var time;
        var cTween = this.tweens[inx];
        if (!cTween._sprite)
        {
            this.completeNoFn(inx);
        }
        time = (tick - cTween._startTime) / 1000;
        if (time >= cTween._duration)
        {
            time = cTween._duration;
            factor = 1.0;
        } else
        {
            factor = this[cTween._Function](time,cTween._duration);
        }
        for (p = 0; p < cTween._totalVals; p++)
        {
            cTween._style[cTween._params[p]] = cTween._startVals[p] + (factor * cTween._endVals[p]) + cTween._units;
        }
        if (cTween._color)
        {
            var c = cTween._color;
            c.r = Math.round(c._startRVals + (factor * c._endRVals));
            c.g = Math.round(c._startGVals + (factor * c._endGVals));
            c.b = Math.round(c._startBVals + (factor * c._endBVals));
            if (c.hasAlpha)
            {
                c.a = Math.floor(c._startAVals + (factor * c._endAVals));
                var colVal = '#' + this.toHex(c.a) + this.toHex(c.r) + this.toHex(c.g) + this.toHex(c.b);
                cTween._sprite[c._colorProp] = colVal;
            }
        }
        if (cTween._oupd != null)
        {
            cTween._oupd(cTween._sprite);
        }
        if (factor == 1)
        {
            cTween._toFree = true;
        }
    }
}
function ITweenBase()
{
    this.isPaused = false;
    this.tweenLen = 0;
    this.tweens = new Array();
    IEaseFunc.apply(this);
    this.prototype.executeAll = function ()
    {
        var i;
        if (this.isPaused)
        {
            for (i = 0; i < this.tweenLen; i++)
            {
                var cTween = this.tweens[i];
                cTween._startTime = cTween._initTime + (tick - cTween._pauseTime) + cTween._pDelta;
            }
            return;
        }
        for (i = 0; i < this.tweenLen; i++)
        {
            var cTween = this.tweens[i];
            if (cTween._active)
            {
                this.renderTween(cTween._inx);
            } else if ((tick - cTween._startTime) >= cTween._delay)
            {
                cTween._startTime += cTween._delay;
                cTween._initTime += cTween._delay;
                cTween._active = true;
                this.renderTween(cTween._inx);
            }
        }
        this.freeTweens();
    }
    this.prototype.freeTweens = function ()
    {
        for (var i = 0; i < this.tweenLen; i++)
        {
            if (this.tweens[i]._toFree)
            {
                this.complete(i);
                i -= 1;
            }
        }
    }
    this.prototype.splice = function (inx)
    {
        this.tweens.splice(inx,1);
        this.tweenLen = this.tweens.length;
        for (var i = inx; i < this.tweenLen; i++)
        {
            this.tweens[i]._inx--;
        }
    }
    this.prototype.completeNoFn = function (inx)
    {
        this.splice(inx);
    }
    this.prototype.complete = function (inx)
    {
        if (this.tweens[inx]._onc != null)
        {
            this.tweens[inx]._onc(this.tweens[inx]._sprite);
        }
        this.splice(inx);
    }
    this.prototype.pauseAll = function (localt)
    {
        var j;
        if (!this.isPaused)
        {
            for (j = 0; j < this.tweenLen; j++)
            {
                this.tweens[j]._pauseTime = localt;
            }
            this.isPaused = true;
        }
    }
    this.prototype.resumeAll = function ()
    {
        var j;
        if (this.isPaused)
        {
            for (j = 0; j < this.tweenLen; j++)
            {
                this.tweens[j]._startTime = this.tweens[j]._initTime + (tick - this.tweens[j]._pauseTime) + this.tweens[j]._pDelta;
                this.tweens[j]._pDelta += (tick - this.tweens[j]._pauseTime);
            }
            this.isPaused = false;
        }
    }
    this.prototype.killAllTweens = function ()
    {
        this.isPaused = false;
        this.tweens.splice(0,this.tweens.length);
        this.tweenLen = 0;
    }
    this.prototype.killTweensOf = function (obj)
    {
        for (var i = 0; i < this.tweenLen; i++)
        {
            if (this.tweens[i]._sprite == obj)
            {
                this.splice(i);
                i--;
            }
        }
    }
    this.prototype.numOfTweens = function (obj)
    {
        var i;
        var j = 0;
        for (i = 0; i < this.tweenLen; i++)
        {
            if (this.tweens[i]._sprite == obj)
            {
                j++;
            }
        }
        return j;
    }
}
function IEaseFunc()
{
    this.prototype.Back_easeIn = function (t,d)
    {
        return (t /= d) * t * ((2.70158) * t - 1.70158);
    }
    this.prototype.Back_easeOut = function (t,d)
    {
        return ((t = t / d - 1) * t * ((2.70158) * t + 1.70158) + 1);
    }
    this.prototype.Bounce_easeOut = function (t,d)
    {
        if ((t /= d) < (1.0 / 2.75))
        {
            return (7.5625 * t * t);
        } else if (t < (2 / 2.75))
        {
            return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
        } else if (t < (2.5 / 2.75))
        {
            return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
        } else
        {
            return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
        }
    }
    this.prototype.Bounce_easeIn = function (t,d)
    {
        return 1 - Bounce_easeOut(d - t,d);
    }
    this.prototype.Cubic_easeIn = function (t,d)
    {
        return (t /= d) * t * t;
    }
    this.prototype.Cubic_easeOut = function (t,d)
    {
        return ((t = t / d - 1) * t * t + 1);
    }
    this.prototype.Linear_easeNone = function (t,d)
    {
        return t / d;
    }
    this.prototype.Linear_easeIn = function (t,d)
    {
        return t / d;
    }
    this.prototype.Linear_easeOut = function (t,d)
    {
        return t / d;
    }
}
var windoeScroll = null;
var tick = 0;
var isMainLoop = false;
var sizeTween = new ISizeTween();
function timedCount()
{
    sizeTween.executeAll();
    tick += 16;
    if (sizeTween.tweenLen > 0)
    {
        setTimeout("timedCount()",16);
    } else
    {
        isMainLoop = false;
    }
}
function addScript(u,load)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (load != null)
    {
        script.onload = load;
    }
    head.appendChild(script);
    script.src = u;
}
function addCssScript(u,load)
{
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.type = 'text/css';
    style.rel = "stylesheet";
    if (load != null)
    {
        style.onload = load;
    }
    head.appendChild(style);
    style.href = u;
}
function disableScroll(e)
{
    if (e.button == 1)
    {
        e.preventDefault();
        return false;
    }
}



/*
############################################
TOP ANIMATION
############################################
*/
function Stage_1_Animation()
{
    this.initiliezed = false;
    this.numOfImages = numOfImages;
    this.resolution = 1920;
    this.flipTimer = null;
    this.resolutionTimer = null;
    this.slideIndex = 0;
    this.slides = new Array();
    this.currentTop = 1;
    this.currentBack = 0;
    this.stop = false;
    this.navEnd = function (e)
    {
        if (e.currentTarget == stage_1_Animation.slides[stage_1_Animation.currentTop])
        {
            stage_1_Animation.animationEnded();
        }
    }
    this.navEndIe = function (comp)
    {
        stage_1_Animation.animationEnded();
    }
    this.flip = function ()
    {
        this.currentBack = this.currentTop;
        if (this.currentTop == 0)
        {
            this.slides[0].style.zIndex = 1000;
            this.slides[1].style.zIndex = 1001;
            this.currentTop = 1;
        } else
        {
            this.slides[1].style.zIndex = 1000;
            this.slides[0].style.zIndex = 1001;
            this.currentTop = 0;
        }
        this.slideIndex++;
        if (this.slideIndex >= this.numOfImages)
        {
            this.slideIndex = 0;
        }
        if (ie8)
        {
            this.slides[this.currentTop].setAttribute('inx','_' + this.slideIndex.toString());
            this.slides[this.currentTop].style.backgroundImage = "url(" + staticHostImages + "1920/stage_1/" + pepoleDir + this.slideIndex.toString() + ".jpg)";
            this.slides[this.currentTop].style.left = '0%';
            this.slides[this.currentBack].style.left = '0%';
            if (!this.stop)
            {
                if (this.flipTimer != null)
                {
                    clearTimeout(this.flipTimer);
                    this.flipTimer = null;
                }
                this.flipTimer = setTimeout(function ()
                {
                    stage_1_Animation.flip();
                },ani_interval);
            }
            return;
        }
        this.slides[this.currentTop].style.visibility = 'visible';
        this.slides[this.currentTop].setAttribute('inx','_' + this.slideIndex.toString());
        if (lte9)
        {
            sizeTween.killTweensOf(this.slides[this.currentTop]);
            sizeTween.killTweensOf(this.slides[this.currentBack]);
            sizeTween.to(this.slides[this.currentTop],0.8,{
                left: 0
            },{
                Function: 'Cubic_easeOut',
                delay: 0.2,
                units: '%',
                onComplete: this.navEndIe
            });
            sizeTween.to(this.slides[this.currentBack],0.8,{
                left: -50
            },{
                Function: 'Cubic_easeOut',
                delay: 0.2,
                units: '%'
            });
        } else
        {
            setTimeout(function ()
            {
                stage_1_Animation.slides[stage_1_Animation.currentTop].style.left = '0%';
                stage_1_Animation.slides[stage_1_Animation.currentBack].style.left = '-50%';
            },500);
        }
    }
    this.animationEnded = function ()
    {
        if (lte9)
        {
            sizeTween.killTweensOf(this.slides[this.currentTop]);
            sizeTween.killTweensOf(this.slides[this.currentBack]);
        }
        this.slides[this.currentBack].style.visibility = 'hidden';
        this.slides[this.currentBack].style.left = '100%';
        if (!this.stop)
        {
            if (this.flipTimer != null)
            {
                clearTimeout(this.flipTimer);
                this.flipTimer = null;
            }
            this.flipTimer = setTimeout(function ()
            {
                stage_1_Animation.flip();
            },ani_interval);
        }
    }
    this.stopAnimation = function ()
    {
        this.stop = true;
        if (this.flipTimer != null)
        {
            clearTimeout(this.flipTimer);
            this.flipTimer = null;
        }
    }
    this.startAnimation = function (_delay)
    {
        var delay = 2000;
        if (_delay)
        {
            delay = _delay;
        }
        this.stop = false;
        if (this.flipTimer != null)
        {
            clearTimeout(this.flipTimer);
            this.flipTimer = null;
        }
        if (this.numOfImages > 1)
        {
            this.flipTimer = setTimeout(function ()
            {
                stage_1_Animation.flip();
            },delay);
        }
    }
    this.init = function (res)
    {
        this.resolution = res;
        this.slides.push(document.getElementById("stg1_slide1"));
        this.slides.push(document.getElementById("stg1_slide2"));
        if (!lte9)
        {
            this.slides[0].addEventListener('transitionend',this.navEnd,false);
            this.slides[0].addEventListener('webkitTransitionEnd',this.navEnd,false);
            this.slides[0].addEventListener('oTransitionEnd',this.navEnd,false);
            this.slides[1].addEventListener('transitionend',this.navEnd,false);
            this.slides[1].addEventListener('webkitTransitionEnd',this.navEnd,false);
            this.slides[1].addEventListener('oTransitionEnd',this.navEnd,false);
        }
        if (this.numOfImages > 1)
        {
            for (var i = 0; i < this.numOfImages; i++)
            {
                if (i > 0)
                {
                    var image = new Image();
                    image.src = staticHostImages + this.resolution.toString() + "/stage_1/" + pepoleDir + i.toString() + ".jpg";
                }
            }
            this.startAnimation(ani_interval);
        }
        if (!ie8)
        {
            var i = 0;
            for (var q = 0; q < this.numOfImages; q++)
            {
                for (i = 0; i < resolutionManager.steps.length; i++)
                {
                    if (resolutionManager.steps[i] != res)
                    {
                        var image = new Image();
                        image.src = staticHostImages + resolutionManager.steps[i].toString() + "/stage_1/" + pepoleDir + q.toString() + ".jpg";
                    }
                }
            }
        }
    }
}
tourVideo = new VideoPlayer();
resolutionManager = new ResolutionManager();
var flagsAnimObj = { Enabled: true,marginTop: 0 };
var flagHeight;
function onFlagsCompleteIe(element)
{
    for (var i = 0; i < flag_container.children.length; i++)
    {
        //flag_container.children[i].style.opacity = '0';
    }
}
function onFlagsUpdateIe(element)
{
    if (ie8)
    {
        for (var i = 0; i < flag_container.children.length; i++)
        {
            flag_container.children[i].style.marginTop = flagsAnimObj.marginTop + 'px';
        }
    } else
    {
        for (var i = 0; i < flag_container.children.length; i++)
        {
            flag_container.children[i].style.marginTop = flagsAnimObj.marginTop.toString() + 'px';
            flag_container.children[i].style.opacity = 1 - (flagsAnimObj.marginTop / flagHeight);
        }
    }
}
function showFlagsIe()
{
    if (!lte9) return;
    sizeTween.killTweensOf(flagsAnimObj);
    /*for (var i = 0; i < flag_container.children.length; i++)
    {
        flag_container.children[i].style.opacity = '1';
    }*/
    if (ie8)
    {
        var rc = flag_container.children[1].getBoundingClientRect();
        flagHeight = flagsAnimObj.marginTop = -(rc.bottom - rc.top);
    } else
    {
        flagHeight = flagsAnimObj.marginTop = -flag_container.children[1].getBoundingClientRect().height;
    }
    sizeTween.to(flagsAnimObj,0.4,{
        marginTop: 0
    },{
        Function: 'Cubic_easeOut',
        onUpdate:onFlagsUpdateIe,
        units: 0
    });
}
function hideFlagsIe()
{
    if (!lte9) return;
    sizeTween.killTweensOf(flagsAnimObj);
    var h;
    if (ie8)
    {
        var rc = flag_container.children[1].getBoundingClientRect();
        flagHeight = h = -(rc.bottom - rc.top);
    } else
    {
        flagHeight = h = -flag_container.children[1].getBoundingClientRect().height;
    }
    sizeTween.to(flagsAnimObj,0.4,{
        marginTop: h
    },{
        Function: 'Cubic_easeOut',
        onComplete: onFlagsCompleteIe,
        onUpdate: onFlagsUpdateIe,
        units: 0
    });
}
function search(e)
{
    if (e != null)
    {
        var keyNum = !e.charCode ? e.which : e.charCode;
        if (keyNum != 13)
        {
            return;
        }
    }
    if (searchbox.value.length > 0)
    {
        window.location.href = "http://www.wix.com/website/templates/?criteria=" + encodeURIComponent(searchbox.value) + "&page=1";
    } else
    {
        window.location.href = "http://www.wix.com/website/templates/";
    }
}
function logout()
{
    UserServerApi.logout();
    window.location.reload();
}
function openLogin()
{
    LoginDialog.show({ origin: "hp-" + lng });
}
function onVideoClosed()
{
    stage_1_Animation.startAnimation();
}
function showVideoTour()
{
    stage_1_Animation.stopAnimation();
    if (!isMobile)
    {
        tourVideo.createVideo(onVideoClosed,'800','472',staticHostVideo + 'demo.jpg',staticHostVideo + 'wixdemo.flv','Wix Tour','true');
    } else
    {
        tourVideo.createYoutubeVideo(onVideoClosed,'640','480','<iframe width="640" height="480" src="http://www.youtube.com/embed/8JkrZ7mbFVE" frameborder="0" style="display:block;position:static;" allowfullscreen></iframe>');
    }
}
function onMyAccount()
{
    if (UserServerApi.isSessionValid())
    {
        window.location.href = my_account_url;
    } else
    {
        openLogin();
    }
}
function onPinterestLoaded()
{
    document.getElementById("pinterest_share").innerHTML = '<a target="_blank" href="http://pinterest.com/pin/create/button/?url=' + socialLng + '.wix.com&media=http%3A%2F%2Fstatic.wix.com%2Fservices%2Fhtml-landing%2Fhtml%2Flp2%2Fimages%2Ffacebook-tumbnail.jpg&description=' + document.title + '" class="pin-it-button" count-layout="horizontal"><img border="0" target="_blank" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a>';
}
function onSetLanguageError(obj) { }
function onSetLanguageSuccess(obj)
{
    if (selectedLanguage == "en")
    {
        window.location.href = "http://www.wix.com";
    } else
    {
        window.location.href = "http://" + selectedLanguage + ".wix.com";
    }
}
function switchLng(newLng,e)
{
    selectedLanguage = newLng;
    UserServerApi.setLanguage(newLng,onSetLanguageError,onSetLanguageSuccess);
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function mobileMenuClick(a,b)
{
    if (!isMobile)
    {
        return;
    }
    var item_a = document.getElementById('mi' + a);
    var item_b = document.getElementById('mi' + b);
    if (item_a.getAttribute('down') != 'true')
    {
        item_a.setAttribute('down','true');
        item_b.setAttribute('down','false');
        document.getElementById('menu_flags').setAttribute('down','false');
    } else
    {
        item_a.setAttribute('down','false');
        item_b.setAttribute('down','false');
    }
}
function mobileLangClick(mi)
{
    if (!isMobile)
    {
        return;
    }
    if (mi.getAttribute('down') == 'false')
    {
        mi.setAttribute('down','true');
        document.getElementById('mi0').setAttribute('down','false');
        document.getElementById('mi1').setAttribute('down','false');
    } else
    {
        mi.setAttribute('down','false');
    }
}
function onPageLoad()
{
    if (lte9)
    {
        document.body.style.opacity = 1;
    }
    ui = document.getElementById('ui');
    safe_zone = document.getElementById('safe_zone');
    loggedIn = document.getElementById('loggedin_inline');
    if (sizeTween.firefox || sizeTween.ie || sizeTween.opera)
    {
        windoeScroll = {
            style: document.getElementsByTagName('html')[0]
        };
    } else
    {
        windoeScroll = {
            style: document.body
        };
    }
    
    if (sizeTween.ie || sizeTween.firefox || sizeTween.opera)
    {
        scrollPos = document.getElementsByTagName('html')[0];
    } else
    {
        scrollPos = document.body;
    }
    stage_1_Animation.init(resolutionManager.steps[resolutionManager.currentStepInx]);
    setTimeout(function ()
    {
        dummy.parentNode.removeChild(dummy);
        if (!ie8)
        {
            document.getElementById("stg1_slide2").setAttribute("inx","_0");
        }
    },1000);
    if (document.location.host.indexOf('wix.com') < 0)
    {
        var alllinks = document.body.getElementsByTagName('a');
        for (var i = 0; i < alllinks.length; i++)
        {
            var h = alllinks.item(i).href;
            if (h.indexOf('http://www.wix.com') == 0)
            {
                alllinks.item(i).href = h.replace('http://www.wix.com','http://' + document.location.host.replace('static','www'));
            }
        }
    }
    setTimeout(function ()
    {
        if (!ie8)
        {
            addScript("//assets.pinterest.com/js/pinit.js",onPinterestLoaded);
        } else
        {
            onPinterestLoaded();
        }
        document.getElementById("facebook_share").innerHTML = '<iframe src="//www.facebook.com/plugins/like.php?href=' + socialLngFb[lng] + '&amp;send=false&amp;layout=button_count&amp;width=80&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=236335823061286" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:22px;" allowTransparency="true"></iframe>';
        document.getElementById("twitter_share").innerHTML = '<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + wixTwitter + '" data-url="0" >Tweet</a>';
        !function (d,s,id)
        {
            var js,
			    fjs = d.getElementsByTagName(s)[0];
            if (!d.getElementById(id))
            {
                js = d.createElement(s);
                js.id = id;
                js.src = "//platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js,fjs);
            }
        }
		    (document,"script","twitter-wjs");
    },1500);
}
stage_1_Animation = new Stage_1_Animation();