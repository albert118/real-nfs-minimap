import { render, type AppContext } from 'vue';

/**
 *
 * @param el The element to mount to
 * @param component The component to render
 * @param appContext Optional app context to provide injection keys, etc.
 */
export default function renderComponent(el: HTMLElement, component: any, appContext?: AppContext) {
  const vNode = h(component);
  if (appContext) vNode.appContext = appContext;
  render(vNode, el);
}
