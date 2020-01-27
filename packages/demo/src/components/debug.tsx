import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'example-debug',
    shadow: true,
    styles: `
        :host {
            display: block;
            margin: 4em 0;
            font-size: 14px;
        }

        div {
            padding: 0.1em 0.5em;
            background: var(--c-light);
            border-radius: 0.25em;
        }
    `
})
export class Basic {

    @Prop() state: any;
    @Prop() display: string[] = ['values', 'isSubmitting', 'submitCount'];

    render() {
        if (this.state) {
            let display: any = {};
            for (let key of this.display) {
                display = { ...display, [key]: this.state[key] };
            }

            return (
                <div>
                    <pre><code>{JSON.stringify(display, null, 2)}</code></pre>
                </div>
            );
        }
    }
}
