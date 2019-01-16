import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'stencil-form-debug'
})
export class Form {

    @Prop() state: any;

    render() {
        return (
            <pre class='language-json'><code class='language-json'>{JSON.stringify(this.state, null, 2)}</code></pre>
        )
    }
}