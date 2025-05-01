import type { ComponentInternalInstance, VNode, VNodeArrayChildren, VNodeNormalizedChildren } from 'vue';

export function getChildren(instance: ComponentInternalInstance): VNode[] | null {
  return instance.subTree.children as VNode[];
}
