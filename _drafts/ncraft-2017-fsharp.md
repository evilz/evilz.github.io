# Retour sur les session Fsharp a Ncraft 2017

J'ai eu la change d'assister aux deux jour de la conference NCraft de cette annee (2017).
Sur les deux jours nous avons pu assister à de nombreuses présentations trés interresantes, 
mais je vais ici m'interesser aux sessions abordant du Fsharp et aux quelles j'ai pu participer.


## Scott Wlaschin - Thirteen ways of looking at a Turtle
### @ScottWlaschin

![](https://lh3.googleusercontent.com/ddh2YnhlhQzF4kgjv-TGIRPnZwgac1Ren7MFPRL5LKF0y0t8C3IAuZ_RFLCk5nHJWMOmXBc4Hl0SlfiqJCwS-ifm9gFl1O05z2_nbJ0x22voJrXcnkFaZsTXR21PPMBg0JDK-gSXcWUTjpwj9-phFTirweHGAIo9RkqsiNvDWim83aq8YKHSFCkw2LBfRn6Oc_FO4rhyef3nrJyJFNqMv1sXDE2VhAXPSIw947uCg5NXdLGW2-gX118ADbMSMKu91Kq_Kd0CSNkdtlCXibchlveefp-fDZ9Hp-J6j6dJ9OjDu1SD3ecZEq6M7HijVBgSlsPNSoZbxCy32khgRjO9RWS4D7acQHvrbTxnjshwAKazbROGtLP5_DxkTbeqiNRWennXU_Fgw0dGsVK_3e1Thdkbjhr4IfoZ1zITDBbW8AEI4o6BOD1nu16AfJVXhrLqXGToHg0zzhG_qDN5A65RDFnhiXJQOHP-wsEELR0GkdTPSzcr-M8SVm4wDnnH7Fdk9zbJ8zugZ4kCx87PeIjCiBA14QntZ7kfAokARgZIRv5dcJt0cnlsXAMqib1VDXIy9oJtYnnTQyD9cvg6JUO3Lhwm9hLEt4YNOOncSJo-tCvaWXjk9ycNbw1MYou_s98Hq5w3Pc-Ot2p1imCWsisATtrCRL-SokDsV2jvPSrpaw=w1253-h939-no)

Tout le monde se pose la meme question en lisant le titre de la session : "Une tortue ? What ...?"
En fait Scott nous propose en utilisant l'image de cette tortue une API très simpliste permetant de tracer des trais.
La "tortue" peut se déplacer en avant, tourner sur un angle donné, et finalement dessiner ou non le trais pendant son déplacement.

Cette API de 4 méthodes peux sembler trop simple pour etre vraiment interessante, mais nous allons voir sa réalisation en utilisant 13 approches differentes.
Cela va du modele orienté objet classique, en passant par de l'actor model puis de l'event sourcing. 


Je vous recommande fortemant de jeter un coup d'oeil car meme si le code est présenté en F#, cela reste applicable dans d'autres plateformes.
 L'ensemble du contenu est en ligne sur son fameux site : [https://fsharpforfunandprofit.com/turtle/](https://fsharpforfunandprofit.com/turtle/) 


---

## Evelina Gabasova - The F#orce Awakens
### @evelgab

---

## Evelina Gabasova - The F#orce Awakens
### @evelgab

<video width="100%" height="400" controls>
  <source src="https://video.googleusercontent.com/AHKaTYHAz0S5vlUmGPqJfDyEzDsfNXGUSq02TA1Zzx592cTs_MYlPrycpO1NBQw_gi6YSYoy6x4MipNksPn3cHq9OksGImrHFZnVTSZv_UHCGWkOwocd9WtweRbSkdDKDnbe9LqXlGCJYdAswSLDaqCDnfIWWu6Igl2N1lXdZ3Ywcrk7KPK5JS9jJ4oeCAWDoI75d8lPRFxiAoNV6gtdO8yaU6rM6xl8RgG487Xl_YvLFfit95O35fUQw08kiFPltOmBGxCJ0IeTzuy5714QfM1yXOAJqaLV7AdiwidPyNKAXBR5N7FfEqVP-Z0iaQkRhzGstWWs6toqg0hlAq3YjTUmk64hVpAXGRejH31qhgtIXUmBUZXoOdMUavfW7ki5_r4atwjWzYdnTkMQ3tHXNXlaQVaupYf9NPItqGq-TL4FsqkAcAHUAI7ZyzCxlGDJ-jz_6jbClXQHZeyotOfi8FvPOlhi23JAbUDC2nIB0hbj6PYEsoGwlmSmo-M9zsz8cNaPgdF5KHYxR1tEpsQzmxe2CIYuRdaZBzCnolRZo-x5JlQiHYLAJwZFVWvkN9zAW-ODBny6KgvE3EGokpiWW4z3IzOP4u7l3-SQ6diOB0tkhA25UHUt-lS3XvQgH8mBkFcpdzlI_awDwTYET8mqYokBJpOR0q26fFpcrK6A5rvFhfnRCQ5Fqd6fHCDIgG9Mgss39okAHYIx5hiYZgMi0fgJE7ls7ytmJgXc3ISSymDnLF1WYPUXrwBAkocs0pdby-xqhXlOyyiZj0h_ur1pE2gKNRWggcZ90Cn9Q_4Ojx3223xkD7pMnu0" type="video/mp4">
Your browser does not support the video tag.
</video>

Après une introduction digne de la saga Star Wars, Evelina nous a presenté comment elle a réalisé une analyse autour des personnages en utilisant les scripts des 7 films.

La premiere étape consistait à reussir a parser les differents scripts des films pour en extraire les noms des personnage. Elle a alors utilisé les scenes pour en deduire les personnages connectés.
Cela ne s'est pas fait sans mal puisque chaque script possede un format different et que certain personnage n'ont meme pas de dialogue.

Pour cette premiere etape c'est des regex et des active parterns qui ont été réalisés.

Deuxieme étape : Analyser les donnees.

Evelina nous a montre ses differents Azure notebook (notebooks.azure.com) d'analyse.
Ces notebooks, fortement inspiré de ceux disponible en Python, permette de mélanger texte et code executable. 
On utilise alors la lib Fsharp.Data pour generer des graphiques plus ou moins complexe.

![](https://lh3.googleusercontent.com/xglHRRyaye4Ex6HI9GlCCe7sz0aUlcCaBBsbnut1GekF9J4C9bf1RNoM5gZ7CkFU9gCGYR45WsmS46mYm4N81DKQ6bR3ye0Ao7t9D5-YNxcg2xXFcf34X2HWEH__SKR1vwmwUo_GH4GOPBMv2yf9kmMxRAc7OYA7dyv3ZHVFktbjCvFtNdgdseM9r6ZMs9RTqYzVSz-zSppqqeT6aexkjik2Vyd8PmTDRfOLzWHfh9OezDUCl31f97sbdS4x_2a6rcvF2ugXbVKfOBpo2lgnUisr6duUvwBU5q5tUbb51WWZ6TrmsFRA5eJa86lo7MtSzVnh7ujszl6mFEzqIbku0cCSWZp29DktgRmcpezGEWtxPD6OxAc9UJeuK0EeH_RuloUI98QtEgqOHUG9SbgUl40sSjJq9eLEUoc2q2Bo68H-3EAggrydNvTMTOx1ZLtOF6oOanxR1H2x4tEPKwPSWBZad1S33-Z5xixcPctdU-VUq-MywgAqhuGQDaBcoUX1s9iOyiQpt8Hw--P1CHCINBxEotes3u_xXeHmvKsXD8N0YXSabgRnFdtJqQyJdd4DI8ypHLHxVT5wZUsXVt6V00COWQnLBShfPP7ecXH_kMTv4yihdz_bsKG5KkRaFgldn-RssHcrGT5a8_xmoJq9esj4XD6XbHvK2k2VNtQbxg=w1253-h939-no)

Troisieme etape : Utiliser plusieurs api public fournissant des informations sur Star Wars
Il s'agit principalement de cette api : Swapi.co/API
Elle founi des details sur de nombreux elements de la saga et il y a meme les clients pour plusieurs languages different.
C'est Evelina qui a créé le client F#.

Pour cela elle a utilisé une fonctionnalité tres puissante de F# les TypeProvider.
Une simple reference vers le package JsonProvider ont crée deux constante contenant une json d'exemple : un avec les champs minimun et l'autre complet et le provider se charge de créer dynamiquement un modele.

Elle a completé sa demo en croisant des donnees recuperer de IMDB tout en utilisant la meme technique mais un provider different 'HtmlProvider' qui est lui capable de recuperer un tableau de donnees pour notre exemple.

![](https://lh3.googleusercontent.com/iagfiembbcYXdck07pkUVfk-M51wRVZORV0u9Rx7fC70cmODJSDYw_yDT_h36brGcNoihErEA6YQLSPATmRGiqoCssPBsJRvwe-oNI8Va-Tmos5sW64npPugBK-vKTNR0JwC3Jb-b4To1tat1SVIdSni4Rjpm5lZCB_ttAvrYEnEVF_lXJ3xjeVRGIJl_0Ie8t2MElAdty13MU8cMVfGMxVLuL4-WECit-kXa8tFJURdQT6Axoz2LtuzcNXLXQ5oPQ7oQlCKTcFL6uvCFhayeMmMMksFeRuhfsg4aCnRKeKn6yui3IaBElTwbwZPVe41QnuJ6SeqJcxttkV6kB2nxMUCodmY8umE4EImAslcNmbDscNoCtlmYDHy5ss1fAawnHxMgFIj5vkCcFe4E9l-inRzwQx3BvpqVb26IUajOYF5-Wa6boUC_c2Xb0z0Dxdc07XnAnh-gxOC-kdwGaKqiK3ebkVdja2qFmx4FDQw_n1VnCwZt_3vm9yGxijKj6-b79gsY51bCoKeSpo3MLpbvAjI-w-jwuAKO6Ykrzt4ihHWS5xmS77hX-FUoPmVaChiXsqNlzzC7kEIUEwtkFQfRxv4wlSeXvjhsOmdHln8hoqY2DhooNU1IndJ-Xkz7E2tHjx2GnMUpi6dpPWykGFLXvu1V19_H05wu7k4l0BaOQ=w1253-h939-no)

Pour tous les details rendez-vous sur son blog : [http://evelinag.com/blog/2016/01-25-social-network-force-awakens/](http://evelinag.com/blog/2016/01-25-social-network-force-awakens/)

Que faut il retenir de tout ça. Plusieurs points sont interressant a garder en tete :
- F# permet de tres vite et avec peu de code prototyper l'analyse de donnees.
les Type Provider et les notebooks sont aussi d'une grande aide.

- Commencer par analyser un ensemble connu avec de se lancer sur des analyses a grande echelle.
Bien que le dommaine lié a Star Wars peu paraitre geek, c'est surtout un domaine trés bien connu, et cela permet de s'apercevoir rapidement des résultat incoherent. 


Type proviseur

Jsonprovider from fsharp.Data

Htmlprovider

Rprovider igraph

Fsharp is good for analizing data quickly



---

## Gien Verschatse - Playing nice together: how to use F# in a brownfield project
###  @selketjah

![](https://pbs.twimg.com/media/C84tlSWXsAAloyH.jpg)

J'attendais cette session ave impatience. Gien développeuse Belge pour des jeux de casino en ligne. Nous a fait un retour d'experience sur son integration de développement F# au sein d'un existant en C#.

Elle a donc passé les differentes fonctionnalité qui pourvait ou nous étre utiliser depuis un programme C# voir VB.net.



---

## Krzysztof Cieslak - Hacking F# in JS ecosystem
###  @k_cieslak

![](https://lh3.googleusercontent.com/JQD8wLuV8J3aVgUMrcxxxo2zJ553i8t0Jtm-oDFuVmKgVymXc2ojnHYWdVF6eFD1LT4F4MI5BF3O_z374ab5GeKI0ljBeQkWaluP5VC5q8B92WwhdiuSB13jNloj_2oPOk2t-6WBwkckE-O1l1YCbbntb6L6BWSYXSRKiuWNqGqqGuFZ9RSE4qwEAtT3bgEqCA9cF7T2l8bsw-Zg7o6R2NemmXtEBFVDWGSoSYODxGY0FbkZU-pz2onBu9zhwdDn0OvQx3S6i42YupsaRCSNl72klYdNaKeAa3AF7dB62tdOeizhOvnctBYop26VjQ-qs-OWiDEBBUmx1dZ8ENLsru4ZKoVDXDZwV7vfubvouqIrNRLswn_oNrlBvlMwifNdhuUqnaZ91i0zMqAVE7phnAB03Wxk2D7hPl8iHp_xS-cVCvDOxGouxYDRNomC4v20xc_ldtufLZFS6OUS2la8cA3ciLT5pMq6Nzje-SQ1un4YN_gb36tD88g6Rsnu4ao_87j2WuUwJzXmFl1uIui1h_TaGiq0AlkNzcKMFMl6OS7ln8eWGo6DU05MPr86T3Dqm8JIhxwrWzBzBnR_eGsgp1WkJlGmT14FxBoOT_3MVQI2fJQdivibM5yyqvB39suRVoUSPlDSrcSpzw-FqR_duOx2ZVfUx1F5zR3VVazp2g=w1253-h939-no)

Dans cette session Krzysztof nous présente le denier bébé a la mode dans la communauté FSharp `Fable`.
Fable est un compilateur F# vers javascript qui s'appuie sur le transcripleur Babel.

Fable va prendre votre code F# en extraire un AST et le fournir a Babel qui fait le reste du travail.

On peut alors se poser la question : Mais pourquoi ? 
La réponse simple serait parce que on peut ! ou encore pourquoi pas !

Mais il y a de vrais avantages a utiliser F# comme langage pricipal :
- approche functionnel
- Fortement typé : Record type et Union Type
- toutes les fonctionnalité avancées : pattern matching, Computation Expression
- Réutilisation coté serveur possible
- Pragmatique
- Communauté

Il nous a ensuite présenté l'outil a travers plusieurs demos dans le navigateur avec du JS très simple mais aussi une démo react.

Il faut aussi savoir que Fable va permetre la generation de sourcemap il est donc possible de debuguer le code F# depuis la fenetre de DevTool de Chrome !

La derniere verison de Fable est utilisable depuis la cli dotnet et permet donc d'initialiser rapidement un projet en une seul ligne de commande.

ts2fable

Vous trouverez plus d'information et de démos sur le site officiel ici : Fable.io

---

## Mathias Brandewinder - Serverless F# with Azure Functions: fsibot goes nano-services
### @brandewinder



---


