import React from 'react'
import { Input } from 'antd'
import debounce from 'lodash.debounce'

export default class CustomInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: null,
    }
  }

  changeInputValue = (e) => {
    const { onChange } = this.props
    onChange(e.target.value)
  }

  render() {
    return (
      <Input
        defaultValue=""
        placeholder="Введите название фильма"
        value={this.inputValue}
        onChange={this.changeInputValue}
      />
    )
  }
}
