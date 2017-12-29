---
layout: post
title: Obtenir un site performant avec Accelerated Mobile Page et Progressive Web App 
date: 2016-10-24
author: evilz
comments: true
tags: [dotnet, Informatique]
feature: https://farm5.staticflickr.com/4597/27565105059_9daa9856aa_n.jpg
---

Obtenir un site performant avec Accelerated Mobile Page et Progressive Web App



**http://www.evilznet.com/2016/06/17/PrivateEye-Profiling-as-Code/**

before

Normal
74 requests | 1.3 MB  transferred | Finish 15.00s | DOMContentLoaded: 1.98s | Load: 3.25s


fast 3G
74 requests | 1.3 MB  transferred | Finish 11.97s | DOMContentLoaded: 3.67s | Load: 8.04s

slow 3G

74 requests | 1.3 MB  transferred | Finish 1min | DOMContentLoaded: 12.85s | Load: 28.75s


## AMP

Normal
14 requests | 409KB  transferred | Finish 1.98s | DOMContentLoaded: 536ms | Load: 1.86s


fast 3G
14 requests | 409KB  transferred | Finish 4.40s | DOMContentLoaded: 1.46s | Load: 4.27s

slow 3G

14 requests | 409 KB transferred | Finish 14.15s | DOMContentLoaded: 3.07s | Load: 14.16s

## AMP + PWA + CLoudfare
Normal
16 requests | 395KB  transferred | Finish 2.38s | DOMContentLoaded: 932ms | Load: 2.15s


fast 3G
16 requests | 395KB  transferred | Finish 4.41s | DOMContentLoaded: 1.15s | Load: 3.74s

slow 3G

16 requests | 395 KB transferred | Finish 15.45s | DOMContentLoaded: 2.72s | Load: 13.34s

