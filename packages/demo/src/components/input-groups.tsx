import { Component, FunctionalComponent } from '@stencil/core';
import { FormRenderProps, FormValidator } from 'stencil-form';

interface FormValues {
    username: string,
    password: string,
    passwordConfirm: string
}

const Fieldset: (props: FormRenderProps<FormValues>) => FunctionalComponent<{ name: keyof FormValues, label: string }> = (props) => {
    const { errors, groupProps, labelProps } = props;
    return (props, children, utils) => {
        const { name, label } = props;
        return (
            <div {...groupProps(name)}>
                <label {...labelProps(name)}> {label} </label>
                {utils.map(children, (child) => {
                    console.log(child);
                    return child;
                })}
                <label class='error' {...labelProps(name)}> {errors.username} </label>
            </div>
        )
    }
}

@Component({
    tag: 'example-input-groups'
})
export class InputGroups {

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
        } else if (username.value === 'admin') {
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
                <h1>Input Groups</h1>
                <stencil-form
                    initialValues={this.initialValues}
                    validate={this.validate}
                    renderer={(props: FormRenderProps<FormValues>) => {
                        const { formProps } = props;
                        const InputGroup = Fieldset(props);

                        return (
                            <form {...formProps}>

                                <InputGroup name='username' label='Username'>
                                    <input type='text' />
                                </InputGroup>

                                <InputGroup name='password' label='Password'>
                                    <input type='password' />
                                </InputGroup>

                                <InputGroup name='passwordConfirm' label='Confirm Password'>
                                    <input type='password' />
                                </InputGroup>

                                <example-debug state={props} display={['values', 'errors', 'validity']} />
                            </form>
                        )
                    }}
                />
            </main>
        );
    }
}
