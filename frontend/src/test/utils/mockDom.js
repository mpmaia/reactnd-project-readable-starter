import jsdom from 'jsdom';

function initMockDom() {
    const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;
    global.HTMLElement = doc.defaultView.HTMLElement;
}

export default initMockDom;