# Utilisez votre téléphone comme poste de développement

De quoi s'agit-il exactement ?
Dans cette article je vais vous montrer comment transformer votre téléphone android en poste de travail avec un IDE.
Pour être plus clair nous allons voir comment flasher un Nexus 5 avec un OS nommé MaruOS et installer Visual Studio Code.

L'idée n'est pas nouvelle, et certain parmis vous auront surement déjà entendu parlé de projets comme Windows Continuum, qui permet notamment de travailler avec les produits de la gamme Office.


![microsoft display dock](microsoft-display-dock-1.jpg)

Ou encore de Andromium et Sentio https://www.sentio.com/. qui tente de créer et vendre un "superbook" qui se résume à un écran de 11" et un clavier.

![sentio superbook](sentio.png)

Mais MaruOS possède des avantages non négligeables : 
- Ca marche aujourd'hui !
- On a sous la main un linux complet !

# Pré-requis

Avant de vous lancer dans l'aventure voici une petite liste du matériel nécessaire : 

- un téléphone Nexus 5 ou 7 que l'on peut flasher sans crainte (d'autres modèles seront disponible plus tard)
- un clavier bluetooth
- une souris bluetooth
- un câble de connexion SlimPort USB-to-HDMI
- du Wifi

Personnellement, j'utilise un clavier `it works` trouvé à Darty.
![clavier bluetooth](it_works_clavier_bluetooth_aluminium.jpg)

Et une souris Razer Orochi
![razer orochi](razer-orochi.png)

## Maru OS

La première étape consiste à installer MaruOS sur le téléphone.
Qu'est ce que Maru ? Maru c'est "simplement" un Android 6 + un linux debian qui tournent en parallèle sur votre téléphone.

![maru oss](maru-android-debian-linux.png)

Vous aurez du coup un téléphone standard Android et dès que vous le connectez en utilisant le câble SlimPort sur un écran en hdmi, la parti linux va se mettre en route et s'afficher à l'écran. Notez que pendant ce temps votre téléphone reste utilisable.

Dans la suite nous allons voir comment installer VS Code, mais évidemment les possibilités sont quasi infinies tant que ce que vous voulez installer existe pour linux sous une architecture ARM. Car oui n'oubliez pas que les téléphones sont, dans la plupart des cas, sur une technologie ARM et donc cote performance ca se ressent de temps en temps.
Il sera donc par exemple impossible de compiler du code C# :(


### Installation

> Sauvegardez tous vos documents, photos, contacts ... qui sont sur le téléphone !!! 
Nous allons le flasher en utilisant une restauration ce qui va effacer toutes les données

#### 1. Activer le mode développeur et le debug USB

##### Sur votre PC
Il faut dans un premier temps installer les drivers usb. Pour les obtenir il y a deux possibilités :
- Télécharger les drivers ici : [http://developer.android.com/sdk/win-usb.html](http://developer.android.com/sdk/win-usb.html)
- Utiliser l'android SDK manager

![](sdk-manager.png)

##### Sur le téléphone

- Dans les paramètres, allez dans la section Système
- A propos du téléphone
- Tapez 7 fois sur le numéro de build pour devenir développeur !
- Revenez dans les paramètres et dans Systeme
- Puis dans Les options de développeur
- Activez le debug USB
- Branchez le cable USB 

Si tout va bien le téléphone est détecter et les drivers s'installent tout seul.

#### 2. Télécharger la Rom

En fonction de votre système: Mac Os, Linux ou Windows une release avec les scripts d'installation est disponible ici [https://github.com/maruos/maruos/releases](https://github.com/maruos/maruos/releases).

L'avantage c'est qu'il vous suffi d'exécuter un script et de suivre le programme d'installation qui est capable de débloquer bootloader et flasher Maru en quelques étapes.

Dans mon cas je vais utiliser la version pour windows. Pour plus d'info sur l'installation rendez-vous ici : https://github.com/maruos/maruos/wiki/Installation-Guide

Dézippez le contenu du zip et lancez l'exécution du fichier install et suivez le processus

```bash
C:\maru-v0.4-installer-hammerhead-windows-0db8cdcb>install.cmd

Welcome to the Maru installer!

In order to install Maru you will need to:

1. Connect your device to your computer over USB

2. Enable USB Debugging on your device:

   1.  Go to the Settings app and scroll down to
       the System section

       NOTE: If you already have "Developer options"
       under System then go directly to #5

   2.  Tap on "About phone"
   3.  Tap "Build number" 7 times until you get a message
       that says you are now a developer
   4.  Go back to the main Settings app
   5.  Tap on "Developer options"
   6.  Ensure that "USB debugging" is enabled
   7.  Tap "OK" if you see a dialog asking you to allow
       USB Debugging for your computer's RSA key fingerprint

WARNING: Installing Maru will wipe all your personal data
so make sure you first back-up anything important!

Are you ready to install Maru? (yes/no):

Aborting installation.

Press any key to exit...

```


### Post install

Vous avez maintenant un android tout neuf, plus exactement un Maru OS.
La pluspart du temps on voudra quand meme avoir les services google qui ne sont pas installés par défaut pisque qu'il ne s'agit pas d'une distrib officielle.



gapp

configuration du bluetooth
configuration du wifi

## Installation VS Code

### Installation depuis les sources

Nous allons voir comment compiler en quelques commande Visual Studio Code depuis les sources disponibles sur Github.
Cela nécessite plusieurs outils et frameworks de développement, notamment NodeJs et python. 

1. installation des outils de développement


```bash
sudo -s

sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install libx11-dev libxkbfile-dev
sudo apt-get install -y build-essential
sudo apt-get install -y libxss1
sudo apt-get install -y libgconf-2-4
//sudo apt-get install python

sudo apt-get install rpm
sudo apt-get install git
```

2. compile

git clone https://github.com/microsoft/vscode
cd vscode
./scripts/npm.sh install --arch=armhf


```bash
# building Visual Studio Code Debian package on ARM

# get source code
git clone git@github.com:Microsoft/vscode.git
cd vscode

# build debian package
./scripts/npm.sh install --arch=armhf
./node_modules/.bin/gulp vscode-linux-arm-build-deb

# locate built package, install and run
find . -name *.deb #this will give location of built package
sudo dpkg install [location-from-previous-step]
code-oss # to run the installed program

```

## install from packages !

Merci a headmelted d'avoir fait tout le travail :) 
Pour tous les infos rendez-vous ici https://code.headmelted.com/

```bash
sudo apt-get install wget
. <( wget -O - https://code.headmelted.com/installers/apt.sh )
```
