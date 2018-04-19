function initDa(url,prams,callback){
    var timechaohi=0;
    var timeout = setTimeout(function () {
            //超时啦
            if (timechaohi === 0){
                failure('网络不好,请稍后重试', '确定', function () {

                })
            }
        },
        5000 //超时时间
    );
    $.post(url,setPrams(prams), function (data) {
        if (timeout) { //清除定时器,超时了
            clearTimeout(timeout);
            timeout = null;
        }
        if(data.errorCode == 0){
            callback(data)
        }else if(data.errorCode == 20004){
            alert("请重新登录")
            setTimeout(function () {
                removeCookie("kyddevicetoken");
                removeCookie("kyd_uid");
                removeCookie('kydislogin');
                window.location.href = '../login.html';
            },1000)
        } else {
            failure(data.errorMessage, '确定', function () {

            })
        }
    },'json').error(function () {
        timechaohi = 1;
        failure('程序抛锚了,请稍后重试', '确定', function () {

        })
    })

}

/*
function initDa(url, prams, callback) {
    interface_loading('show'); //进度条
    $.post(url, setPrams(prams), function (data) {
        // console.log(data);
        interface_loading('hide'); //进度条
        if (data.errorCode == 0) {
            callback(data)
        }else if(data.errorCode == 20004){
            alert("请重新登录")
            setTimeout(function () {
                removeCookie("kyddevicetoken");
                removeCookie("kyd_uid");
                removeCookie('kydislogin');
                window.location.href = '../login.html';
            },1000)
        } else {
            failure(data.errorMessage, '确定', function () {

            })
        }
    }, 'json').error(function () {
        $('#commit').attr('onclick','httpRequest()');
        interface_loading('hide'); //进度条
    })
}

*/



/**
 * 退出登录
 */

function logOut() {
    confirm("是否确认退出?", function () {
        initDa(LOGOUT, '', function (data) {
            removeCookie("kyddevicetoken");
            removeCookie("kyd_uid");
            removeCookie('kydislogin');
            window.location.href = '../login.html';
        })
        removeCookie("kyddevicetoken");
        removeCookie("kyd_uid");
        removeCookie('kydislogin');
        window.location.href = '../login.html';
    })
}

// isLogin() //判断是否登录
function isLogin() {
    var login = getcookie('kydislogin');
    if ((login == 'false') || (login == undefined) || (login == null)) {
        window.location.href = '/admin/html/login.html';
    }
}


/**
 * 1 为不重复
 * 0 为重复
 **/
function repeat(ele) {
    var flag = 1;
    var arr_nuber = [];
    $(ele).each(function (i, v) {
        var value = $(this).val();
        arr_nuber.push(value);
    });
    $.each(arr_nuber, function (idx, val) {
        $.each(arr_nuber, function (i, value) {
            if (idx != i) {
                if (value == val) {
                    flag = 0;
                    return false;
                }
            }
        })
    });
    return flag;
}

/**
 * 请求接口时,页面加载
 * @param type 'show'表示出现,其他都是隐藏
 */
function interface_loading(type) {
    if (type == 'show') {
        if ($('.loadingPu').length != 0) {
            $('.loadingPu').show();
        } else {
            var html =
                '   <div class="loadingPu" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,.3);z-index: 2000">' +
                '   <img style="position: absolute;width: 150px;top: 50%;left: 50%;margin-left: -75px;margin-top: -75px;" src="../../img/load1.jpg" alt="">' +
                '   </div>';
            $('body').append(html);
        }
    } else {
        $('.loadingPu').hide();
    }
}

input_and_forbidden();

/**
 * 禁止输入&和+符号,传参数无法识别
 */
function input_and_forbidden() {
    $('input,textarea').on('input', function () {
        var val = $(this).val();
        val = val.replace(/[\&||\+]/g, "")
        $(this).val(val);
    })
}

/**
 * 分页
 * @param pageCount 总页数
 * @param currentPage 初始化页数
 * @param callback p为当前点击页数
 */
function paging(pageCount, pageSize, callback) {
    $('.page').createPage(
        function (n) {
            //n即是页码，这里写你操作页面的东西
            callback(n);
            // console.log(n);
        }, {
            pageCount: Math.ceil(pageCount / pageSize),//总页码,默认10
            current: 1,//当前页码,默认1
            showPrev: true,//是否显示上一页按钮
            showNext: true,//是否显示下一页按钮
            showTurn: false,//是否显示跳转,默认可以
            showNear: 2,//显示当前页码前多少页和后多少页，默认2
            pageSwap: true,//是否同意调剂,默认是。调剂会最大数量显示页码。例如当前页面之前无页码可以显示。则会增加之后的页码。
            showSumNum: false,//是否显示总页码
        })
}

