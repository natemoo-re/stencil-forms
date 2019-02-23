# stencil-form



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                       | Type                                   | Default      |
| ----------------- | ------------------- | ----------------------------------------------------------------- | -------------------------------------- | ------------ |
| `initialValues`   | --                  |                                                                   | `FormValues`                           | `undefined`  |
| `isInitialValid`  | `is-initial-valid`  | Tell Form if initial form values are valid or not on first render | `boolean`                              | `true`       |
| `renderer`        | --                  |                                                                   | `(props: FormRenderProps<any>) => any` | `() => null` |
| `validate`        | --                  |                                                                   | `FormValidator<FormValues>`            | `undefined`  |
| `validateOnBlur`  | `validate-on-blur`  | Tells Form to validate the form on each input's onBlur event      | `boolean`                              | `true`       |
| `validateOnInput` | `validate-on-input` | Tells Form to validate the form on each input's onInput event     | `boolean`                              | `true`       |


## Events

| Event    | Description | Type                                  |
| -------- | ----------- | ------------------------------------- |
| `submit` |             | `CustomEvent<StencilFormEventDetail>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
