import { render, type AppContext, type DefineComponent } from 'vue';

// https://vuejs.org/api/built-in-components.html#keepalive

/**
 *
 * @param el The element to mount to
 * @param component The component to render
 * @param appContext Optional app context to provide injection keys, etc.
 */
export function renderComponent(el: HTMLElement, component: DefineComponent<any, any, any>, key: string, appContext?: AppContext) {
  const vNode = h(component, { key });
  if (appContext) vNode.appContext = appContext;

  // vNode.component is the component instance and probably needed...?

  render(vNode, el);
  return el;
}

export function destroyComponent(el: HTMLElement) {
  render(null, el);
}