/*=================判断参数是否是undefined================*/
function isUndefined(param) {
    if (typeof(param) == "undefined") {
        return '';
    }

    return param;
}


/**
 * 下拉框选择
 */

function drop_down(ele, callback) {
    $(document).on('click', '.dropdown li', function () {
        var val = $(this).find('a').text();
        var num = $(this).attr('num');
        $(this).parents('.dropdown').find('a.dropdown-toggle input').val(val);
        $(this).parents('.dropdown').find('ul').attr('data-num', num);
        if ($(this).parents('.dropdown').hasClass(ele)) {
            callback(num);
        }
    })
}


/**
 * 性别
 */
function getSexName(sexType) {
    if (parseInt(sexType) === 1) {
        return '男';
    }

    if (parseInt(sexType) === 0) {
        return '女';
    }

    return '未设置';
}


/**
 * 获取当前时间,一级后几天
 * @AddDayCount 当前时间后几天的时间
 */
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    if (m < 10) {
        m = "0" + m;
    }
    var d = dd.getDate();
    if (d < 10) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}


/**
 * 判断开始时间是否大于结束时间
 * @param startDate 开始时间
 * @param endDate 结束时间
 * @returns {number} true:小于 false:大于
 * @constructor
 */
function GetDateDiff(startDate, endDate) {
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    var endTime = '';
    if(isNullOrEmpty(endDate)){ //无结束日期,默认当前时间
        endTime = new Date( Date.parse(new Date()));
    }else{
        endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    }
    var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
    if (startTime >= endTime) {
        return false;
    } else {
        return true;
    }
}

/**
 * 判断开始时间是否大于结束时间
 * @param startDate 开始时间
 * @param endDate 结束时间
 * @returns {number} true:小于 false:大于
 * @constructor
 */
function GetDateDiff_2(startDate, endDate) {
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    var endTime = '';
    if(isNullOrEmpty(endDate)){ //无结束日期,默认当前时间
        endTime = new Date( Date.parse(new Date()));
    }else{
        endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    }
    if (startTime > endTime) {
        return false;
    } else {
        return true;
    }
}



/**
 * 获取某天是星期几
 * @param date 日期
 * @returns {*} 返回星期几
 */
function getMyDay(date) {
    var week;
    var date = new Date(date);
    if (date.getDay() == 0) week = 0
    if (date.getDay() == 1) week = 1
    if (date.getDay() == 2) week = 2
    if (date.getDay() == 3) week = 3
    if (date.getDay() == 4) week = 4
    if (date.getDay() == 5) week = 5
    if (date.getDay() == 6) week = 6
    return week;
}

/**
 * 获取某天是星期几
 * @param date 日期
 * @returns {*} 返回星期几
 */
function getMyDayChinese(date) {
    var week;
    var date = new Date(date);
    if (date.getDay() == 0) week = "星期日"
    if (date.getDay() == 1) week = "星期一"
    if (date.getDay() == 2) week = "星期二"
    if (date.getDay() == 3) week = "星期三"
    if (date.getDay() == 4) week = "星期四"
    if (date.getDay() == 5) week = "星期五"
    if (date.getDay() == 6) week = "星期六"
    return week;
}

/**
 * 获取某年某月总天数
 * @param year 年
 * @param month 月
 * @returns {number} 返回天数
 */
function getDaysInOneMonth(year, month) {
    month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
}


/**
 * 上传文件的方法
 */
function loadFile(file) {
    var fd;
    fd = new FormData();
    fd.append('file', file);
    $.ajax({
        url: UPLOAD_FILE,
        type: 'POST',
        datatype: 'json',
        data: fd,
        cache: false,
        traditional: true,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.data.errorCode == 0) {
                alert("上传成功");
                return data.data.file;
            } else {
                alert(data.data.errorMessage);
            }
        },
        error: function () {
        }
    });
}


//日期，在原有日期基础上，增加days天数，默认增加1天
function addDate(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var mm = "'" + month + "'";
    var dd = "'" + day + "'";
    //单位数前面加0
    if (mm.length == 3) {
        month = "0" + month;
    }
    if (dd.length == 3) {
        day = "0" + day;

    }
    var time = date.getFullYear() + "-" + month + "-" + day
    return time;

}


/**
 * 时间格式化
 * date = ''
 */

