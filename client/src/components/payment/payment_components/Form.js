import '../css/form.css'

const Form = (props) => {

    const className = `${props.name}Divider`
    return (
        <div>
            <input className="input"
            type={props.type}
            name={props.name}         
            max={props.maxLength}
            placeholder={props.placeholder}
            onChange={props.onChange} 
            required/>
        </div>
    );
}

export default Form;