import { Component } from '@stencil/core';

@Component({
    tag: 'app-root'
})
export class Root {

    private menu: { title: string, url: string }[] = [
        { title: 'Basic', url: 'basic' },
        { title: 'Validation', url: 'validation' },
        // { title: 'Input Groups', url: 'input-groups' },
        { title: 'Advanced', url: 'advanced' },
    ]

    render() {
        return (
            <div class='app'>
                <nav>
                    <ul>
                        {this.menu.map(item => <li><stencil-route-link url={`/examples/${item.url}`}>{item.title}</stencil-route-link></li>)}
                    </ul>
                </nav>
                <stencil-router>
                    <stencil-route-switch>
                        {this.menu.map(item => <stencil-route url={`/examples/${item.url}`} component={`example-${item.url}`} />)}
                    </stencil-route-switch>
                </stencil-router>
            </div>
        )
    }
}
