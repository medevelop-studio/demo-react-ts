import React from "react";
import onClickOutside from "react-onclickoutside";

import Input from "./Input";

interface IInputFilterProps {
  inputProps: {
    className: string;
    placeholder: string;
    type: "text" | "password" | "hidden" | "login";
    name: string;
    value: string | number;
    error: number;
    autocomplete: "on" | "off";
    onChange: (e?: any) => void;
  };
  selectById: boolean;
  listData: any;
  selectInputFilter: (text: any, text2: any) => void;
}

interface IInputFiltersState {
  isOpen: boolean;
  listData: any;
}

class InputFilter extends React.Component<IInputFilterProps, IInputFiltersState> {
  constructor(props) {
    super(props);

    this.state = {
      listData: this.filterListData(this.props.inputProps.value),
      isOpen: false
    };
  }

  setOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleClickOutside = () => {
    this.setState({
      isOpen: false
    });
  };

  filterListData = name => {
    return this.props.listData.filter(item => 
      item.name.toLowerCase().lastIndexOf(typeof(name) === 'string' ? name.toLowerCase() : null) !== -1 && item
    );
  };

  handleChange = e => {
    const name = e.target.value;

    this.setState({
      listData: this.filterListData(name)
    });

    this.props.inputProps.onChange(e);
  };

  selectItem = e => {
    const name = e.currentTarget.dataset.name;
    const id = e.currentTarget.dataset.id;

    this.setState({
      listData: this.filterListData(name),
      isOpen: false
    });

    this.props.selectInputFilter(this.props.selectById ? id : name, this.props.inputProps.name);
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div className="input-filter">
        <Input {...this.props.inputProps} onFocus={this.setOpen} onChange={this.handleChange} />
        {isOpen && (
          <div className="input-filter__list">
            {this.state.listData.map((item, i) => {
              return (
                <div key={i} className="input-filter__list__item" data-name={item.name} data-id={item.id} onClick={this.selectItem}>
                  <span>{item.login}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(InputFilter);
