import { Component } from '@stencil/core';
import { FormRenderProps, FormValidator } from 'stencil-forms';

interface FormValues {
    username: string,
    password: string,
    passwordConfirm: string
}

@Component({
    tag: 'example-validation'
})
export class Basic {

    private initialValues: FormValues = {
        username: '',
        password: '',
        passwordConfirm: ''
    }

    private validate: FormValidator<FormValues> = (state) => {
        const { username, password, passwordConfirm } = state;
        
        // myField.validity leverages the browser's built-in Constraint Validation API
        // It conforms to the ValidityState interface
        if (username.validity.patternMismatch) {
            // Instead of the default browser message, this sets a custom one
            username.setCustomValidity('Username may not contain any spaces.');
        } else if (/\badmin\b/gi.test(username.value)) {
            // In a case not covered by the Constraint Validation API
            // We use setCustomValidity, which changes the ValidityState of the input element
            // In CSS, the :invalid selector will still work
            username.setCustomValidity('Uh oh, mister. You\'re not an admin!');
        }

        // Validate that passwords match
        if (passwordConfirm.value && passwordConfirm.value && passwordConfirm.value !== password.value) {
            password.setCustomValidity('Passwords do not match');
            passwordConfirm.setCustomValidity('Passwords do not match');
        }
    }

    render() {
        return (
            <main>
                <h1>Validation</h1>
                <stencil-form
                    initialValues={this.initialValues}
                    validate={this.validate}
                    renderer={(props: FormRenderProps<FormValues>) => {
                        const { errors, formProps, groupProps, labelProps, inputProps } = props;
                        return (
                            <form {...formProps}>
                                <div {...groupProps('username')}>
                                    <label {...labelProps('username')}> Username (try "admin" or use spaces) </label>
                                    <input {...inputProps('username')} required pattern='\S+' />
                                    {/* Note: this causes the node to be added/removed from the DOM, which enabled nice transitions via CSS `animation` */}
                                    { errors.username && <label class='error' {...labelProps('username')}> {errors.username} </label> }
                                </div>

                                <div {...groupProps('password')}>
                                    <label {...labelProps('password')}> Password </label>
                                    <input {...inputProps('password')} type='password' required />
                                    { errors.password && <label class='error' {...labelProps('username')}> {errors.password} </label> }
                                </div>

                                <div {...groupProps('passwordConfirm')}>
                                    <label {...labelProps('passwordConfirm')}> Confirm Password </label>
                                    <input {...inputProps('passwordConfirm')} type='password' required />
                                    { errors.passwordConfirm && <label class='error' {...labelProps('passwordConfirm')}> {errors.passwordConfirm} </label> }
                                </div>
                                <example-debug state={props} display={['values', 'errors', 'validity']} />
                            </form>
                        )
                    }}
                />
            </main>
        );
    }
}
