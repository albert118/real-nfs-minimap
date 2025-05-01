import { render, type AppContext, type DefineComponent } from 'vue';

export type ComponentAlias = DefineComponent<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>;

/**
 *
 * @param el The element to mount to
 * @param component The component to render
 * @param props Optional, props to provide the component with
 * @param appContext Optional app context to provide injection keys, etc.
 * @see https://vuejs.org/api/built-in-components.html#keepalive
 */
export function renderComponent(el: HTMLElement, component: ComponentAlias, props?: Record<string, any>, appContext?: AppContext) {
    const vNode = h(component, props ?? {});
    if (appContext) vNode.appContext = appContext;
    render(vNode, el);
    return el;
}

export function destroyComponent(el: HTMLElement) {
    render(null, el);
}
