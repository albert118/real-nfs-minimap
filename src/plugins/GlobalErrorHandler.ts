import type { App } from 'vue';

export default {
    install(app: App) {
        app.config.errorHandler = (err, instance, info) => {
            console.groupCollapsed(
                '❌ An unhandled error has reached the app boundary (expand for details)',
            );

            console.error(`\tError: ${err}`);

            const instanceName =
                instance?.$options.name ??
                instance?.$.type.__name ??
                '<unknown type>';
            console.error(`\tOriginating component: ${instanceName}`);
            console.error(`\tError code link: ${info}`);

            console.groupEnd();
        };
    },
};