function dateFormat(mask, date) {
    if (date == "") {
        var now = new Date();
    } else {
        var now = new Date(date);
    }
    var d = now;
    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };

    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return d.getDate();
            case 'dd':
                return zeroize(d.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
            case 'M':
                return d.getMonth() + 1;
            case 'MM':
                return zeroize(d.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
            case 'yy':
                return String(d.getFullYear()).substr(2);
            case 'yyyy':
                return d.getFullYear();
            case 'h':
                return d.getHours() % 12 || 12;
            case 'hh':
                return zeroize(d.getHours() % 12 || 12);
            case 'H':
                return d.getHours();
            case 'HH':
                return zeroize(d.getHours());
            case 'm':
                return d.getMinutes();
            case 'mm':
                return zeroize(d.getMinutes());
            case 's':
                return d.getSeconds();
            case 'ss':
                return zeroize(d.getSeconds());
            case 'l':
                return zeroize(d.getMilliseconds(), 3);
            case 'L':
                var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(m);
            case 'tt':
                return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z':
                return d.toUTCString().match(/[A-Z]+$/);
            default:
                return $0.substr(1, $0.length - 2);
        }
    });
}


/**
 * 菜单栏事件
 */
navEvent()

function navEvent() {
    $('#topHtml').load('../topNav/top.html');
    $('#navHtml').load('../topNav/nav.html');

    $(document).on('click', '.nav-sidebar>li', function () {
        $(this).find('.sub-menu').show();
        $(this).siblings().find('.sub-menu').hide();
        $(this).addClass('active').siblings().removeClass('active');

    })

    $(document).on('click', '.sub-menu>li', function () {
        $('.nav-sidebar li').find('.sub-menu li').removeClass('current');
        $(this).addClass('current').siblings().removeClass('current');
    })
}

function navCurrent(ele1, status, ele2) {
    var timer;
    timer = setInterval(function () {
        $('.nav-sidebar li').removeClass('active');
        $('.nav-sidebar li').each(function (i, v) {
            if ($(this).hasClass(ele1)) {
                $(this).addClass('active');
                $('.nav-sidebar li').find('.sub-menu').hide();
                if (status == 1) {
                    $(this).find('.sub-menu').show();
                    $(this).find('.sub-menu li').removeClass('current');
                    $(this).find('.sub-menu li').each(function () {
                        if ($(this).hasClass(ele2)) {
                            $(this).addClass('current');
                        }
                    })
                }
            }
        })
    }, 10)
    setTimeout(function () {
        clearInterval(timer)
    }, 1000)
}

/*

/!**
 * 报告弹框-文本框字数
 *!/
function reportText() {
    $(document).on('input','textarea',function () {
        var val = $(this).val();
        if(val.length>30){
            $(this).val(val.substr(0,30))
        }else{
            $(this).next('i').text(val.length+'/30');
        }
    })
}
*/


/**
 *
 * 分页
 * @param count 总条数
 * @param limit 每页条数
 * @param callback 点击页码事件
 */
function pageFen(count,limit,callback){
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'page', //分页容器的id
            count: count,//总条数
            limit:limit,//每页多少条
            skin: '#3CB3D5', //自定义选中色值
            skip: true, //开启跳页
            theme:'#3CB3D5',
            groups: 4,
            jump: function(obj, first){
                if(!first){
                    callback(obj.curr);
                }
            },
        });
    });
}


/**
 * 文本框字数
 */
function reportText(ele,num) {
    $(document).on('input', ele, function () {
        var val = $(this).val();
        if (val.length > num) {
            $(this).val(val.substr(0, num))
        } else {
            $(this).next('.word_num').text(val.length + '/'+num)
        }
    })
}


/*------------------------------------------------------------报告弹框 start----------------------------------------------*/

//报告
/**
 *
 * @param id
 * @param curriculum
 * @param type 1:我的课表页,2:维护页
 */
function report(id, curriculum) {
    if (curriculum == '1V1') {//1v1
        $('.studentReport').hide();
    } else {//小班课
        $('.studentReport').show();
    }
    //填充数据
    var feedback = new Array();
    feedback.push("id=" + id);
    feedback.push("type=1");
    initDa(FEEDBACK_VIEWS, feedback, reportCallback);
}

