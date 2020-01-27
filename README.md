![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

<p align="center">
	<img src="https://raw.githubusercontent.com/natemoo-re/stencil-forms/master/.github/assets/logo.svg?sanitize=true" width="128">
</p>
<h1 align="center">Stencil Forms</h1>
<p align="center">Stencil Forms is a tool for managing complex form state in <a href="https://stenciljs.com">Stencil</a> projects.</p>

<br/>
<br/>
<br/>

> 🚨 This component is built for Stencil apps, not vanilla Web Component projects. It might be possible to use it in vanilla projects, but I wouldn't recommend it. 🚨

`<stencil-form />` is heavily inspired by [Formik](https://github.com/jaredpalmer/formik) and [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) (both React-based solutions), except relying Web Components and standard, built-in browser features.

## Example Usage

```tsx
import { FormRenderProps } from "stencil-form";
interface FormValues {
  demo: string;
}

// In the `your-component` render function
<stencil-form
  initialValues={{ demo: "Hello world!" }}
  renderer={(props: FormRenderProps<FormValues>) => {
    const { errors, groupProps, labelProps, inputProps, formProps } = props;
    return (
      <form {...formProps}>
        <div {...groupProps("demo")}>
          <label {...labelProps("demo")}> Demo </label>
          <input {...inputProps("demo")} type="text" required />
          {errors.demo && (
            <label class="error" {...labelProps("demo")}>
              {errors.demo}
            </label>
          )}
        </div>
      </form>
    );
  }}
/>;
```

## Styling

Styling is entirely up to you! The component provides minimal, mildly opinionated resets for `input` and `select` elements but stops short of removing things like `::-webkit-inner-spin-button` or `::-ms-clear`. If you'd like to ensure cross-browser consistency, I'd highly reccommend reading [TJ VanToll's pseudo-element list](https://www.tjvantoll.com/2013/04/15/list-of-pseudo-elements-to-style-form-controls/).

In order to allow maximum flexibility, `<stencil-form />` does not use Shadow DOM. If the [`::part` and `::theme`](https://drafts.csswg.org/css-shadow-parts-1/) proposal is rolled out, that might change&mdash;for now, Shadow DOM makes it too difficult for developers to implement custom styles.

## Installation

This package in unpublished at the moment. It will be available on NPM soon.

To build locally, just clone this monorepo.

```bash
lerna bootstrap
cd packages/demo
npm start
```

<!-- ### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/stencil-form@0.0.1/dist/stencil-form.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install stencil-form --save`
- Add an import to the npm packages `import 'stencil-form';` -->
