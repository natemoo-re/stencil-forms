import { Component, Prop, State, Element } from '@stencil/core';
import { FormRenderProps, FormState, FormValues, FormConfig, FormComputedProps, FormHandlers, FormValidator, FormValidity, FormTouched, FormErrors, FormUtils } from '../declarations';
import { getElementValue, copyValidityState } from '../utils/types';

@Component({
    tag: 'stencil-form'
})
export class Form implements FormConfig {
    
    @Element() el!: HTMLStencilElement;
    private formId: string = `stencil-form-${formIds++}`;
    private dirty: boolean = false;

    /** Initially set to `isInitialValid`, then true when values pass validation. */
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
    @Prop() isInitialValid?: boolean = false;

    // @Event({ eventName: 'formReset' }) onFormReset: { emit: () => StencilFormEvent<FormValues> };
    // @Event({ eventName: 'formSubmit' }) onFormSubmit: { emit: () => StencilFormEvent<FormValues> };

    componentWillLoad() {
        this.isValid = this.isInitialValid;
        this.values = this.initialValues;

        for (const field of Object.keys(this.values)) {
            this.touched[field] = false;
            this.errors[field] = this.isInitialValid ? '' : null;
        }
    }

    componentDidLoad() {
        for (const field of Object.keys(this.values)) {
            this.validity = { ...this.validity, [field]: copyValidityState(this.el.querySelector(`[name="${field}"]`)) };
        }
    }

    handleSubmit = (_event: Event) => {
        this.isSubmitting = true;
        this.submitCount++;
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

            const resetCustomValidity = () => {
                target.setCustomValidity('');
                const validity = copyValidityState(target);
                formValidity = { ...formValidity, [field]: validity };
                formErrors = { ...formErrors, [field]: target.validationMessage };
            }

            const setCustomValidity = (message: string) => {
                // setCustomValidity because we want to #usetheplatform
                // allows users to style with :valid and :invalid
                target.setCustomValidity(message);
                const validity = copyValidityState(target);
                
                formValidity = { ...formValidity, [field]: validity }
                formErrors = { ...formErrors, [field]: message }
            }
            
            if (typeof this.validate === 'function') {
                this.isValidating = true;
                resetCustomValidity.call(this);
                const utils = { setCustomValidity };
                await this.validate({ values, validity: formValidity, errors: formErrors }, utils);
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
        const { /** handleSubmit, handleReset, */ handleInput, handleFocus, handleBlur } = this;
        return { /** handleSubmit, handleReset, */ handleInput, handleFocus, handleBlur };
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
                'untouched': !this.touched[field],
                'has-focus': this.focused === field,
                'has-value': typeof this.values[field] === 'string' ? !!this.values[field] : typeof this.values[field] === 'number' ? typeof this.values[field] !== null : false,
                'has-error': !this.validity[field] || this.validity[field] && !this.validity[field].valid,
            }
        })

        const inputProps = (field: keyof FormValues) => ({
            name: field,
            id: `${this.formId}-input-${field}`,
            value: this.values[field],
            onInput: this.handleInput(field as string),
            onBlur: this.handleBlur(field as string),
            onFocus: this.handleFocus(field as string)
        });

        const labelProps = (field: keyof FormValues) => ({
            htmlFor: `${this.formId}-input-${field}`
        });

        return { groupProps, inputProps, labelProps };
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