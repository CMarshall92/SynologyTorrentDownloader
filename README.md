# Synology Torrent Downloader
This is a simple grouping of client apps and a deployable cloud function, which makes downloading torrent files via `Download Station` easier than having to login to your synology network storage everytime.

simply login to the cloud function once per session and add as many torrent magnet links to download station from either your mobile via the `react native mobile (ios & android)` of `electron desktop` app.

Follow the instructions below to run each of the services in developer mode.

# Install Project Dependencies

With one command you will be able to install all the projects dependencies.
When your ready run the following command.

```
yarn install && yarn install:all
```

Once complete you will be able to follow the sections below to start up the projects you would like to develop.

# Desktop Client
[![](https://markdown-videos.deta.dev/youtube/etta_CrPnmQ)](https://youtu.be/etta_CrPnmQ)

### Run Desktop Environment

First you will need to run the following, Please note you will need both the android simulator & ios simulator installed

```
yarn start:backend
```

This will launch the following `cloud function`, the `android simulator` and the `ios simulator`.

You can just minimise or close the simulators if you dont plan on developing the mobile versions.

After the backends up and running you will want to call the next command in a new terminal tab.

```
yarn start:desktop
```

# Mobile Android Client

TBC

# Mobile IOS Client

TBC
