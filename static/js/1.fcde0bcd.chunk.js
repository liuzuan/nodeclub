webpackJsonp([1],{320:function(e,t,a){"use strict";function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){function n(r,o){try{var i=t[r](o),s=i.value}catch(e){return void a(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=a(66),c=a.n(s),l=a(348),p=(a.n(l),a(0)),u=a.n(p),m=a(27),h=a(35),d=a(37),f=a(120),y=a.n(f),_=a(34),x=a(65),b=a(114),g=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),k=function(e){function t(e){var a=this;r(this,t);var i=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return i.state={data:"",accessToken:i.props.userInfo.accessToken||"",current_reply:"",alertStatus:!1,alertTip:"",bottomReply:!0,noTopic:!1},i.getData=n(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.a)(i.props.match.params.id,i.state.accessToken);case 2:t=e.sent,t?i.setState({data:t}):i.setState({noTopic:!0});case 4:case"end":return e.stop()}},e,a)})),i.closeAlert=function(){i.setState({alertStatus:!1,alertTip:""})},i.createMarkup=function(e){return{__html:e}},i.toSignin=function(){i.props.history.push("/signin")},i.handleCollect=n(c.a.mark(function e(){var t,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!i.props.userInfo.accessToken){e.next=18;break}if(i.state.data.is_collect){e.next=10;break}return e.next=4,Object(b.d)(i.state.accessToken,i.state.data.id);case 4:if(t=e.sent,!t.success){e.next=8;break}return e.next=8,i.getData();case 8:e.next=16;break;case 10:return e.next=12,Object(b.f)(i.state.accessToken,i.state.data.id);case 12:if(n=e.sent,!n.success){e.next=16;break}return e.next=16,i.getData();case 16:e.next=19;break;case 18:i.toSignin();case 19:case"end":return e.stop()}},e,a)})),i.showReplyBox=function(e){i.state.accessToken?i.setState({current_reply:e}):i.toSignin()},i.ups=function(){var e=n(c.a.mark(function e(t){var n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.author.loginname===i.props.userInfo.loginname){e.next=13;break}if(!i.state.accessToken){e.next=10;break}return e.next=4,Object(b.i)(t.id,i.state.accessToken);case 4:if(n=e.sent,!n.success){e.next=8;break}return e.next=8,i.getData();case 8:e.next=11;break;case 10:i.props.history.push("/signin");case 11:e.next=14;break;case 13:i.setState({alertTip:"\u4e0d\u53ef\u5bf9\u81ea\u5df1\u70b9\u8d5e",alertStatus:!0});case 14:case"end":return e.stop()}},e,a)}));return function(t){return e.apply(this,arguments)}}(),i.replySuccess=function(){window.scrollTo(0,document.documentElement.scrollHeight),i.state.current_reply&&i.replyCancle(),i.cancle()},i.bottomFocus=function(){i.state.accessToken?i.setState({bottomReply:!1}):i.toSignin()},i.cancle=function(){i.setState({bottomReply:!0})},i.replyCancle=function(){i.setState({current_reply:""})},i.topicState=function(){return{id:i.props.match.params.id,state:i.state,scrollBar:Object(_.d)()}},i}return i(t,e),g(t,[{key:"componentWillUnmount",value:function(){this.props.saveTopicState(this.topicState())}},{key:"componentWillMount",value:function(){function e(){return t.apply(this,arguments)}var t=n(c.a.mark(function e(){var t,a,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.props.state||!this.props.state[this.props.match.params.id]){e.next=8;break}t=this.props.state[this.props.match.params.id],a=t.scrollBar.left,n=t.scrollBar.top,this.setState({data:t.state.data,current_reply:t.state.current_reply,accessToken:this.props.userInfo.accessToken}),setTimeout(function(){window.scrollTo(a,n)},20),e.next=10;break;case 8:return e.next=10,this.getData();case 10:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){return u.a.createElement("div",{className:"topic-container"},u.a.createElement(x.e,{back:!0,title:"\u4e3b\xa0\u9898"}),this.state.noTopic?u.a.createElement("div",{className:"no-topic"},"\u8bdd\u9898\u4e0d\u5b58\u5728\u6216\u5df2\u88ab\u5220\u9664..."):this.state.data?u.a.createElement("section",null,u.a.createElement(v,{data:this.state.data,handleCollect:this.handleCollect,createMarkup:this.createMarkup}),u.a.createElement(E,{state:this.state,cancle:this.replyCancle,current_reply:this.state.current_reply,showReplyBox:this.showReplyBox,createMarkup:this.createMarkup,ups:this.ups,replySuccess:this.replySuccess,getData:this.getData}),u.a.createElement(y.a,{transitionName:"rise",transitionEnterTimeout:300,transitionLeaveTimeout:300},this.state.bottomReply&&u.a.createElement("div",{className:"bottom-input",onClick:this.bottomFocus},u.a.createElement("input",{type:"text",disabled:!0,placeholder:"\u6211\u60f3\u8bf4\u70b9\u4ec0\u4e48..."}))),u.a.createElement(y.a,{transitionName:"rise",transitionEnterTimeout:300,transitionLeaveTimeout:300},!this.state.bottomReply&&u.a.createElement("div",{className:"reply"},u.a.createElement(w,{getData:this.getData,replySuccess:this.replySuccess,toSignin:this.toSignin,cancle:this.cancle,data:{accessToken:this.state.accessToken,topic_id:this.state.data.id}})))):u.a.createElement("div",{className:"loading"},u.a.createElement(x.b,null)),u.a.createElement(x.a,{closeAlert:this.closeAlert,alertTip:this.state.alertTip,alertStatus:this.state.alertStatus}),u.a.createElement(x.f,null))}}]),t}(p.Component),v=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),g(t,[{key:"render",value:function(){var e=this.props.data,t=e.title,a=e.author,n=e.is_collect,r=e.content,o=e.create_at;return u.a.createElement("div",null,u.a.createElement("section",{className:"article_content"},u.a.createElement("div",{className:"author"},u.a.createElement(m.b,{to:"/user/"+a.loginname},u.a.createElement("img",{className:"author_avatar",src:a.avatar_url,alt:""}),u.a.createElement("div",{className:"name-time"},u.a.createElement("p",{className:"author-name"},a.loginname),u.a.createElement("p",{className:"create-at"},Object(_.a)(o)))),u.a.createElement("span",{onClick:this.props.handleCollect,className:n?"isCollect":"collect"},u.a.createElement("svg",{className:"icon","aria-hidden":"true"},u.a.createElement("use",{xlinkHref:"#icon-love"})))),u.a.createElement("p",{className:"topic_title"},t),u.a.createElement("div",{className:"markdown",dangerouslySetInnerHTML:this.props.createMarkup(r)})))}}]),t}(p.Component),E=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),g(t,[{key:"render",value:function(){var e=this,t=this.props.state.data.replies;return u.a.createElement("div",null,t&&t.length>0&&u.a.createElement("section",{className:"replies_content"},u.a.createElement("header",{className:"replies_header"},"\u5171",u.a.createElement("span",null,t.length),"\u6761\u56de\u590d"),t.map(function(t,a){var n=t.id,r=t.content,o=t.author,i=t.ups,s=t.create_at,c=t.is_uped;return u.a.createElement("li",{className:"reply_list",key:n},u.a.createElement("section",{className:"reply_author"},u.a.createElement(m.b,{to:"/user/"+o.loginname},u.a.createElement("img",{className:"reply_avatar",src:o.avatar_url,alt:""}),u.a.createElement("div",{className:"name_time"},u.a.createElement("p",{className:"reply_author_name"},o.loginname),u.a.createElement("p",{className:"create_at"},Object(_.a)(s)))),u.a.createElement("span",{className:"reply_floor"},a+1,"\u697c")),u.a.createElement("section",{className:"reply_content",dangerouslySetInnerHTML:e.props.createMarkup(r)}),u.a.createElement("div",{className:"operation"},u.a.createElement("span",{className:"click-reply",onClick:function(t){e.props.showReplyBox(a,t)}},u.a.createElement("svg",{className:"icon","aria-hidden":"true"},u.a.createElement("use",{xlinkHref:"#icon-iconfonthuifu"}))),u.a.createElement("span",{className:"count"},i.length),u.a.createElement("span",{className:c?"is_uped":"click-zan",onClick:function(){e.props.ups(t)}},u.a.createElement("svg",{className:"icon","aria-hidden":"true"},u.a.createElement("use",{xlinkHref:"#icon-good"})))),u.a.createElement(y.a,{transitionName:"rise",transitionEnterTimeout:300,transitionLeaveTimeout:300},e.props.state.current_reply===a&&u.a.createElement(w,{placeholder:"@"+o.loginname,getData:e.props.getData,replySuccess:e.props.replySuccess,cancle:e.props.cancle,loginname:o.loginname,data:{accessToken:e.props.state.accessToken,topic_id:e.props.state.data.id,reply_id:n}})))})))}}]),t}(p.Component),w=function(e){function t(){var e,a,i,s,l=this;r(this,t);for(var p=arguments.length,u=Array(p),m=0;m<p;m++)u[m]=arguments[m];return a=i=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),i.state={alertStatus:!1,alertTip:""},i.closeAlert=function(){i.setState({alertStatus:!1,alertTip:""})},i.cancle=function(){i.props.cancle()},i.submit=n(c.a.mark(function e(){var t,a,n,r,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=i.props.data,a=void 0,n=void 0,r=void 0,!i.refs.content.value){e.next=15;break}return t.reply_id?(a=t.reply_id,n=i.props.placeholder+" "+i.refs.content.value):(a="",n=i.refs.content.value),e.next=7,Object(b.h)(t.topic_id,t.accessToken,a,n);case 7:if(o=e.sent,!o.success){e.next=13;break}return r="\u56de\u590d\u6210\u529f",e.next=12,i.props.getData();case 12:setTimeout(function(){i.props.replySuccess()},1500);case 13:e.next=16;break;case 15:r="\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a";case 16:i.setState({alertStatus:!0,alertTip:r});case 17:case"end":return e.stop()}},e,l)})),s=a,o(i,s)}return i(t,e),g(t,[{key:"render",value:function(){return u.a.createElement("div",{className:"reply-box"},u.a.createElement("textarea",{className:"textarea",autoFocus:!0,ref:"content",placeholder:this.props.placeholder}),u.a.createElement("div",{className:"btns"},u.a.createElement("input",{className:"btn",onClick:this.cancle,type:"button",value:"\u53d6 \u6d88"}),u.a.createElement("input",{className:"btn",onClick:this.submit,type:"button",value:"\u56de \u590d"})),u.a.createElement(x.a,{closeAlert:this.closeAlert,alertTip:this.state.alertTip,alertStatus:this.state.alertStatus}))}}]),t}(p.Component);t.default=Object(h.b)(function(e){return{userInfo:e.userInfo,state:e.topic}},{saveTopicState:d.c})(k)},348:function(e,t,a){var n=a(349);"string"===typeof n&&(n=[[e.i,n,""]]);var r={hmr:!1};r.transform=void 0;a(317)(n,r);n.locals&&(e.exports=n.locals)},349:function(e,t,a){t=e.exports=a(316)(!1),t.push([e.i,".rise-enter{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0}.rise-enter.rise-enter-active{-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;-o-transition:transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;opacity:1}.rise-leave{opacity:1;z-index:999}.rise-leave.rise-leave-active{opacity:0;z-index:999;-webkit-transition:opacity .3s;-o-transition:opacity .3s;transition:opacity .3s}.topic-container{margin-top:50px}.topic-container .reply{position:fixed;bottom:0;left:0;width:100%;padding:10px;background:#fff}.topic-container .loading{margin-top:30px}.topic-container .no-topic{text-align:center;margin-top:100px}.topic-container .bottom-input{position:fixed;bottom:0;left:0;width:100%;height:40px;background:#fff;z-index:99;border-top:1px solid #eee}.topic-container .bottom-input input{display:block;width:80%;height:30px;margin:5px auto;border-radius:30px;border:1px solid #ccc;outline:0;text-indent:15px}.topic-container .bottom-input input::-webkit-input-placeholder{color:#747171;font-weight:300}.article_content .author{overflow:hidden;padding:10px}.article_content .author .author_avatar{float:left;display:block;width:40px;height:40px;border-radius:50%}.article_content .author .name-time{float:left;height:4px}.article_content .author .name-time .author-name{margin-bottom:0;font-size:18px;color:#000}.article_content .author .name-time .create-at{margin-bottom:0;font-size:14px;color:#aaa}.article_content .author .collect{height:40px;line-height:40px;float:right;color:#414339;font-size:28px}.article_content .author .isCollect{height:40px;line-height:40px;float:right;color:#414339;font-size:28px;color:red}.article_content .topic_title{padding:10px;font-size:26px;text-align:center;font-weight:500;color:#000;word-break:break-all}.article_content .markdown{padding:10px}.article_content .markdown a{color:#053fbd}.replies_content{border-top:1px solid #ccc;margin-bottom:40px}.replies_content .replies_header{padding:10px;border-bottom:1px solid #ccc}.replies_content .replies_header span{color:red}.replies_content .reply_list{border-bottom:1px solid #eee;padding:10px;overflow:hidden}.replies_content .reply_list .reply_author{overflow:hidden}.replies_content .reply_list .reply_author .reply_avatar{width:40px;height:40px;border-radius:50%;float:left}.replies_content .reply_list .reply_author .name_time{float:left;font-size:14px}.replies_content .reply_list .reply_author .name_time .reply_author_name{font-size:16px;color:#000;margin-bottom:0}.replies_content .reply_list .reply_author .name_time .create_at{margin-bottom:0;color:#aaa}.replies_content .reply_list .reply_author .reply_floor{float:right;font-size:14px;color:#ccc}.replies_content .reply_list .reply_content{padding:0 10px}.replies_content .reply_list .operation{width:100%;overflow:hidden}.replies_content .reply_list .operation span{height:20px;line-height:20px;float:right}.replies_content .reply_list .operation .count{width:20px;text-align:center}.replies_content .reply_list .operation .click-reply{font-size:20px}.replies_content .reply_list .operation .click-zan{margin-top:-2px;font-size:18px}.replies_content .reply_list .operation .is_uped{margin-top:-2px;font-size:18px;color:red}.reply-box .textarea{width:100%;height:100px;border:1px solid #eee;outline:0;padding:5px;resize:none}.reply-box .btns{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.reply-box .btns .btn{width:50px;height:30px;color:#fff;font-size:16px;outline:none;border-radius:5px;background:#459dfc}@media screen and (min-width:415px){.article_content,.replies_content,.reply-box{max-width:50%;min-width:414px;margin:0 auto}.topic-container .bottom-input input{max-width:50%;min-width:414px}}",""])}});