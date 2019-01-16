import { FunctionalComponent } from '@stencil/core';
import { FormRenderProps } from '../declarations';

export const InputGroup: FunctionalComponent<{ props: FormRenderProps<any>, key: string }> = ({ props, key }, children, utils) => {
    const { values, touched, handleInput, handleBlur, handleFocus } = props;
    const inputAttrs = {
        name: key,
        value: values[key],
        class: {
            'is-touched': touched[key]
        },
        onInput: handleInput(key),
        onBlur: handleBlur(key),
        onFocus: handleFocus(key)
    }
    return utils.map(children, (child) => {
        return { ...child, vattrs: { ...inputAttrs, ...child.vattrs }}
    })
}