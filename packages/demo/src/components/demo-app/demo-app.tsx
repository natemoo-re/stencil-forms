import { Component } from '@stencil/core';
import { FormRenderProps, FormValidator } from 'stencil-form';

interface FormValues {
    test: string,
    email: string,
    count: number
}

@Component({
    tag: 'demo-app',
    styleUrl: 'demo-app.css'
})
export class DemoApp {

    private initialValues: FormValues = {
        test: '',
        email: '',
        count: 10,
    }

    private validate: FormValidator<FormValues> = async ({ values }, utils) => {
        if (values.email.match(/poop/g)) {
            utils.setCustomValidity('No naughty words!');
        }
    }

    render() {
        return (
            <stencil-form initialValues={this.initialValues} validate={this.validate} renderer={(props: FormRenderProps<FormValues>) => {
                const { isValid, errors, inputProps, labelProps, groupProps } = props;
                
                return ([
                    <form>

                        <h1> This form is {isValid ? 'VALID' : 'INVALID'}</h1>

                        <div {...groupProps('test')}>
                            <label {...labelProps('test')}> Test </label>
                            <input {...inputProps('test')} type='text' required maxLength={12} />
                            {errors.test && <label {...labelProps('test')} class='error'>{errors.test}</label>}
                        </div>

                        <div {...groupProps('email')}>
                            <label {...labelProps('email')}> Email </label>
                            <input {...inputProps('email')} type='email' required />
                            {errors.email && <label {...labelProps('email')} class='error'>{errors.email}</label>}
                        </div>

                        <div {...groupProps('count')}>
                            <label {...labelProps('count')}> Count </label>
                            <input {...inputProps('count')} type='number' required />
                            {errors.count && <label {...labelProps('count')} class='error'>{errors.count}</label>}
                        </div>

                    </form>,

                    <stencil-form-debug state={{ values: props.values }} />
                ])
            }} />
        );
    }
}
