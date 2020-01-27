import { Component, h } from '@stencil/core';
import { FormRenderProps, StencilFormEventDetail } from 'stencil-forms';

interface FormValues {
    email: string,
    color: 'red' | 'green' | 'blue',
    animal: 'tiger' | 'bear' | 'shark',
    website: string
}

@Component({
    tag: 'demo-groups',
    styleUrl: 'demo-groups.css',
    shadow: true
})
export class DemoBasic {

    private initialValues: FormValues = {
        email: '',
        color: null,
        animal: null,
        website: ''
    }

    private handleSubmit = (event: CustomEvent<StencilFormEventDetail>) => {
        const { values, actions: { setSubmitting } } = event.detail;
        console.log(values);
        setTimeout(() => {
            setSubmitting(false);
        }, 500)
    }

    render() {
        return (
            <div>
                <h1>Signup</h1>
                <stencil-form
                    initialValues={this.initialValues}
                    onSubmit={this.handleSubmit}
                    renderer={(props: FormRenderProps<FormValues>) => {
                        const { formProps, labelProps, inputProps, groupProps, isSubmitting, values } = props;

                        return (
                            <form {...formProps}>
                                <div {...groupProps('email')}>
                                    <label {...labelProps('email')}> Email </label>
                                    <input {...inputProps('email')} placeholder='jane@acme.com' type='email' />
                                </div>

                                <div {...groupProps('color')}>
                                    <label {...labelProps('color')}> Color </label>
                                    <select name='color'>
                                        <option value="" selected={!values.color}>Select a Color</option>
                                        <option value="red" selected={values.color === 'red'}>Red</option>
                                        <option value="green" selected={values.color === 'green'}>Green</option>
                                        <option value="blue" selected={values.color === 'blue'}>Blue</option>
                                    </select>
                                </div>

                                <button type="submit">Submit</button>

                                { isSubmitting && <h4>Submitting...</h4> }
                            </form>
                        )
                    }}
                />
            </div>
        );
    }
}
