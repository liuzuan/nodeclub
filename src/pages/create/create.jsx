import React, { Component } from 'react';
import { PublicHeader, PublicFooter } from '../../common/index';
import { createTopic } from '../../config/utils/getData';
import './create.less';
import { Alert } from '../../common/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertStatus: false, //弹框状态
            alertTip: '' //弹框提示文字
        };
        // 关闭弹
        this.closeAlert = () => {
            this.setState({
                alertStatus: false,
                alertTip: ''
            });
        };
        // 提交发表
        this.submit = async () => {
            let accesstoken = this.props.accessToken;
            let title = this.refs.title.value;
            let tab = this.refs.tab.value;
            let content = this.refs.content.value;
            let alertTip;
            if (title.length < 10) {
                alertTip = '标题字数不足';
            } else if (!tab) {
                alertTip = '请选择一种类型';
            } else if (!content) {
                alertTip = '内容不能为空';
            } else {
                let res = await createTopic(accesstoken, title, tab, content);
                if (res.success) {
                    alertTip = '发表成功';
                } else {
                    alertTip = '发表失败';
                }
            }
            this.setState({
                alertStatus: true,
                alertTip: alertTip
            });
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        if (!this.props.accessToken) {
            return <Redirect to={{ pathname: '/signin', state: { from: this.props.location } }} />;
        }
        return (
            <div>
                <PublicHeader avatar sent title="发&nbsp;表" submit={this.submit} />
                <main className="create-container">
                    <input ref="title" className="title" type="text" placeholder="标题:(10字以上)" />
                    <select ref="tab" className="tab">
                        <option value="">请选择一种类型</option>
                        <option value="share">分享</option>
                        <option value="ask">问答</option>
                        <option value="job">招聘</option>
                        <option value="dev">测试</option>
                    </select>
                    <textarea ref="content" className="content" placeholder="markdown文本，请注意格式标记" />
                    <Alert
                        closeAlert={this.closeAlert}
                        alertTip={this.state.alertTip}
                        alertStatus={this.state.alertStatus}
                    />
                </main>
                <PublicFooter />
            </div>
        );
    }
}

export default connect(state => ({ accessToken: state.userInfo.accessToken }))(Create);
