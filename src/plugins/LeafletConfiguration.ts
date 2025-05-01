import Logger from 'js-logger';
import L from 'leaflet';

export default {
    async install() {
        await import('leaflet/dist/leaflet.css');
        setDefaultIconOptions();
        await installPlugins();
    },
};

async function installPlugins() {
    const logger = Logger.get('Leaflet Plugin Registrar');
    logger.setLevel(Logger.DEBUG);

    logger.time('plugins registered');

    // https://github.com/TolonUK/Leaflet.EdgeBuffer
    // @ts-ignore
    await import('leaflet-edgebuffer');
    // https://gitlab.com/IvanSanchez/Leaflet.GridLayer.FadeOut
    // @ts-ignore
    await import('leaflet.gridlayer.fadeout');

    logger.timeEnd('plugins registered');
}

/**
 * Overrides the default implementation
 * https://leafletjs.com/reference.html#divicon
 */
function setDefaultIconOptions() {
    L.Icon.Default.prototype.options = {
        ...L.Icon.Default.prototype.options,
        iconUrl: undefined,
        iconRetinaUrl: undefined,
        shadowRetinaUrl: undefined,
        iconSize: undefined,
    };
}
