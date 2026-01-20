import React, { useReducer, useState } from 'react';

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
    const initFormVal = Object.fromEntries(formFields.map((field) => [field.name, '']));
    const reducerForm = (state, { name, value }) => ({ ...state, [name]: value });
    const [formValues, formDispatch] = useReducer(reducerForm, initFormVal);
    const [formErrors, setFormErrors] = useState(null);

    function checkPattern(pattern, val) {
        const regex = new RegExp(pattern);
        return regex.test(val);
    }

    function isNotEmpty(string = null) {
        if (string === null || string.trim() === '') {
            return false;
        }
        return true;
    }

    function validate(e, fields) {
        e.preventDefault();
        const errors = new Map([]);

        fields.forEach((field) => {
            const { value } = e.target[field.name];
            const { label } = field;
            if (field.required && !isNotEmpty(value)) {
                errors.set(field.name, `Pole: ${label} jest puste`);
            } else if (field.regex && isNotEmpty(value)) {
                const isCorrect = checkPattern(field.regex, value);
                if (!isCorrect) errors.set(field.name, `Pole: ${label} ma niewłaściwy format`);
            }
        });

        if (errors.size > 0) {
            return errors;
        }
        return null;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const errors = validate(e, formFields);
        if (errors !== null) {
            setFormErrors(errors);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            {formFields.map((field) => {
                const Tag = field.type === 'textarea' ? 'textarea' : 'input';
                return (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}:</label>
                        <Tag
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            // required={field.required}
                            value={formValues[field.name]}
                            onChange={(e) => formDispatch(e.target)}
                        />
                        {formErrors && formErrors.has(field.name) && (
                            <span>{formErrors.get(field.name)}</span>
                        )}
                    </div>
                );
            })}
            <button type="submit">Wyślij</button>
        </form>
    );
}

export default ContactForm;