function reportCallback(data) {
    var kechenghtml = '';
    var xueyuanhtml = '<div class="stu"><p class="stu1">学员</p><p class="student_pict"><span class="studt_pictnu">';
    var studenglist = '';
    var pingjialist = '';
    //target_fraction
    if (data.data.list != null && data.data.list != undefined && data.data.list != '') {
        kechenghtml = '<div class="lesson" jsclassid="' + data.data.list.class_id + '"  jstype="' + data.data.list.type + '"><p>上课时间：' +data.data.list.classtime + '</p><p>课程进度：'+ data.data.list.class_name+' '+ data.data.list.class_hour_name + '</p>';
        if(parseInt(data.data.list.type) == 1){ //1v1有目标分数,小班课无目标分数
            //留着判断用
            kechenghtml += '<p>目标分数：' + data.data.list.target_fraction + '</p>';
            kechenghtml += '<p>历史成绩：' + data.data.list.lishi_score + '</p>';
        }
        kechenghtml += '</div>';
        if (data.data.user.length > 0) {
            $.each(data.data.user, function (i, item) {
                $('#reportZ .teaching_content').val(item.teaching_content); //授课内容
                var word_length = item.teaching_content.length;
                $('.give .word_num i').text(word_length);
                xueyuanhtml += '<img src="' + item.avatar + '" />';
                if (i == 0) {
                    studenglist += '<li class="select" status="0" data-userid="' + item.user_id + '">';
                    studenglist += '<p class="xuanZhonf"><img src="../../img/Mschedule/gouxuan-3.png" alt=""></p><p class="studentImg"><img src="' + item.avatar + '" alt=""></p><p class="studentName">' + item.name + '</p></li>';
                } else {
                    studenglist += '<li  status="0" data-userid="' + item.user_id + '">';
                    studenglist += '<p class="xuanZhonf"><img src="" alt=""></p><p class="studentImg"><img src="' + item.avatar + '" alt=""></p><p class="studentName">' + item.name + '</p></li>';
                }
                pingjialist += '<div class="appraise" data-userid="' + item.user_id + '"><div class="pitch"><h3>课后评价:</h3>';

                if (parseInt(item.status) === 1) {
                    pingjialist += '<div class="re classGo" status="1"><span>未&nbsp;&nbsp;上&nbsp;&nbsp;课 ：</span><img src="../../img/weigouxuan.png">';
                }
                if (parseInt(item.status) === 0) {
                    pingjialist += '<div class="re classGo" status="0"><span>未&nbsp;&nbsp;上&nbsp;&nbsp;课 ：</span><img src="../../img/xuanzhong-5.png">';
                }
                pingjialist += '</div></div><div class="clear"></div><div class="app_left"><div id="keqianyuxi"><span>课前预习：</span>' +
                    ' <div class="xingPing xingPing1"><div class="function-demo" class="target-demo"></div>' +
                    '<div class="function-hint" class="hint"></div></div></div><div id="shangkezhuangtai"><span>上课状态：</span>' +
                    '<div class="xingPing xingPing2"><div class="function-demo" class="target-demo"></div><div class="function-hint" class="hint"></div>' +
                    '</div></div><div id="ketanghudong"><span>课堂互动：</span><div class="xingPing  xingPing3">' +
                    '<div class="function-demo" class="target-demo"></div><div class="function-hint" class="hint"></div></div></div>' +
                    '</div><div class="app_right"><p>学习情况 ：</p>' +
                    '<textarea maxlength="1000" placeholder="课程介绍">'+item.learning_situation+'</textarea><span class="word_num"><i>'+word_length+'</i>/280</span> </div></div>';
            });
            xueyuanhtml += '</span><span class="studt_num">' + data.data.user.length + '</span></p><p class="studt_cltime">课程时长:' + data.data.list.class_time + '</p></div>'
        }
        $('#reporttitleclearfi').html(kechenghtml + xueyuanhtml);
        $('#studentReportlist').html(studenglist);
        $('#reportBox').html(pingjialist);

        $('.classGo').each(function (i, v) {
            if($(this).attr('status') == 0){
                $(this).parents('.appraise').find('.app_left').hide();
                $(this).parents('.appraise').find('.app_right').hide();
            }
        })

        if (data.data.user.length > 0) {
            $.each(data.data.user, function (idx, val) {
                $('#reportBox .appraise').each(function (ii, vv) {
                    if (idx == ii) {
                        $(this).find('.function-demo').each(function (iii, vvv) {
                            if (iii == 0) { //课前预习
                                $(this).html(zuoyepinjia(this, val.preview_fraction))
                                var hint = ['需要努力~（1分）','有待提高~（2分）','再接再厉~（3分）','看好你哦~（4分）','真的很棒~（5分）'];
                                if (parseInt(val.preview_fraction) > 0) {
                                    $(this).next().html(hint[(parseInt(val.preview_fraction)-1)]);
                                }
                            } else if (iii == 1) { //上课状态
                                $(this).html(zuoyepinjia(this, val.status_fraction))
                                var hint = ['需要努力~（1分）','有待提高~（2分）','再接再厉~（3分）','看好你哦~（4分）','真的很棒~（5分）'];
                                if (parseInt(val.status_fraction) > 0) {
                                    $(this).next().html(hint[(parseInt(val.status_fraction)-1)]);
                                }
                            } else if (iii == 2) { //上课状态
                                $(this).html(zuoyepinjia(this, val.questions_fraction))
                                var hint = ['需要努力~（1分）','有待提高~（2分）','再接再厉~（3分）','看好你哦~（4分）','真的很棒~（5分）'];
                                if (parseInt(val.questions_fraction) > 0) {
                                    $(this).next().html(hint[(parseInt(val.questions_fraction)-1)]);
                                }
                            }
                        })
                        $(this).find('textarea').val(val.learning_situation);
                        var length_word = val.learning_situation.length;
                        $(this).find('.app_right i').text(length_word);
                    }
                })
            })
        }

        $('#reportZ').modal('show');
    }

}

