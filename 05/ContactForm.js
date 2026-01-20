import React, { useReducer, useState } from 'react';
import emailjs from '@emailjs/browser';

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
    const initFormVal = Object.fromEntries(formFields.map((field) => [field.name, '']));
    const reducerForm = (state, { name, value }) => ({ ...state, [name]: value });
    const [formValues, formDispatch] = useReducer(reducerForm, initFormVal);

    const initialErrors = { formErrors: null, sendError: null };
    const reducerError = (state, { type, payload }) => ({ ...state, [type]: payload });
    const [errors, errorsDispatch] = useReducer(reducerError, initialErrors);
    const [mailSent, setMailSent] = useState(false);
    const [sending, setSending] = useState(false);

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
        const validationErrors = new Map([]);

        fields.forEach((field) => {
            const { value } = e.target[field.name];
            const { label } = field;
            if (field.required && !isNotEmpty(value)) {
                validationErrors.set(field.name, `Pole: ${label} jest puste`);
            } else if (field.regex && isNotEmpty(value)) {
                const isCorrect = checkPattern(field.regex, value);
                if (!isCorrect)
                    validationErrors.set(field.name, `Pole: ${label} ma niewłaściwy format`);
            }
        });

        if (validationErrors.size > 0) {
            return validationErrors;
        }
        return null;
    }

    const resetFormValues = () => {
        formFields.forEach((field) => {
            const { name } = field;
            formDispatch({ name, value: '' });
        });
    };

    const sendEmailJS = () => {
        const { serviceID, templateID, publicKey } = account;
        const { name, email, phone, subject, message } = formValues;
        const templateParams = {
            name,
            message,
            title: subject,
            email,
            phone,
        };
        setSending(true);

        emailjs.send(serviceID, templateID, templateParams, { publicKey }).then(
            () => {
                setMailSent(true);
                setSending(false);
                resetFormValues();
            },
            (err) => {
                setSending(false);
                errorsDispatch({ type: 'sendError', payload: err });
            },
        );
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const validationErrors = validate(e, formFields);
        if (validationErrors !== null) {
            errorsDispatch({ type: 'formErrors', payload: validationErrors });
        } else {
            errorsDispatch({ type: 'formErrors', payload: null });
            sendEmailJS();
        }
    };

    return (
        <form onSubmit={submitHandler}>
            {errors.sendError && <span> {errors.sendError}</span>}
            {mailSent && <span> Wysłano</span>}
            {sending && <span> Wysyłam...</span>}
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
                        {errors.formErrors && errors.formErrors.has(field.name) && (
                            <span>{errors.formErrors.get(field.name)}</span>
                        )}
                    </div>
                );
            })}
            <button type="submit">Wyślij</button>
        </form>
    );
}

export default ContactForm;
