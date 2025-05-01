export {};

// provide shims and additional types for/from Vue
declare global {
    Ref<T> = import('vue').Ref<T>;
    const Ref: Global['Ref'];
}
