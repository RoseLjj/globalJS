/**
 * Created by wupeitao on 16/8/25.
 */

function show(str) {
    new Toast({context: $('body'), message: str, time: 5000}).show();
}

/**

 * 模仿android里面的Toast效果，主要是用于在不打断程序正常执行的情况下显示提示数据

 * @param config

 * @return

 */

var Toast = function (config) {

    this.context = config.context == null ? $('body') : config.context;//上下文

    this.message = config.message;//显示内容

    this.time = config.time == null ? 3000 : config.time;//持续时间

    this.left = config.left;//距容器左边的距离

    this.top = config.top;//距容器上方的距离

    this.init();

}

var msgEntity;

Toast.prototype = {

//初始化显示的位置内容等

    init: function () {

        $("#toastMessage").remove();

//设置消息体

        var msgDIV = new Array();

        msgDIV.push('<div id="toastMessage" style="width: 100%;text-align: center">');

        msgDIV.push('<span>' + this.message + '</span>');

        msgDIV.push('</div>');

        msgEntity = $(msgDIV.join('')).appendTo(this.context);

//设置消息样式

        //var left = this.left == null ? this.context.width() / 2 - msgEntity.find('span').width() / 2 : this.left;
        //left: left,
        var top = this.top == null ? '45px' : this.top;

        msgEntity.css({
                position: 'fixed',
                top: top,
                'z-index': '99',
                width: '100%',
                'background-color': 'black',
                color: 'white',
                'font-size': '18px',
                padding: '10px',
                radius: '15px',
                opacity: '0.7'

            }
        )
        ;
        msgEntity.hide();
    },
//显示动画
    show: function () {

        msgEntity.fadeIn(this.time / 2);

        msgEntity.fadeOut(this.time / 2);

    }

}


function showDialog() {
    new Dialog({context: $('body'), message: ''}).show();
}

function cancelDialog() {
    $("#DialogMessage").remove();
}


function displayDialog() {
    new Dialog({context: $('body'), message: ''}).show();
}
function undisplayDialog() {
    $("#DialogMessage").remove();
}
/**

 * 模仿android里面的进度条效果，主要是用于在不打断程序正常执行的情况下显示提示数据

 * @param config

 * @return

 */

var Dialog = function (config) {

    this.context = config.context == null ? $('body') : config.context;//上下文

    this.message = config.message;//显示内容

    //this.time = config.time == null ? 3000 : config.time;//持续时间

    this.left = config.left;//距容器左边的距离

    this.top = config.top;//距容器上方的距离

    this.init();

};
var dialogmsgEntity;

Dialog.prototype = {

//初始化显示的位置内容等

    init: function () {

        $("#DialogMessage").remove();

//设置消息体

        var dialogmsgDIV = new Array();
        dialogmsgDIV.push('<div id="DialogMessage" style="width: 100%;height:100%;">');

        dialogmsgDIV.push('<div id="Message" style="width: 100%;text-align: center">');

        dialogmsgDIV.push('<span><img id="img5" style="width: 64px;height:64px;margin-top: 200px; " src="../../img/progress_flower.png"></span>');
        dialogmsgDIV.push('<span><br><br>正在请求数据请稍等...</span>');

        dialogmsgDIV.push('</div>');
        dialogmsgDIV.push('</div>');

        dialogmsgEntity = $(dialogmsgDIV.join('')).appendTo(this.context);

//设置消息样式

        //var left = this.left == null ? this.context.width() / 2 - msgEntity.find('span').width() / 2 : this.left;
        //left: left,
        var top = this.top == null ? '0px' : this.top;

        dialogmsgEntity.css({
                position: 'fixed',
                top: top,
                'z-index': '99',
                width: '100%',
                'background-color': 'black',
                color: 'white',
                'font-size': '18px',
                padding: '10px',
                radius: '15px',
                opacity: '0.7'
            }
        )
        ;
        dialogmsgEntity.hide();
        rotation2();
    },
//显示动画
    show: function () {

        dialogmsgEntity.fadeIn(this.time / 2);
    }
};

