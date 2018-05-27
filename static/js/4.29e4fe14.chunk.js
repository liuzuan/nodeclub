webpackJsonp([4],{323:function(e,t,a){"use strict";function s(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){function s(n,r){try{var o=t[n](r),i=o.value}catch(e){return void a(e)}if(!o.done)return Promise.resolve(i).then(function(e){s("next",e)},function(e){s("throw",e)});e(i)}return s("next")})}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=a(66),l=a.n(i),c=a(0),m=a.n(c),g=a(65),p=a(354),u=(a.n(p),a(27)),f=a(35),d=a(114),h=a(34),v=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),b=function(e){function t(e){var a=this;n(this,t);var o=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.state={message:[],showingMsg:[]},o.getMessage=s(l.a.mark(function e(){var t,s;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!o.props.accessToken){e.next=6;break}return e.next=3,Object(d.g)(o.props.accessToken);case 3:t=e.sent,s=o.props.location.state,o.setState({message:t,showingMsg:t[s?s.type:"has_read_messages"]});case 6:case"end":return e.stop()}},e,a)})),o.createMarkup=function(e){return{__html:e}},o}return o(t,e),v(t,[{key:"componentWillMount",value:function(){function e(){return t.apply(this,arguments)}var t=s(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("/my/message"===this.props.location.pathname&&this.props.history.replace("/my/message/has_read"),!this.props.accessToken){e.next=4;break}return e.next=4,this.getMessage();case 4:case"end":return e.stop()}},e,this)}));return e}()},{key:"componentWillReceiveProps",value:function(e){e.location.state!==this.props.location.state&&this.setState({showingMsg:this.state.message[e.location.state.type]})}},{key:"render",value:function(){var e=this;return this.props.accessToken?m.a.createElement("div",{className:"message"},m.a.createElement(g.e,{avatar:!0,title:"\u4e2a\u4eba\u6d88\u606f"}),m.a.createElement("nav",null,m.a.createElement(u.c,{to:{pathname:"/my/message/has_read",state:{type:"has_read_messages"}},activeClassName:"activeTab"},m.a.createElement("p",null,"\u5df2\u8bfb\u6d88\u606f")),m.a.createElement(u.c,{to:{pathname:"/my/message/hasnot_read",state:{type:"hasnot_read_messages"}},activeClassName:"activeTab"},m.a.createElement("p",null,"\u672a\u8bfb\u6d88\u606f"))),m.a.createElement("section",{className:"message-content"},this.state.showingMsg.length?m.a.createElement("div",{className:"message-list"},this.state.showingMsg.map(function(t,a){var s=t.author,n=t.create_at,r=t.reply,o=t.topic,i=t.type;return m.a.createElement("li",{className:"list-cell",key:t.id},m.a.createElement(u.b,{to:"/user/"+s.loginname},m.a.createElement("img",{src:s.avatar_url,alt:""})),m.a.createElement("div",null,m.a.createElement("p",{className:"name-time"},m.a.createElement(u.b,{to:"/user/"+s.loginname},m.a.createElement("span",{className:"name"},s.loginname)),m.a.createElement("span",{className:"time"},Object(h.a)(n))),m.a.createElement(u.b,{to:"/topic/"+o.id},m.a.createElement("p",{className:"type"},"\u5728\u8bdd\u9898",o.title,"\u4e2d","reply"===i?"\u56de\u590d":"@","\u4e86\u4f60"))),m.a.createElement(u.b,{to:"/topic/"+o.id,className:"message-text"},m.a.createElement("p",{dangerouslySetInnerHTML:e.createMarkup(r.content)})))})):m.a.createElement("div",{className:"nomsg"},m.a.createElement(g.c,null))),m.a.createElement(g.d,null)):m.a.createElement(u.d,{to:{pathname:"/signin",state:{from:this.props.location}}})}}]),t}(c.Component);t.default=Object(f.b)(function(e){return{accessToken:e.userInfo.accessToken}})(b)},354:function(e,t,a){var s=a(355);"string"===typeof s&&(s=[[e.i,s,""]]);var n={hmr:!1};n.transform=void 0;a(317)(s,n);s.locals&&(e.exports=s.locals)},355:function(e,t,a){t=e.exports=a(316)(!1),t.push([e.i,".message nav{position:fixed;top:49px;left:0;width:100%;height:40px;display:-ms-flexbox;display:flex;z-index:99;background:#fff}.message nav a{width:50%;height:40px;color:#4e4d4d;line-height:40px;text-align:center;border-bottom:1px solid #ccc}.message nav a:first-child{border-right:1px solid #eee}.message nav .navList{color:#000}.message nav .activeTab{color:#000;color:#459dfc;background:#eee}.message .message-content{margin-top:99px}.message .message-content .nomsg{margin-top:150px}.message .message-content .message-list{margin-bottom:50px}.message .message-content .message-list .list-cell{padding:1rem;border-bottom:1px solid #eee;overflow:hidden}.message .message-content .message-list .list-cell a{color:#000}.message .message-content .message-list .list-cell img{float:left;width:4rem;height:4rem;border-radius:50%}.message .message-content .message-list .list-cell div{overflow:hidden}.message .message-content .message-list .list-cell div p,.message .message-content .message-list .list-cell div span{font-size:1.3rem;text-align:left;font-weight:400;color:#000}.message .message-content .message-list .list-cell div .name-time{width:100%;display:inline;float:left}.message .message-content .message-list .list-cell div .name-time span{margin:0 .5rem}.message .message-content .message-list .list-cell div .name-time .name{color:#000}.message .message-content .message-list .list-cell div .name-time .time{color:#aaa}.message .message-content .message-list .list-cell div .type{font-weight:300;width:100%;margin:0 .5rem}.message .message-content .message-list .list-cell .message-text{display:block;margin:1rem;padding:0 1rem;border-radius:.5rem;background:#eee}",""])}});