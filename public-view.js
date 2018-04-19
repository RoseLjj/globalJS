/**
 * Created by wupeitao on 2016/11/28.
 */

/**/

/*提示信息弹出框*/
function returnInfo(msg) {
    $('#dialog-message').text(msg).stop(true,true).fadeIn(1000).delay(1000).fadeOut(1000,function(){});
}

/***
 * title布局
 */
var TitleLayout = React.createClass({

    render: function () {
        return <header id="titleLayou" className="pub-bar">
            <a href="javaScript:history.back(-1)"><img src="../../img/reg-login/public_Return.png" alt=""/></a>
            <h1 className="pub-title">
                <div>{this.props.name}</div>
            </h1>
        </header>;
    }
});


var TitleLayoutDl = React.createClass({

    render: function () {
        return <header id="titleLayou" className="pub-bar">
            <h1 className="pub-title">
                <div>{this.props.name}</div>
            </h1>
        </header>;
    }
});

var TitleLayoutImg = React.createClass({
    render: function () {
        return <img className="logoImg" src="../../img/reg-login/login_icom_zt.png" alt=""/>;
    }
});

var TitleRight = React.createClass({

    render: function () {
        return <a>
            <button className="pub-btn  pub-btn-link pub-pull-right pub-color-gray userbtn"
                    onClick={this.onMenuClick}>
                {this.props.name}
            </button>
        </a>;
    }
});


/***
 * title布局
 */
var TitleLayoutRight = React.createClass({
    render: function () {
        return <header id="example" className="pub-bar pub-bg-white">
            <h1 className="pub-title pub-color-red">
                <div>{this.props.name}</div>
            </h1>
            <TitleRight name="跳过"/>
        </header>;
    }
});





//<button className="pub-btn pub-btn-link  pub-color-gray">
//
//</button>
//<i className="fa fa-user fa-2x"></i>

var TitleShopLayout = React.createClass({
    onBuyClick: function () {
        "use strict";
        window.location.href = '../buy/buy-list.html';
    },
    onMenuClick: function () {
        showMenu();
    },
    render: function () {
        return <header className="pub-bar pub-bg-white">
            <a href="../HealthReport/me-index.html">
                <button className="pub-btn pub-btn-link  pub-color-gray userbtn"><img src="/kayoudi/img/usericon.png"/>
                </button>
            </a>

            <h1 className="pub-title pub-color-red">
                <div><img src="/kayoudi/img/logo@2x.png"/></div>
            </h1>

            <button className="pub-btn  pub-btn-link pub-pull-right pub-color-gray userbtn" onClick={this.onMenuClick}>
                <img src="/kayoudi/img/usermenu.png"/>
            </button>

            <span className="head-buy-btn" onClick={this.onBuyClick}>购买</span>
        </header>;
    }
});


/**
 * 真实布局顶部的布局
 */
var TopBorderLayout = React.createClass({
    render: function () {
        return <div>
            <div className="top-border"></div>
            <div id="real-content"></div>
        </div>;
    }
});




