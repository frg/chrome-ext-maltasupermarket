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