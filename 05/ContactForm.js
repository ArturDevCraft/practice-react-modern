import React, { useReducer } from 'react';

import account from './account';

function ContactForm() {
    const formFields = [
        { name: 'name', type: 'text', label: 'Imię i nazwisko', regex: /.{2,40}/, required: true },
        {
            name: 'email',
            type: 'email',
            label: 'E-mail',
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            required: true,
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Telefon',
            regex: /^\+?[0-9]{7,15}$/,
            required: false,
        },
        { name: 'subject', type: 'text', label: 'Temat', regex: /.{5,100}/, required: true },
        { name: 'message', type: 'textarea', label: 'Wiadomość' },
    ];
    // eslint-disable-next-line no-console
    console.log(account);
    const init = Object.fromEntries(formFields.map((field) => [field.name, '']));
    const reducer = (state, { name, value }) => ({ ...state, [name]: value });
    const [state, dispatch] = useReducer(reducer, init);
    return (
        <form>
            {formFields.map((field) => {
                const Tag = field.type === 'textarea' ? 'textarea' : 'input';
                return (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}:</label>
                        <Tag
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            required={field.required}
                            value={state[field.name]}
                            onChange={(e) => dispatch(e.target)}
                        />
                    </div>
                );
            })}
            <button type="submit">Wyślij</button>
        </form>
    );
}

export default ContactForm;
