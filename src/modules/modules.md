# Modules

## Presentation

TCS uses modules, which are "scripts" that depends on the core. They can be directly loaded in this directory (`modules/`) or with another resource.

You can edit the configuration of TCS to able or disable the versionning check for the modules.

> By default, versionning check is set to **true**

## Module creation

Each module has to

## Local modules

TCS Core scripts handles client and server files by their names. If you plan to integrate your module in the `modules/` folder, you have to follow thes instructions :

- Use `cli_` prefix on the file name for client only files
- Use `mixed_` prefix on the file name for client AND server files (moduleInfos should be mixed)
- Use `srv_` prefix on the file name for server only files
