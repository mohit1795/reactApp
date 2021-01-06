import React from 'react';
import './AutoComplete.css'

export default class AutoComplete extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            suggestions: [],
            textValue : ""
        };
    }

    onTextChangeEvent = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length!==0){
            fetch("https://api.github.com/search/repositories?q="+value+" in:name").then(res => res.json())
            .then((result) => {
                console.log(result);
                console.log(result.items.map((res)=>res.name));
                suggestions = result.items.map((res)=>res.name);
                suggestions = suggestions.slice(0,5);
                this.setState(() => ({suggestions, textValue: value}));
            })
        }
        this.setState(() => ({suggestions, textValue: value}));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            textValue: value,
            suggestions: []
        }))
    }

    renderSuggestions() {
        const {suggestions} = this.state;
        console.log(suggestions);
        if(suggestions.length===0)
            return null;
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        )
    }

    render () {
        const {textValue} = this.state;
        return (
            <div class = "autoCompleteBox">
                <input value={textValue} placeholder="Search Repo" onChange={this.onTextChangeEvent} type="text" />
                {this.renderSuggestions()}
            </div>
        )
    }
}