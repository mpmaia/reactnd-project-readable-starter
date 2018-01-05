import jsdom from 'jsdom';

function initMockDom() {
    const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;
}

export default initMockDom;