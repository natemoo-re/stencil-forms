import { Component } from '@stencil/core';
import { FormRenderProps, StencilFormEventDetail } from 'stencil-form';

const capitalize = (value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`;

interface FormValues {
    email: string;
    date: string;
    animal: 'lion' | 'tiger' | 'bear' | 'shark';
    color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';
    newsletter: boolean;
}

@Component({
    tag: 'example-advanced'
})
export class Advanced {

    private initialValues: FormValues = {
        email: '',
        date: new Date().toISOString().substr(0, 10),
        animal: null,
        color: null,
        newsletter: true
    }

    private colorOptions: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    private animalOptions: string[] = ['lion', 'tiger', 'bear', 'shark'];
    private animalEmoji: string[] = ['🦁', '🐯', '🐻', '🦈'];

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
                <h1>Advanced</h1>
                <stencil-form
                    initialValues={this.initialValues}
                    onSubmit={this.handleSubmit}
                    renderer={(props: FormRenderProps<FormValues>) => {
                        const { errors, values, formProps, groupProps, labelProps, inputProps, checkboxProps, radioProps, selectProps, isSubmitting } = props;

                        return (
                            <form {...formProps}>
                                <div {...groupProps('email')}>
                                    <label {...labelProps('email')}> Email </label>
                                    <input {...inputProps('email')} placeholder="john@acme.com" type='email' required />
                                    {errors.email && <label class='error' {...labelProps('email')}>{errors.email}</label>}
                                </div>

                                <div {...groupProps('date')}>
                                    <label {...labelProps('date')}> Date </label>
                                    <input {...inputProps('date')} type='date' required />
                                    {errors.date && <label class='error' {...labelProps('date')}>{errors.date}</label>}
                                </div>

                                <div {...groupProps('animal')}>
                                    <label {...labelProps('animal')}> Favorite Animal </label>
                                    <div class='select-wrapper'>
                                        <select {...selectProps('animal')} required>
                                            <option value=''>Select an animal...</option>
                                            {this.animalOptions.map(option => <option value={option}>{capitalize(option)}</option>)}
                                        </select>
                                    </div>
                                    {errors.animal && <label class='error' {...labelProps('animal')}>{errors.animal}</label>}
                                </div>

                                <fieldset {...groupProps('color')}>
                                    <legend> Favorite Color </legend>
                                    <ul>
                                        {this.colorOptions.map(color => (
                                            <li class='radio-container'>
                                                <input {...radioProps('color', color)} />
                                                <label {...labelProps('color', color)} class='radio-label'> {capitalize(color)} </label>
                                            </li>
                                        ))}
                                    </ul>
                                    {errors.color && <label class='error' {...labelProps('color')}>{errors.color}</label>}
                                </fieldset>

                                <div {...groupProps('newsletter')}>
                                    <label {...labelProps('newsletter')}>
                                        Do you want more spam in your inbox?
                                    </label>

                                    <div class='checkbox-container'>
                                        <input {...checkboxProps('newsletter')} />
                                        <label {...labelProps('newsletter')}>
                                            <span>Yes please!</span>
                                        </label>
                                    </div>

                                    {!values.newsletter && <div class={{ notice: true, [values.color]: true }}> WOW... I thought we were friends?!&ensp;{values.animal && this.animalEmoji[this.animalOptions.findIndex(x => x === values.animal)]}</div>}
                                </div>

                                <button type="submit" {...(isSubmitting ? { disabled: true } : {})}>Submit</button>

                            </form>
                        )
                    }}
                />
            </main>
        );
    }
}
