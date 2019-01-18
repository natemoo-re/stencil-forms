import { Component } from '@stencil/core';
import { FormRenderProps, StencilFormEventDetail } from 'stencil-form';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
}

@Component({
    tag: 'example-basic'
})
export class Basic {

    private initialValues: FormValues = {
        firstName: '',
        lastName: '',
        email: ''
    }

    private handleSubmit = (event: CustomEvent<StencilFormEventDetail>) => {
        const { values, actions: { setSubmitting } } = event.detail;

        console.log('Submit', values);

        setTimeout(() => {
            setSubmitting(false);
        }, 1000)
    }

    render() {
        return (
            <main>
                <h1>Basic</h1>
                <stencil-form
                    initialValues={this.initialValues}
                    onSubmit={this.handleSubmit}
                    renderer={(props: FormRenderProps<FormValues>) => {
                        const { formProps, groupProps, labelProps, inputProps, isSubmitting } = props;
                        return (
                            <form {...formProps}>
                                <div {...groupProps('firstName')}>
                                    <label {...labelProps('firstName')}> First Name </label>
                                    <input {...inputProps('firstName')} placeholder="John" />
                                </div>

                                <div {...groupProps('firstName')}>
                                    <label {...labelProps('lastName')}> Last Name </label>
                                    <input {...inputProps('lastName')} placeholder="Doe" />
                                </div>

                                <div {...groupProps('firstName')}>
                                    <label {...labelProps('email')}> Email </label>
                                    <input {...inputProps('email')} placeholder="john@acme.com" type="email" />
                                </div>

                                <button type="submit" {...(isSubmitting ? { disabled: true } : {})}>Submit</button>

                                <example-debug state={props} />
                            </form>
                        )
                    }}
                />
            </main>
        );
    }
}