/**
 * 小班课-报告弹框-学生评价
 */
function studentSelect() {
    $(document).on('click', '#reportZ .studentReport li', function () {
        var index = $(this).index();
        $('.reportBox').find('.appraise').hide();
        $('.reportBox').find('.appraise').eq(index).show();
        $(this).addClass('select').siblings().removeClass('select');
        $(this).find('.xuanZhonf').children('img').attr('src', '../../img/Mschedule/gouxuan-3.png');
        $(this).siblings().find('.xuanZhonf').children('img').attr('src', '');
    })
}

/**
 * 作业弹框-学生作业下载
 */
function studentHomeworkSelect() {
    $(document).on('click', '#homework .studentReport li', function () {
        $(this).siblings().removeClass('select');
        $(this).addClass('select')
        // $(this).siblings().find('.xuanZhonf').children('img').attr('src', '');
        $(this).siblings().find('.xuanZhonf').hide();
        // $(this).find('.xuanZhonf').children('img').attr('src', '../img/Mschedule/gouxuan-3.png');
        $(this).find('.xuanZhonf').show();
        $(this).find('.xuanZhonf').children('img').attr('src', '../../img/Mschedule/gouxuan-3.png');
        var currentLi = $(this).index();
        $('.homework_box .homework_load').removeClass('current');
        $('.homework_box .homework_load').eq(currentLi).addClass('current');
    })
}

// /*------------------------------------------------------------报告弹框 end----------------------------------------------*/




/**
 * 星级评分-动效
 */
function xingFen() {
    $('.function-demo').each(function () {
        var input = $(this).next('.function-hint');
        $(this).raty({
            number: 5,//多少个星星设置
            score: 0,//初始值是设置
            targetType: 'hint',//类型选择，number是数字值，hint，是设置的数组值
            path      : '../img/Mschedule',
            hints     : ['需要努力~（1分）','有待提高~（2分）','再接再厉~（3分）','看好你哦~（4分）','真的很棒~（5分）'],
            size      : 50,
            starOff   : 'xing_off.png',
            starOn    : 'xing_on.png',
            target    : input,
            cancel    : false,
            targetKeep: true,
            targetText: '请选择评分',
            precision : false,//是否包含小数
            click: function(score, evt) {
                $(this).attr('score',score);
            }
        });
    })
}



/*--------------------------------------------------------作业弹框--------------------------------------*/

//作业
function home(id){
    //填充数据
    var feedback=new Array();
    feedback.push("id=" +id );
    feedback.push("type=2"); //type 1 报告 2 作业
    initDa(FEEDBACK_VIEWS,feedback,teacherhomeCallback);
}

/**
 * 作业弹框渲染
 * @param data
 */
