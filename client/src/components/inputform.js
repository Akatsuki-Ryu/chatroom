import React from "react";
import { Button, Form } from "semantic-ui-react";

class InputForm extends React.Component {
    state = {input: ""};

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onFormSubmit = () => {
        let input = this.state.input.trim();
        if(!input) return;
        this.props.onSubmit(input);
        this.setState({ input: "" });
    }

    render() {
        return (
            <Form className={ this.props.className } onSubmit={ this.onFormSubmit }>
                <Form.Group inline style={{ flexWrap:"nowrap" }}>
                    <Form.Input width={16} label={ this.props.label } value={ this.state.input } onChange={ this.onInputChange } />
                    <Button primary>{ this.props.submitLabel }</Button>
                </Form.Group>
            </Form>
        );
    }
}

export default InputForm;