# TCS Core

![version](https://img.shields.io/github/package-json/v/FiveMTCS/Core/master?style=flat-square) ![license](https://img.shields.io/github/license/FiveMTCS/Core?style=flat-square) ![issues](https://img.shields.io/github/issues/FiveMTCS/Core?style=flat-square) ![contributors](https://img.shields.io/github/contributors/FiveMTCS/Core) ![commit](https://img.shields.io/github/last-commit/FiveMTCS/Core)

## Presentation

TCS is an open source FiveM framework developped with TypeScript language.

You can download the last version, ready to start on FiveM resources at the [releases page](https://github.com/FiveMTCS/Core/releases).

Find out how to contribute by reading the [contributing guide](https://github.com/FiveMTCS/Core/blob/main/CONTRIBUTING.md).

Don't forget to read the [Code of Conduct](https://github.com/FiveMTCS/Core/blob/main/CODE-OF-CONDUCT.md).

> **For any question about the core, you can directly ask it into the "discution" section of this repository**

## Git sources

To download the latest sources of TCS, execute this command :

`git clone https://github.com/FiveMTCS/Core.git`

## Issues

It is possible that you experience some issues while using TCS, especially with the first versions of it. Please, first verify that you are using the latest version and then report the issue by [clicking here](https://github.com/FiveMTCS/Core/issues).

## Get started

It is very simple to use TCS :

- Download the latest release [here](https://github.com/FiveMTCS/Core/releases)
- Drag and drop the folder to your FiveM server resources folder
- Add the next command to your server.cfg

```
ensure tcs
```

## Developer tools

To develop a new TCS module, follow these steps :

- Create a folder that will contain the sources of your module
- Execute these commands :

  npm init
  npm i -D @citizenfx/client
  npm i -D @citizenfx/server
  npm i -D @fivemtcs/types

- Export the sources and place them into the `modules/` folder inside the TCS Core resource.
  > You can find more informations by looking at the **[Demo project](https://github.com/FiveMTCS/DemoModule)**