function teacherhomeCallback(data) {
    if(data.data.list !=null && data.data.list !=undefined && data.data.list !='' ){
        var pingfenhtml='';
        var html='<div class="homework_popup" jsclass="'+ data.data.list.class_id+'"><div class="homework_on"><span class="homework_seil">作业:</span>';
        html+='<span class="classType">'+data.data.list.type +'</span></div><div class="homework_tw"><span class="homeTitle" style="padding-top: 52px;">说明:</span>' +
            '<div class="home_upload"><p class="home_file">' ;
        if(data.data.list.work_url == '' || data.data.list.work_url == undefined || data.data.list.work_url == null){
            html +=
                '<i>' + data.data.list.work_name + '</i></p>' +
                '<textarea readonly class="home_upth">' + data.data.list.work_remarks + '</textarea></div></div>';
        }else{
            html += '<i>' + data.data.list.work_name + '</i></p>' +
            '<textarea readonly class="home_upth">' + data.data.list.work_remarks + '</textarea></div></div>';
        }
        if(data.data.list.type !='1V1'){
            html+='<div class="studentReport"><ul>';
        }
        if(data.data.user && data.data.user.length > 0){
            $.each(data.data.user, function(i, item) {
                var student_home = '';
                if(item.student_work_name == ''){
                    student_home = '未知';
                }else{
                    student_home = item.student_work_name;
                }
                if(data.data.list.type !='1V1'){
                    if(i == 0){
                        html+='<li class="select" status="0" userid="'+ item.user_id  +'"><p class="xuanZhonf"><img src="../../img/report/gouxuan-3.png" alt=""></p><p class="studentImg"><img src="'+ item.avatar +'" alt=""></p><p class="studentName">'+ item.name+'</p></li>'
                    }else {
                        html+='<li class="select" status="0" userid="'+ item.user_id  +'"><p class="xuanZhonf"><img src="" alt=""></p><p class="studentImg"><img src="'+ item.avatar +'" alt=""></p><p class="studentName">'+ item.name+'</p></li>';
                    }
                }
                //同时处理评分
                if(i == 0){
                    pingfenhtml+='<div class="homework_load current" jsdata-userid="'+  item.user_id +'">'
                }else {
                    pingfenhtml+='<div class="homework_load" jsdata-userid="'+  item.user_id +'">'
                }
                var style='';
                if(item.student_work_url =='' || item.student_work_url == null || item.student_work_url ==undefined){
                    style='style="display:none"';
                }
                pingfenhtml+=
                    '<div class="homework_th"><span  class="homeTitle" style="padding-top: 30px;">备注:</span>' +
                    '<div class="home_attach"><p class="attach_fujian"><span class="className">'+ student_home +'</span><span class="homeSC"><input name="downloadFile" class="home_upons" type="text" data-url="'+item.student_work_url +'" onclick="downloadHomework(\'' + item.student_work_url + '\', \'' + item.student_work_name + '\', \'' + data.data.list.class_id + '\', \'' + 3 + '\')"><img src="../../img/report/xiazai.png"/> <span class="classDownload">附件下载</span></span></p>' +
                    '<textarea readonly class="attach_tebt">'+ item.student_work_content +'</textarea></div></div>' +
                    ' <div class="homework_eight">'+
                    '     <span class="homeTitle">批改作业:</span>'+
                    ' <div class="home_upload">'+
                    '    <p class="home_file">'+
                    '    <i>'+item.correct_work_name+'</i></p>'+
                    '       <textarea readonly class="home_upth" placeholder="备注......">'+item.correct_work_remark+'</textarea>'+
                    '     </div>'+
                    '     </div>'+
                    '<div class="homework_fi"><span class="homeTitle">作业评分：</span><div class="xingPing">' +
                    '<div class="function-demo" class="target-demo"></div><div class="function-hint" class="hint"></div></div></div></div>';
            });
        }
        if(data.data.list.type !='1V1'){
            html+='</ul></div>';
        }
        html+='<div class="homework_box">'+pingfenhtml+'</div></div>';
        //显示弹出层
        $('#zuoyetanchuceng').html(html);
        if(data.data.user && data.data.user.length > 0) {
            $.each(data.data.user, function (i, v) {
                $('#homework .xingPing .function-demo').each(function (idx, val) {
                    if (i == idx) {
                        if (v.student_pingjia == '' || v.student_pingjia == 'undefined') {
                            v.student_pingjia = 0;
                        }
                        $(this).html(zuoyepinjia(this, parseInt(v.student_pingjia)))
                        var hint = ['需要努力~（1分）','有待提高~（2分）','再接再厉~（3分）','看好你哦~（4分）','真的很棒~（5分）'];
                        if (parseInt(v.student_pingjia) > 0) {
                            $(this).next().html(hint[(parseInt(v.student_pingjia)-1)]);
                        }
                    }
                })
            })
        }

        $('#homework').modal('show');
    }else {
        alert("无内容");
    }
}

/**
 * 评价获取星星
 * @param {*} that
 * @param {*} pingjia
 */
function pinjia( pingjia) {
    var xing = '';
    var number = parseInt(pingjia);
    for(var i = 0;i<number;i++){
        xing += '<i><img class="star" src="../../img/Mschedule/xing_on.png" alt="1"></i>';
    }
    for(var i = 0; i< 5-number;i++){
        xing += '<i><img class="star" src="../../img/Mschedule/xing_off.png" alt="1"></i>';
    }

    return xing;
}