var rotation2 = function () {
    $("#img5").rotate({
        angle: 0,
        animateTo: 360,
        callback: rotation2,
        easing: function (x, t, b, c, d) {        // t: current time, b: begInnIng value, c: change In value, d: duration
            return c * (t / d) + b;
        }
    });
}

/***
 * ++++++++++++++++++++++主菜单+++++++++++++++++++++++
 */


/**

 * 模仿android里面的进度条效果，主要是用于在不打断程序正常执行的情况下显示提示数据

 * @param config

 * @return

 */

var MenuDialog = function (config) {

    this.context = config.context == null ? $('body') : config.context;//上下文

    this.message = config.message;//显示内容

    //this.time = config.time == null ? 3000 : config.time;//持续时间

    this.left = config.left;//距容器左边的距离

    this.top = config.top;//距容器上方的距离

    this.init();

};

var menuCtrlEntity;


MenuDialog.prototype = {

//初始化显示的位置内容等

    init: function () {

        $("#DialogMessage").remove();

//设置消息体

        var dialogmsgDIV = new Array();
        dialogmsgDIV.push('<div id="DialogMessage" onclick="cancelMenu()" style="width: 100%;height:100%;padding: 0px;" >');

        dialogmsgDIV.push('<div id="Message" style="background:white;width: 80px; height:160px;float: right;margin-top: 46px;margin-right:22px;box-shadow: 0 0 1px #ccc;padding: 0px; ">');

        dialogmsgDIV.push('<div onclick="intent(1)" style="width: 100%;height: 40px;text-align: center;fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'" onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">首页</p></div>');
        //dialogmsgDIV.push('<div onclick="intent(2)" style="width: 100%;height: 40px;text-align: center;fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'" onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">产品</p></div>');
        dialogmsgDIV.push('<div onclick="intent(3)" style="width: 100%;height: 40px;text-align: center;fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'" onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">检测介绍</p></div>');
        dialogmsgDIV.push('<div onclick="intent(4)" style="width: 100%;height: 40px;text-align: center;fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'" onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">检测流程</p></div>');
        dialogmsgDIV.push('<div onclick="intent(5)" style="width: 100%;height: 40px;text-align: center;fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'" onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">示例报告</p></div>');
        dialogmsgDIV.push('</div>');
        dialogmsgDIV.push('</div>');

        menuCtrlEntity = $(dialogmsgDIV.join('')).appendTo(this.context);

//设置消息样式

        //var left = this.left == null ? this.context.width() / 2 - msgEntity.find('span').width() / 2 : this.left;
        //left: left,
        var top = this.top == null ? '0px' : this.top;

        menuCtrlEntity.css({
                position: 'fixed',
                top: top,
                'z-index': '99',
                width: '100%',
                //'background-color': 'black',
                color: '#333333',
                'font-size': '18px',
                radius: '0px',
            }
        )
        ;
        menuCtrlEntity.hide();
    },
//显示动画
    show: function () {

        menuCtrlEntity.fadeIn(this.time / 2);
    }
};

function showMenu() {
    new MenuDialog({context: $('body'), message: ''}).show();
}

function cancelMenu() {
    $("#DialogMessage").remove();
}


function intent(str) {
    switch (str) {
        case 1:
            /***
             * 跳转到首页
             */
            window.location.href = '../homepage/index.html';
            break;
        case 2:
            /**
             *产品
             * @type {string}
             */
            window.location.href = '../homepage/product.html';
            break;
        case 3:
            /****
             * 检测介绍
             * @type {string}
             */
            window.location.href = '../TestReport/dna-check.html';

            break;
        case 4:
            /***
             * 检测流程
             * @type {string}
             */
            window.location.href = '../homepage/check-flow.html';
            break;
        case 5:
            /***
             * 报告模板
             */
            window.location.href = '../SampleReport/report-survey.html';
            break;
    }


}


/**

 * 底部菜单

 * @param config

 * @return

 */

var BottomMenuDialog = function (config) {

    this.context = config.context == null ? $('body') : config.context;//上下文

    this.message = config.message;//显示内容

    //this.time = config.time == null ? 3000 : config.time;//持续时间

    this.left = config.left;//距容器左边的距离

    this.top = config.top;//距容器上方的距离

    this.init();

};
var bottomMenuCtrlEntity;


BottomMenuDialog.prototype = {

//初始化显示的位置内容等

    init: function () {

        $("#BottomDialogMessage").remove();

//设置消息体

        var dialogmsgDIV = new Array();
        dialogmsgDIV.push('<div id="BottomDialogMessage" onclick="cancelBottomMenu()" style="width: 100%;height:100%;padding: 0px;" >');

        dialogmsgDIV.push('<div id="Message" style="background:white;width: 80px; height:200px;box-shadow: 0 0 1px #ccc;position: relative;margin-left: 100px;position: absolute;bottom: 60px">');

        dialogmsgDIV.push('<div onclick="actionIntent(1)"  style="width: 100%;height: 40px;text-align: center;fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'" ' +
            'onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">疾病风险</p></div>');
        dialogmsgDIV.push('<div onclick="actionIntent(2)" style="width: 100%;height: 40px;text-align:' +
            ' center;fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'"' +
            ' onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">个体化用药</p></div>');
        dialogmsgDIV.push('<div onclick="actionIntent(3)" style="width: 100%;height: 40px;text-align: ' +
            'center;fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'"' +
            ' onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">体质特征</p></div>');
        dialogmsgDIV.push('<div onclick="actionIntent(4)" style="width: 100%;height: 40px;text-align:' +
            ' center;fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'"' +
            ' onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">运动健身</p></div>');
        dialogmsgDIV.push('<div onclick="actionIntent(5)" style="width: 100%;height: 40px;text-align: center;' +
            'fonts-size: 13px;border-bottom:1px solid #ddd;" onmouseover="this.style.background=\'#e8e8e8\'" ' +
            'onmouseout="this.style.background=\'#ffffff\'"><p style="line-height: 40px;margin-top: 0px;">营养需求</p></div>');
        dialogmsgDIV.push('</div>');
        dialogmsgDIV.push('</div>');

        bottomMenuCtrlEntity = $(dialogmsgDIV.join('')).appendTo(this.context);

//设置消息样式

        //var left = this.left == null ? this.context.width() / 2 - msgEntity.find('span').width() / 2 : this.left;
        //left: left,
        var top = this.top == null ? '0px' : this.top;

        bottomMenuCtrlEntity.css({
                position: 'fixed',
                top: top,
                'z-index': '99',
                width: '100%',
                //'background-color': 'black',
                color: '#333333',
                'font-size': '18px',
                radius: '0px',
            }
        )
        ;
        bottomMenuCtrlEntity.hide();
    },
//显示动画
    show: function () {

        bottomMenuCtrlEntity.fadeIn(this.time / 2);
    }
};

function showBottomMenu() {
    new BottomMenuDialog({context: $('body'), message: ''}).show();
}

function cancelBottomMenu() {
    $("#BottomDialogMessage").remove();
    if (!isAction) {
        $('.testitem').removeClass('on');
        $('.testitem img').attr('src', '../../img/footer_6_off.png');
        $('.arror').removeClass('arroron');
    } else {
        isAction = false;
    }
}

var isAction = false;
function actionIntent(str) {
    "use strict";
    switch (str) {
        case 1:
            //$('.contentment').text('检测项目');
            window.location.href = '../SampleReport/TestItem.html';
            break;
        case 2:
            //$('.contentment').text('用药指导');
            window.location.href = '../SampleReport/pharmacy-guide.html';

            break;
        case 3:
            //$('.contentment').text('体质特征');
            window.location.href = '../SampleReport/constitutive-character.html';
            break;
        case 4:
            //$('.contentment').text('运动健身');
            window.location.href = '../SampleReport/exercise_fitness.html';
            break;
        case 5:
            //$('.contentment').text('营养需求');
            window.location.href = '../SampleReport/nutritional-requirement.html';
            break;

    }
    isAction = true;
    $('.reportSurvey').removeClass('on');
    $('.reportSurvey img').attr('src', '../../img/footer_5_off.png');

    $('.testitem').addClass('on');
    $('.testitem img').attr('src', '../../img/footer_6_on.png');
    $('.arror').addClass('arroron');

    $('.AdviceOnHealth').removeClass('on');
    $('.AdviceOnHealth img').attr('src', '../../img/footer_7_off.png');

    $('.manReport').removeClass('on');
    $('.manReport img').attr('src', '../../img/footer_8_off.png');
}


/************************************start
 * *******************/


/**

 * 底部菜单

 * @param config

 * @return

 */

var ListDataDialog = function (config) {

    this.context = config.context == null ? $('body') : config.context;//上下文

    this.data = config.data;//显示内容

    this.left = config.left;//距容器左边的距离

    this.top = config.top;//距容器上方的距离

    this.init();

};


var listDataDialogEntity;

ListDataDialog.prototype = {

//初始化显示的位置内容等

    init: function () {

        $("#toastMessage").remove();

//设置消息体

        var msgDIV = new Array();

        msgDIV.push('<div id="listDataDialog" style="width: 100%;height:100%;overflow:auto;">');
        msgDIV.push('<div id="Message" style="width: 100%;height:100%;opacity: 0.5;background: black;">');

        msgDIV.push('</div>');
        msgDIV.push('<div id="Message" style="background: white;width: 100%;height: auto;position: fixed;bottom: 0px;color: #333333;overflow:auto;">');
        msgDIV.push('<p style="text-align: center;line-height: 50px;border-bottom: 2px solid #d4d0d1;fonts-size: 15px;">请选择已存在用户</p>');
        msgDIV.push('<div  style="background: white;width: 100%;height: 200px;color: #666666;overflow:auto;">');
        for (var i = 0; i < this.data.length; i++) {
            msgDIV.push('<p class="onclicklenter" style="text-align: center;line-height: 50px;border-bottom: 1px solid #d4d0d1;fonts-size: 13px;" onmouseover="this.style.background=\'#e8e8e8\'" onmouseout="this.style.background=\'#ffffff\'">' + this.data[i][1] + '</p>');
        }
        msgDIV.push('</div>');
        msgDIV.push('</div>');
        msgDIV.push('</div>');
        listDataDialogEntity = $(msgDIV.join('')).appendTo(this.context);

//设置消息样式

        //var left = this.left == null ? this.context.width() / 2 - msgEntity.find('span').width() / 2 : this.left;
        //left: left,
        var top = this.top == null ? '45px' : this.top;

        listDataDialogEntity.css({
                position: 'fixed',
                top: top,
                'z-index': '99',
                width: '100%',
                //'background-color': 'black',
                color: 'white',
                'font-size': '18px',
                //padding: '10px',
                radius: '15px',
                //opacity: '0.7'
                overflow: 'auto'
            }
        )
        ;
        listDataDialogEntity.hide();
    },
//显示动画
    show: function () {
        listDataDialogEntity.fadeIn(this.time / 2);
    }
};
function showlist(data) {
    new ListDataDialog({context: $('body'), data: data}).show();
    for (var i = 0; i < data.length; i++) {
        $('.onclicklenter').eq(i).click(function () {
            "use strict";
            L($(this).index());
            setPerson(data[$(this).index()]);
            cancelList();
        });
    }
    $("#listDataDialog").click(function () {
        "use strict";
        cancelList();
    })
}
function cancelList() {
    $("#listDataDialog").remove();
}

