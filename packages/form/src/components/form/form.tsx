import { Component, Prop, State, Element, Event, EventEmitter } from '@stencil/core';
import { FormRenderProps, FormState, FormValues, FormConfig, FormComputedProps, FormHandlers, FormValidator, FormValidity, FormTouched, FormErrors, FormUtils, StencilFormEventDetail, FormValidatorState } from '../../declarations';
import { getElementValue, copyValidityState } from '../../utils/types';

@Component({
    tag: 'stencil-form',
    styleUrl: 'form.css'
})
export class Form implements FormConfig {
    
    @Element() el!: HTMLStencilElement;
    private inputs: HTMLInputElement[] = [];
    private formId: string = `stencil-form-${formIds++}`;
    private dirty: boolean = false;

    @State() isValid: boolean = false;
    @State() isValidating: boolean = false;
    @State() isSubmitting: boolean = false;
    @State() submitCount: number = 0;

    @State() focused: keyof FormValues = null;
    @State() values: FormValues = {} as any;
    @State() touched: FormTouched<FormValues> = {} as any;
    @State() validity: FormValidity<FormValues> = {} as any;
    @State() errors: FormErrors<FormValues> = {} as any;

    @Prop() initialValues: FormValues;
    @Prop() renderer: (props: FormRenderProps<any>) => any = () => null;
    @Prop() validate: FormValidator<FormValues>;
    
    /** Tells Form to validate the form on each input's onInput event */
    @Prop() validateOnInput?: boolean = true;
    /** Tells Form to validate the form on each input's onBlur event */
    @Prop() validateOnBlur?: boolean = true;
    /** Tell Form if initial form values are valid or not on first render */
    @Prop() isInitialValid?: boolean = true;

    // @Event({ eventName: 'formReset' }) onFormReset: { emit: () => StencilFormEvent<FormValues> };
    @Event({ eventName: 'submit' }) onFormSubmit: EventEmitter<StencilFormEventDetail>;

    componentWillLoad() {
        this.isValid = this.isInitialValid;
        this.values = this.initialValues;

        for (const field of Object.keys(this.values)) {
            this.touched[field] = false;
            this.errors[field] = this.isInitialValid ? '' : null;
        }
    }

    componentDidLoad() {
        for (const input of this.inputs) {
            this.validity = { ...this.validity, [input.name]: { ...copyValidityState(input) } }
        }
    }

    setSubmitting = (value: boolean) => this.isSubmitting = value; 

    handleSubmit = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const isValid = (event.target as HTMLFormElement).checkValidity();
        this.isValid = isValid;
        if (!this.isValid) return;

        this.isSubmitting = true;
        this.submitCount++;
        const { setSubmitting } = this;
        this.onFormSubmit.emit({ values: this.values, actions: { setSubmitting } });
    };
    
    handleReset = () => {
        this.isSubmitting = false;
        this.submitCount = 0;
    };

    handleInput = (field: string) => async (event: Event) => {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        const value: any = getElementValue(target);
        
        const values = { ...this.values, [field]: value };
        this.values = values;
        
        /** Validate, if user wants to validateOnInput */
        if (this.validateOnInput) {
            const validity = copyValidityState(target);
            const { validationMessage } = target;

            let formValidity = { ...this.validity, [field]: validity };
            let formErrors = { ...this.errors, [field]: validationMessage };

            const resetCustomValidity = (_field: keyof FormValues) => {
                const localTarget: HTMLInputElement = this.inputs.find(x => x.name === _field);
                localTarget.setCustomValidity('');

                const validity = copyValidityState(localTarget);
                formValidity = { ...formValidity, [_field]: validity };
                formErrors = { ...formErrors, [_field]: localTarget.validationMessage };
            }

            const setCustomValidity = (_field: keyof FormValues) => (message: string) => {
                const localTarget: HTMLInputElement = this.inputs.find(x => x.name === _field);
                // setCustomValidity because we want to #usetheplatform
                // allows users to style with :valid and :invalid
                localTarget.setCustomValidity(message);
                const validity = copyValidityState(localTarget);
                
                formValidity = { ...formValidity, [_field]: validity }
                formErrors = { ...formErrors, [_field]: message }
            }
            
            if (typeof this.validate === 'function') {
                this.isValidating = true;
                
                let validatorState: FormValidatorState<FormValues> = { } as any;
                for (let [key, value] of Object.entries(this.values)) {
                    if (this.touched[key]) resetCustomValidity(key);
                    
                    validatorState = {
                        ...validatorState,
                        [key]: {
                            value,
                            validity: formValidity[field],
                            error: formErrors[field],
                            setCustomValidity: setCustomValidity(key)
                        }
                    }
                }
                await this.validate(validatorState);
                this.isValidating = false;
            }

            this.validity = formValidity;
            this.errors = formErrors;
        }
    };

    handleBlur = (field: string) => (event: Event) => {
        if (this.focused) this.focused = null;
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        const value: any = getElementValue(target);
    
        this.values = { ...this.values, [field]: value };
    };

    handleFocus = (field: string) => () => {
        this.focused = field;
        if (!this.touched[field]) this.touched = { ...this.touched, [field]: true };
    }

    private composedState = (): FormState<FormValues> => {
        const { focused, values, errors, validity, touched, isValidating, isSubmitting, submitCount } = this;
        return { focused, values, errors, validity, touched, isValidating, isSubmitting, submitCount };
    }

    private composedHandlers = (): FormHandlers<FormValues> => {
        const { handleSubmit, handleReset, handleInput, handleFocus, handleBlur } = this;
        return { handleSubmit, handleReset, handleInput, handleFocus, handleBlur };
    }

    private computeProps = () => {
        this.dirty = !Object.values(this.touched).every(x => !x);
        this.isValid = Object.values(this.validity).every(x => x.valid);
    }

    private composedComputedProps = (): FormComputedProps<FormValues> => {
        this.computeProps();
        const { dirty, isValid, initialValues } = this;
        return { dirty, isValid, initialValues };
    }

    private composedUtils = (): FormUtils<FormValues> => {
        const groupProps = (field: keyof FormValues) => ({
            class: {
                'input-group': true,
                'was-touched': this.touched[field],
                'has-focus': this.focused === field,
                'has-value': typeof this.values[field] === 'string' ? !!this.values[field] : typeof this.values[field] === 'number' ? typeof this.values[field] !== null : false,
                'has-error': !this.validity[field] || this.validity[field] && !this.validity[field].valid,
            }
        })

        const inputProps = (field: keyof FormValues) => ({
            name: field,
            id: `${this.formId}-input-${field}`,
            value: this.values[field],
            ref: (el: HTMLInputElement) => this.inputs = [...this.inputs, el],
            onInput: this.handleInput(field as string),
            onBlur: this.handleBlur(field as string),
            onFocus: this.handleFocus(field as string)
        });

        const labelProps = (field: keyof FormValues) => ({
            htmlFor: `${this.formId}-input-${field}`
        });

        const formProps = {
            action: 'javascript:void(0);',
            onSubmit: this.handleSubmit
        };

        return { groupProps, inputProps, labelProps, formProps };
    }

    render() {
        const state: FormState<FormValues> = this.composedState();
        const handlers: FormHandlers<FormValues> = this.composedHandlers();
        const computedProps: FormComputedProps<FormValues> = this.composedComputedProps();
        const utils: FormUtils<FormValues> = this.composedUtils();
        
        const renderProps: FormRenderProps<any> = { ...state, ...handlers, ...computedProps, ...utils };
        return this.renderer(renderProps);
    }
}
let formIds: number = 0;