/**
 * 获取星星
 * @param {*} that 
 * @param {*} pingjia 
 */
function zuoyepinjia(that, pingjia) {
    var xing = '';
    var number = parseInt(pingjia);
    for(var i = 0;i<number;i++){
        xing += '<img src="../../img/Mschedule/xing_on.png" alt="1">';
    }
    for(var i = 0; i< 5-number;i++){
        xing += '<img src="../../img/Mschedule/xing_off.png" alt="1">';
    }

    return xing;
}

/**
 * 下载学生作业
 * @param url 作业地址
 */
function downloadHomework(url, name, class_id, type) {
    if (url) {
        newDownload(url, name, class_id, type);
    } else {
        alert("对不起,学生还没有上传作业")
    }
}




/**
 * 提交作业函数回调
 */
function submitxueshengzuoyecallback(data) {
    if(parseInt(data.errorCode) === 0 ){
        autoFade('提交成功');
        guanbizuoyetanchucentg();
        if($('.schedule_history_recor').length>0) {
            var date = $('.dateBox .cneter_color').attr('data');
            kebiaobydate(date, 1);
        }else{

        }
    }else {
        failure(data.errorMessage);
    }
    $('#homework').modal('hide');
}

/**
 * 关闭弹出层
 */
function guanbizuoyetanchucentg() {
    $('#homework').modal('hide');
}

/**
 * 关闭作业
 */
function closeWork(){
    $('#homework').modal('hide');
}

/*------------------------------------------------------------作业弹框 end----------------------------------------------*/


function closeReport() {
    $('#reportZ').modal('hide');
}
function commitCallback(data) {
    "use strict";
    if (parseInt(data.errorCode) == 0) {
        closeReport();
    } else {
        alert("评价异常：" + data.errorMessage);
    }
}
/***
 * 获取评价数据
 */
function showPingjia(that, classid) {
    "use strict";
    var feedback = new Array();
    feedback.push("id=" + classid);
    feedback.push("type=" + 3);

    initDa(FEEDBACK_VIEWS, feedback, function (data) {
        if(data.data.user.length == 0){
            alert("暂无信息");
        }else {
            $("#pingjia").modal('show');
            pingjiaCallback(data);
        }
    });
}
var selectDatatongxun = 0;
var selectDataStatus = 0;
/***
 *
 */
function pingjiaCallback(data) {
    var pingArr = ['未评价~(0分)','非常不满意~（1分）','不满意~（2分）','一般~（3分）','满意~（4分）','非常满意~（5分）']
    if(data.data.list != null && data.data.list !=undefined && data.data.list !='' ){
        // 公共数据渲染
        // 渲染课程类型
        $(".pj_class_type_name").html(data.data.list.type);
        // 渲染课程名称
        $(".pj_class_name").html(data.data.list.class_name+' - '+data.data.list.class_hour_name);
        // 渲染科目
        $(".pj_class_subject_name").html(data.data.list.subject_name);
        // 渲染子科目
        $(".pj_class_subject_type").html(data.data.list.subject_type_name);
        $(".class_time_name").html(data.data.list.class_time);

        $("#teachername").html(data.data.list.teacher_name);
        $("#classstarttime").html(data.data.list.classtime);

        if (data.data.user.length > 0) {
            var studenglist = '';
            var commad = '';

            $.each(data.data.user, function (i, item) {
                //头像
                if (i == 0) {
                    studenglist += '<li class="select" status="0" data-userid="' + item.user_id + '"><p class="xuanZhonf"><img src="../../img/Mschedule/gouxuan-3.png" alt=""></p><p class="studentImg"><img src="' + item.avatar + '" alt=""></p><p class="studentName">' + item.name + '</p></li>';
                } else {
                    studenglist += '<li  status="0" data-userid="' + item.user_id + '"><p class="xuanZhonf"><img src="" alt=""></p><p class="studentImg"><img src="' + item.avatar + '" alt=""></p><p class="studentName">' + item.name + '</p></li>';
                }

                var skqk = pinjia(parseInt(item.student_teaching_situation));
                var skqk_re = pingArr[parseInt(item.student_teaching_situation)];

                //通讯情况
                var txqk = pinjia(parseInt(item.student_communication_quality));
                var txqk_re = pingArr[parseInt(item.student_communication_quality)];

                var word_num = item.student_idea.length;
                //评价
                commad +=
             '   <div class="oneStudent">'+
             '       <!-- 课后评价 -->'+
             '       <div class="evaluate_str">'+
             '       <ul class="evaluate_str_list">'+
             '       <li class="evaluate_str_list_item statusclass">'+
             '       <span>授课情况 :</span>'+skqk+
             '       <span class="statusclassname">'+skqk_re+'</span>'+
             '       </li>'+
             '       <li class="evaluate_str_list_item  tongxun">'+
             '       <span>通讯情况 :</span>'+txqk+
             '       <span class="tongxunname">'+txqk_re+'</span>'+
             '       </li>'+
             '       </ul>'+
             '       </div>'+
             '       <!-- 授课内容 -->'+
             '       <div class="give">'+
             '       <textarea readonly maxlength="1000" class="teaching_content" placeholder="有什么话对老师说" style="width: 100%;">'+item.student_idea+'</textarea>'+
             '       <s class="word_num">'+
             '       <i>'+word_num+'</i>/280'+
             '   </s>'+
             '   </div>'+
             '   </div>';

            })
            $('#pingjia #studentDellist').html(studenglist);
            $('#pingjia .studentBoxs').html(commad);
        }
    }
}
pingjiaSelect()
/**
 * 评价
 */