function AddFootView() {
    "use strict";
    var html = '<div id="footer_line"></div>' +
        '<footer class="footer">' +
        '<a class="reportSurvey on" href="../SampleReport/report-survey.html"><span><img src="../../img/footer_5_on.png" alt=""></span>报告概览</a>' +
        '<a class="testitem"><span><img src="../../img/footer_6_off.png" alt=""></span><span class="contentment">检测项目</span><div class="arror"></div></a>' +
        '<a class="AdviceOnHealth" href="../SampleReport/health-advise.html"><span><img src="../../img/footer_7_off.png" alt=""></span>健康建议</a>' +
        '<a class="manReport"><span><img src="../../img/footer_8_off.png" alt=""></span>男性报告</a>' +
        '</footer>';
    $('.footview').append(html);
    $('.reportSurvey').click(function () {
        $('.reportSurvey').addClass('on');
        $('.reportSurvey img').attr('src', '../../img/footer_5_on.png');

        $('.testitem').removeClass('on');
        $('.testitem img').attr('src', '../../img/footer_6_off.png');
        $('.arror').removeClass('arroron');

        $('.AdviceOnHealth').removeClass('on');
        $('.AdviceOnHealth img').attr('src', '../../img/footer_7_off.png');

        $('.manReport').removeClass('on');
        $('.manReport img').attr('src', '../../img/footer_8_off.png');

    });
    $('.testitem').click(function () {
        //$('.reportSurvey').removeClass('on');
        //$('.reportSurvey img').attr('src', '../../img/footer_5_off.png');

        $('.testitem').addClass('on');
        $('.testitem img').attr('src', '../../img/footer_6_on.png');

        $('.arror').addClass('arroron');

        //$('.AdviceOnHealth').removeClass('on');
        //$('.AdviceOnHealth img').attr('src', '../../img/footer_7_off.png');
        //
        //$('.manReport').removeClass('on');
        //$('.manReport img').attr('src', '../../img/footer_8_off.png');
        showBottomMenu();
    });
    $('.AdviceOnHealth').click(function () {
        $('.reportSurvey').removeClass('on');
        $('.reportSurvey img').attr('src', '../../img/footer_5_off.png');

        $('.testitem').removeClass('on');
        $('.testitem img').attr('src', '../../img/footer_6_off.png');
        $('.arror').removeClass('arroron');

        $('.AdviceOnHealth').addClass('on');
        $('.AdviceOnHealth img').attr('src', '../../img/footer_7_on.png');

        $('.manReport').removeClass('on');
        $('.manReport img').attr('src', '../../img/footer_8_off.png');

    });
    $('.manReport').click(function () {
        $('.reportSurvey').removeClass('on');
        $('.reportSurvey img').attr('src', '../../img/footer_5_off.png');

        $('.testitem').removeClass('on');
        $('.testitem img').attr('src', '../../img/footer_6_off.png');
        $('.arror').removeClass('arroron');

        $('.AdviceOnHealth').removeClass('on');
        $('.AdviceOnHealth img').attr('src', '../../img/footer_7_off.png');

        $('.manReport').addClass('on');
        $('.manReport img').attr('src', '../../img/footer_8_on.png');
    });
}


function selectItem(Str) {
    "use strict";
    $('.reportSurvey').removeClass('on');
    $('.reportSurvey img').attr('src', '../../img/footer_5_off.png');

    $('.testitem').addClass('on');
    $('.testitem img').attr('src', '../../img/footer_6_on.png');
    $('.arror').addClass('arroron');

    $('.AdviceOnHealth').removeClass('on');
    $('.AdviceOnHealth img').attr('src', '../../img/footer_7_off.png');

    $('.manReport').removeClass('on');
    $('.manReport img').attr('src', '../../img/footer_8_off.png');
    $('.contentment').text(Str);
}


/**
 * 健康建议
 */
function selectH() {
    "use strict";
    $('.reportSurvey').removeClass('on');
    $('.reportSurvey img').attr('src', '../../img/footer_5_off.png');

    $('.testitem').removeClass('on');
    $('.testitem img').attr('src', '../../img/footer_6_off.png');
    //$('.arror').removeClass('arroron');


    $('.AdviceOnHealth').addClass('on');

    $('.AdviceOnHealth img').attr('src', '../../img/footer_7_on.png');

    $('.manReport').removeClass('on');
    $('.manReport img').attr('src', '../../img/footer_8_off.png');
}

function addMeIndexFootView() {
    "use strict";
    var html = '<div id="footer_line"></div>' +
        '<footer class="footer">' +
        '<a href="../HealthReport/me-store.html"><span><img src="../../img/user-meindex.png" alt=""></span>我的主页</a>' +
        '<a href="../HealthReport/disease-hazard10.html" ><span><img src="../../img/user-jiankang.png" alt=""></span>健康报告</a>' +
        '</footer>';
    $('.index-footview').append(html);
}