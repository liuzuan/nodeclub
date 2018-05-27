import React, { Component } from "react";
import Loading from '@/common/dataLoading/dataLoading'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        Component: null
      };
    }

    async componentDidMount() {
      const { default: Component } = await importComponent();
      this.setState({Component});
    }

    render() {
      const {Component} = this.state;
      return Component ? <Component {...this.props} /> : <Loading />;
    }
  }

  return AsyncComponent;
}