function pingjiaSelect() {
    $(document).on('click', '#pingjia #studentDellist li', function () {
        $(this).siblings().removeClass('select');
        $(this).addClass('select')
        // $(this).siblings().find('.xuanZhonf').children('img').attr('src', '');
        $(this).siblings().find('.xuanZhonf').hide();
        // $(this).find('.xuanZhonf').children('img').attr('src', '../img/Mschedule/gouxuan-3.png');
        $(this).find('.xuanZhonf').show();
        $(this).find('.xuanZhonf').children('img').attr('src', '../../img/Mschedule/gouxuan-3.png');
        var currentLi = $(this).index();
        $('.studentBoxs .oneStudent').hide();
        $('.studentBoxs .oneStudent:eq('+currentLi+')').show();
    })
}


/**
 * 作业下载
 * @param {string} 课时id
 * @param {string} 作业地址
 * @param {string} 作业名称
 */
function newDownload(filename, original_name, class_id,  type) {
    var uuid = getcookie('kyduuid');
    if (uuid == null) {
        uuid = generateUUID();
        cookie('kyduuid', uuid);
    }

    var islogin = getcookie('kydislogin');
    if (isNullOrEmpty(islogin)) {
        islogin = 'false';
    }

    var form = $("<form>");
    form.attr("style", "display:none");
    form.attr("target", "_blank");
    form.attr("method", "post");
    form.attr("action", DOWNLOAD);
    $("body").append(form);
    var platform = 'h5';
    var time = gettime();
    var prams = new Array();
    prams.push("uuid=" + uuid);
    prams.push("islogin=" + islogin);
    prams.push("platform=" + platform);
    prams.push("time=" + time);
    prams.push("class_id=" + class_id);
    prams.push("filename=" + filename);
    prams.push('type=' + type);
    prams.push("original_name=" + original_name);
    var sg = sortParameter(prams);

    var arr = {
        'uuid': uuid,
        'islogin': islogin,
        'platform': platform,
        'time': time,
        'class_id': class_id,
        'filename': filename,
        'type': type,
        'original_name': original_name,
        'sg': sg
    };

    $.each(arr, function (i, v) {
        var input = $("<input>");
        input.attr("type", "hidden");
        input.attr("name", i);
        input.attr("value", v);
        form.append(input);
    }) 

    form.submit().remove();
}

/**
 * 回放
 * @param {*} class_id 
 * @param {*} type 
 */
function huifang(class_id,type) {
    if (!isNullOrEmpty(class_id)) {
        huifangs(class_id, type);
    } else {
        alert("暂无回放");
        return false;
    }
}

function huifangs(class_id, type) {
    var param = new Array();
    var isHave = 0;
    if(isNullOrEmpty(type)){
        param.push('id='+ class_id);
        initDa(FEEDBACK_VIEWS, param, function(data) {
            if (parseInt(data.data.list.is_playback)) {
                window.open('../video/videoList.html?class_id='+ class_id+'&type=2');
            } else {
                alert("暂无回放");
                return false;
            }
        });      
    } else {
        param.push('class_id='+ class_id);
        initDa(EVALUATE_TASK, param, function(data) {
            if (parseInt(data.data.is_playback)) {
                window.open('../video/videoList.html?class_id='+ class_id+'&type=1');
            } else {
                alert("暂无回放");
                return false;
            }
        });
    }
}




