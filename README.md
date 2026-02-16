# VsCode-Header-Generator
   
This repo contains the vsCode extension to create proper MetroV headers in vsCode
   
.hpp and .cpp files have customs template with the properly organised class and auto includes
   
Shortcut:
```
ctrl+alt+h
```

macOS:
```
cmd+alt+h
```

eg:
```
/*
    Created on: 16/02/2026
    Filename: Test.cpp
    Desription: Add simple description

    ███╗   ███╗███████╗████████╗██████╗  ██████╗ ██╗   ██╗
    ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗██║   ██║
    ██╔████╔██║█████╗     ██║   ██████╔╝██║   ██║██║   ██║
    ██║╚██╔╝██║██╔══╝     ██║   ██╔══██╗██║   ██║╚██╗ ██╔╝
    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝ ╚████╔╝
    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═══╝
*/
```

## Installation
Install from a VSIX file:

1. Download or build the `.vsix` package.
2. Open VS Code and go to the Extensions view.
3. Click the `...` (More Actions) menu.
4. Select `Install from VSIX...` and choose the file.

CLI alternative:

```bash
code --install-extension path/to/metrov-headers-0.0.1.vsix
```
