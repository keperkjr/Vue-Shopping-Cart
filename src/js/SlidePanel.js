// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Jan 9, 2021
//    Taken From: http://programmingnotes.org/
//    File:  SlidePanel.js
//    Description: Module that opens/closes a slide panel
//    Example:
//        // Open SlidePanel
//        SlidePanel.open(element)
//
//        // Close SlidePanel
//        SlidePanel.close(element)
// ============================================================================
/**
* NAMESPACE: SlidePanel
* USE: Handles SlidePanel related functions
*/
var SlidePanel = SlidePanel || {};
(function(namespace) {
    'use strict';

// -- Public data --
    // Property to hold public variables and functions
    let exposed = namespace;

    // Set class names and other shared data
    const settings = {
        // Element class names
        classNameSlidePanel: '.slide-panel',
        classNameSlidePanelOpen: '.open',
        classNameSlidePanelClose: '.close',
        classNameSlidePanelButton: '.slide-panel-button',
        classNameSlidePanelBackground: '.slide-panel-background',

        // Element data names
        dataNamePanelFor: 'data-for',
        dataNameCloseOnBackgroundClick: 'data-closeOnBackgroundClick',
        dataNameIncludeBackground: 'data-includeBackground',
        cleanClassName: (str) => {
            return str ? str.trim().replace('.', '') : '';
        },
    };

    exposed.settings = settings;

    /**
    * FUNCTION: init
    * USE: Adds click events for the slide panel menus
    * @param element: JavaScript element to search for slide panel buttons
    * @return: N/A
    */
    exposed.init = (element = document) => {
        // Setup panels
        let panels = getPanels(element);
        for (let panel of panels) {
            // Include background if needed
            if (shouldIncludeBackground(panel)) {
                let background = getBackground(panel) || createBackground(panel);
                if (shouldCloseOnBackgroundClick(panel)) {
                    background.addEventListener('click', backgroundCloseEvent);
                }
            }
        }

        // Register open button events
        let openButtons = getOpenButtons(element);
        for (let openButton of openButtons) {
            // Get the slide panel panel for the button
            let panel = getPanel(openButton);

            // Make sure panel exists
            if (isNull(panel)) {
                console.error(`Unable to open: SlidePanel element id '${getPanelFor(openButton)}' does not exist`);
                continue;
            }
            // Add click event
            openButton.addEventListener('click', openEvent);
        }

        // Register close button events
        let closeButtons = getCloseButtons(element);
        for (let closeButton of closeButtons) {
            // Add click event
            closeButton.addEventListener('click', closeEvent);
        }
    }

    /**
    * FUNCTION: open
    * USE: Opens the slide panel
    * @param panel: JavaScript element of the slide panel
    * @return: N/A
    */
    exposed.open = (panel) => {
        let background = getBackground(panel);
        if (!isNull(background)) {
            addClass(background, settings.classNameSlidePanelOpen);
        }
        addClass(panel, settings.classNameSlidePanelOpen);
    }

    /**
    * FUNCTION: close
    * USE: Closes the slide panel
    * @param panel: JavaScript element of the slide panel
    * @return: N/A
    */
    exposed.close = (panel) => {
        let background = getBackground(panel);
        if (!isNull(background)) {
            let duration = getTransitionDuration(panel);
            setTimeout(() => {
                removeClass(background, settings.classNameSlidePanelOpen);
            }, duration - 30);
        }
        removeClass(panel, settings.classNameSlidePanelOpen);
    }

// -- Private data --
    let openEvent = (event) => {
        let panel = getPanel(event.target);
        exposed.open(panel);
    }

    let closeEvent = (event) => {
        let panel = getPanel(event.target);
        exposed.close(panel);
    }

    let backgroundCloseEvent = (event) => {
        if (event.target != event.currentTarget) {
            return;
        }
        let panel = getPanel(event.target);
        exposed.close(panel);
    }

    let getPanel = (element) => {
        let panel = null;
        // Button
        if (hasClass(element, settings.classNameSlidePanelButton)) {
            // Open button
            if (hasClass(element, settings.classNameSlidePanelOpen)) {
                let navFor = getPanelFor(element);
                if (isEmpty(navFor)) {
                    console.error(`'${settings.dataNamePanelFor}' is not specified for a SlidePanel 'open' button`);
                } else {
                    panel = document.querySelector(`#${navFor}`);
                }
            // Close button
            } else if (hasClass(element, settings.classNameSlidePanelClose)) {
                panel = element.closest(settings.classNameSlidePanel)
            }
        // Background
        } else if (hasClass(element, settings.classNameSlidePanelBackground)) {
            panel = element.querySelector(settings.classNameSlidePanel)
        }
        return panel;
    }

    let getPanelFor = (element) => {
        return element.getAttribute(settings.dataNamePanelFor);
    }

    let getBackground = (panel) => {
        return panel.closest(settings.classNameSlidePanelBackground);
    }

    let getPanels = (element = document) => {
        return element.querySelectorAll(settings.classNameSlidePanel);
    }

    let getOpenButtons = (element = document) => {
        return element.querySelectorAll(`${settings.classNameSlidePanelButton}${settings.classNameSlidePanelOpen}`);
    }

    let getCloseButtons = (element = document) => {
        return element.querySelectorAll(`${settings.classNameSlidePanelButton}${settings.classNameSlidePanelClose}`);
    }

    let shouldCloseOnBackgroundClick = (element) => {
        let value = element.getAttribute(settings.dataNameCloseOnBackgroundClick);
        if (isNull(value)) {
            value = true;
        }
        return toBoolean(value);
    }

    let shouldIncludeBackground = (element) => {
        let value = element.getAttribute(settings.dataNameIncludeBackground);
        if (isNull(value)) {
            value = true;
        }
        return toBoolean(value);
    }

    let createBackground = (element) => {
        let container = document.createElement('div');
        let parentNode = element.parentNode;
        addClass(container, settings.classNameSlidePanelBackground);
        parentNode.insertBefore(container, element);
        container.appendChild(element);
        return container;
    }

    let addClass = (element, cssClass) => {
        cssClass = settings.cleanClassName(cssClass);

        let modified = false;
        if (cssClass.length > 0 && !hasClass(element, cssClass)) {
            element.classList.add(cssClass)
            modified = true;
        }
        return modified;
    }

    let removeClass = (element, cssClass) => {
        cssClass = settings.cleanClassName(cssClass);

        let modified = false;
        if (cssClass.length > 0 && hasClass(element, cssClass)) {
            element.classList.remove(cssClass);
            modified = true;
        }
        return modified;
    }

    let hasClass = (element, cssClass) => {
        cssClass = settings.cleanClassName(cssClass);
        return element.classList.contains(cssClass);
    }

    let toBoolean = (value) => {
        value = String(value).trim().toLowerCase();
        let ret = false;
        switch (value) {
            case 'true': case 'yes': case '1':
                ret = true;
                break;
        }
        return ret;
    }

    let isNull = (item) => {
        return undefined === item || null === item;
    }

    let isEmpty = (str) => {
        return isNull(str) || String(str).trim().length < 1;
    }

    let getTransitionDuration = (element) => {
        let style = window.getComputedStyle(element);
        let duration = style['transitionDuration'] || style['transition-duration'];
        // fix miliseconds vs seconds
        duration = (duration.indexOf('ms') > -1) ? parseFloat(duration)
            : parseFloat(duration) * 1000;
        return duration;
    }

    (function (factory) {
        /*global define*/
        if (typeof define === 'function' && define.amd) {
            define([], factory);
        } else if (typeof exports === 'object') {
            module.exports = factory();
        }
    }(function() { return namespace; }));
}(SlidePanel)); // http://programmingnotes.org/