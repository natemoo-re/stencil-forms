![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# 📝 Stencil Form

`<stencil-form />` is a Web Component for building complex forms in Stencil [apps](https://github.com/ionic-team/stencil-app-starter).

It manages the overall state of your form for you, without doing any hand-wavey magic. ⛔️👋

> 🚨 This component is built for Stencil apps, not vanilla Web Component projects. It might be possible, but I wouldn't recommend it. 🚨

`<stencil-form />` is heavily inspired by [Formik](https://github.com/jaredpalmer/formik) (a React-based solution), except using Web Components and standard, built-in browser features.

## Example Usage

```tsx
import { FormRenderProps } from 'stencil-form';
interface FormValues {
    demo: string,
}

// In the `your-component` render function
<stencil-form 
    initialValues={{ demo: 'Hello world!' }}
    renderer={(props: FormRenderProps<FormValues>) => {
        const { errors, groupProps, labelProps, inputProps } = props;
        return (
            <form>
                <div {...groupProps('demo')}>
                    <label {...labelProps('demo')}> Demo </label>
                    <input {...inputProps('demo')} type='text' required />
                    {errors.demo && <label class='error' {...labelProps('demo')}>{ errors.demo }</label>}
                </div>
            </form>
        )
    }}
/>
```


## Getting Started

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/stencil-form@0.0.1/dist/stencil-form.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install stencil-form --save`
- Add an import to the npm packages `import 'stencil-form';`
