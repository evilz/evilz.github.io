---
layout: ../../layouts/MarkdownLayout.astro
title: Stuff
---

Curated links originally kept in [`evilz/Stuff`](https://github.com/evilz/Stuff).

## CI / GitHub

- [CI-BuildStats](https://github.com/dustinmoris/CI-BuildStats)

## Training

### CSS

- [Flexbox Froggy](http://flexboxfroggy.com)
- [Flexbox Defense](http://www.flexboxdefense.com/)
- [CSS Grid Garden](http://cssgridgarden.com/#fr)

### Workshops

- [Workshopper](https://github.com/workshopper)

## Build VS Code on ARM

- [How to contribute to VS Code](https://github.com/Microsoft/vscode/wiki/How-to-Contribute#build-and-run-from-source)
- [Visual Studio Code shell notes](https://gist.github.com/ted-piotrowski/e5c223a6a2f6f3079cb38c959ceecaa6#file-visualstudiocode-sh)

```bash
apt-get update && apt-get upgrade
apt-get install build-essential
sudo apt-get install libxss1
sudo apt-get install libgconf-2-4

sudo apt-get uninstall nodejs
wget https://nodejs.org/dist/v6.6.0/node-v6.6.0-linux-armv7l.tar.gz
tar -xvf node-v6.6.0-linux-armv7l.tar.gz
sudo cp node-v6.6.0-linux-armv7l /etc/node6.6
sudo ln -s /etc/node6.6/bin/node /usr/bin/node
sudo ln -s /etc/node6.6/bin/npm /usr/bin/npm
node --version

apt-get install python
```

## Presentations

- [Being functional](http://slides.com/rhwy/being-functional)
- [FableConf 2017 material](https://xtuc.github.io/fableconf-2017-material/#/?_k=qfn1xd)

## ASP.NET Core

- [Configure the ASP.NET Core environment for an ASP.NET Core application](http://www.smarterasp.net/support/kb/a1869/how-to-config-aspnetcore-environment-for-asp_net-core-application.aspx)

## Debugging

- [7 more lesser-known debugging tactics for Visual Studio](https://blogs.msdn.microsoft.com/visualstudio/2017/09/18/7-more-lesser-known-debugging-tactics-for-visual-studio/)

## Command Line

- [Halo](https://github.com/ManrajGrover/halo) - spinner braille.

## Persistence And Data

- [Mapping parent-child relationships with Dapper](https://gist.github.com/Lobstrosity/1133111)
