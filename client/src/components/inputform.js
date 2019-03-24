import React from "react";

const InputForm = ({label, submitLabel, onSubmit}) => {
    let input;

    const onFormSubmit = event => {
        event.preventDefault();
        let inputText = input.value.trim();
        if (!inputText) return;
        onSubmit(inputText);
        input.value = "";
    }

    return (
        <form onSubmit={onFormSubmit}>
            <label>{label}<input ref={ref => input = ref}/></label>
            <input type="submit" value={submitLabel}/>
        </form>
    )
}

export default InputForm
