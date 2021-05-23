# Maltasupermarket.com Chrome Extension	

Maltasupermarket.com provide a handy *price per unit* value for each product on their site but unfortunately they do not provide the ability to search by this value. This Chrome Extension gives the website this ability.

![price per unit values](assets/Price%20per%20Unit%20640x400.jpg)

# How does it work?

The extension dynamically injects a new *sort by* option called "Price: Lowest per Unit first" withint the *sort by* dropdown. Once clicked, the extension will go through all the visible products, sorts them, then replaces the products with their sorted counterpart.

Once slected the sort setting will be peristed throughout any navigation done through the site until a native *sort by*option is selected.

![dropdown demo](assets/Sort%20By%20Dropdown%20-%20Demo.gif)

## Privacy

This plugin does not collect any data from the user and does not have the ability to remotely control, inject or otherwise communicate with a remote service.

# Development

Pull requests with the aim of enchancing the experience of the maltasupermarket.com website are encouraged.

## Commands

|Command         |Description                                                   |
|----------------|--------------------------------------------------------------|
|`npm run start` |Starts a service that will build the dist files on file change|
|`npm run build` |Builds the dist files                                         |

## Testing

Generate the *dist* folder by executing `npm run build` or `npm run start`.

Navigate to `chrome://extensions/` on your Chrome browser.

Enable *Developer Mode* by clicking the toggle at the top right of the page, a sub menu should appear.
![enable developer mode](assets/Chrome%20extensions%20developer%20mode.jpg)

Click on *Load unpacked* and select the *dist* folder. The extension is now installed.
![click load unpacked](assets/Chrome%20extensions%20-%20load%20unpacked.jpg)

When the *dist* folder is updated, either click on the reload icon next to your Chrome extension, or you can use [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) which gives the convenient ability to reload all unpacked extensions through a button click.