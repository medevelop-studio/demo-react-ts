import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";

import { inputPatterns } from "../../common/patterns";

const FormHOC = (WrappedComponent, defaultValues, validator) => {
  class ComponentHOC extends Component<any, any> {
    state = {
      values: this.props.customValues || defaultValues,
      errors: {}
    };

    handleChange = (e, myTarget) => {
      try {
        if (this.props.handleChange) {
          this.props.handleChange(e.target.value)
        }        
        const dataPattern = e.currentTarget.dataset.pattern.split(", ");

        if (e.target.value && dataPattern.length) {
          for (const pattern of dataPattern) {
            // console.log(
            //   "pattern:", inputPatterns[pattern],
            //   "is passed:", !inputPatterns[pattern].test(e.target.value) ? "false" : "OK",
            //   "value:", e.target.value
            // );
            if (!inputPatterns[pattern].test(+e.target.value)) return;
          }
        }
      } catch (err) {}

      this.setState({
        values: {
          ...this.state.values,
          ...(myTarget || { [e.target.name]: e.target.value })
        }
      });
    };

    selectDate = (date, type) => {
      this.setState({
        values: {
          ...this.state.values,
          [type]: date
        }
      });
    };

    selectInputFilter = (value, name) => {
      this.setState({
        values: {
          ...this.state.values,
          [name]: value
        }
      });
    };

    onSubmit = e => {
      e.preventDefault();
      const { isValid, errors } = validator(this.state.values);

      this.setState({ errors });

      if (!isValid) {

        return;
      }

      this.props.onSubmit(this.state.values);
    };

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          handleChange={this.handleChange}
          selectDate={this.selectDate}
          selectInputFilter={this.selectInputFilter}
          onSubmit={this.onSubmit}
        />
      );
    }
  }

  return withTranslate(ComponentHOC);
};

export default FormHOC;
