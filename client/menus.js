/// <reference types="@altv/types-client" />
import alt from 'alt';

const url = 'http://resource/client/html/index.html';

let menuInfo = {};
let view;

alt.on('menus:Create', handleMenuCreation);
alt.on('menus:AddOption', handleMenuAddOption);
alt.on('menus:Destroy', handleMenusDestroy);

function handleMenuCreation(title, offsetX, offsetY) {
    if (view && view.destroy) {
        view.destroy();
        view = null;
    }

    if (!view) {
        view = new alt.WebView(url);
        view.on('menu:Event', handleMenuEvent);
        view.on('menu:Ready', handleMenuReady);
    }

    menuInfo.title = title;
    menuInfo.offsetX = offsetX;
    menuInfo.offsetY = offsetY;

    view.focus();
    showCursor(true);
}

function handleMenuAddOption(identifier, label, optionOrOptions) {
    // Needs Logic
}

function handleMenusDestroy() {
    if (view && view.destroy) {
        view.destroy();
        view = null;
    }

    showCursor(false);
}

function handleMenuEvent(identifier, value) {
    alt.emit(`menu:${identifier}`, value);
}

function handleMenuReady() {
    if (!view) {
        return;
    }

    view.emit(`menu:Ready`, menuInfo);
}

function showCursor(state) {
    try {
        alt.showCursor(state);
    } catch (err) {
        return;
    }
}
