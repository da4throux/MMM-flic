# MMM-flic
MagicMirror MichMich module to leverage [Flic button](https://flic.io/) actions to broadcast notifications

# Presentation
Module currently handles, the classic flic event: single click, doubel click and hold.
Each of those events can trigger a specific notification with a specific payload defined in its configuration file.
To use this module, installation of the flic Linux HCI server is required.
Basic use case: click on flic and the layout of the MMM automatically change.

# Install
0. clone the MMM-flic module in the MMM - modules directory & run ```npm install```
1. find instruction from: https://github.com/50ButtonsEach/fliclib-linux-hci/ and clone the project
2. install & start daemon using: https://github.com/50ButtonsEach/fliclib-linux-hci/tree/master/bin/armv6l (for Raspberry pi): follow the instructions carefully - no other bluetooth as is can be used. Typically: ```./flicd -f flic.sqlite3```
3. ```make``` and start the simpleclient to setup your flics: https://github.com/50ButtonsEach/fliclib-linux-hci/tree/master/simpleclient (this probably could be done directly with the websocket client/server though, but the interaction is simplified), Typically: ```./simpleclient localhost```
4. not the list adresses of all the flic buttons you will want in the configuration (example: 80:e4:da:76:a5:09)
5. stop simpleClient, ```make``` & start the websocket server: https://github.com/50ButtonsEach/fliclib-linux-hci/tree/master/clientlib/websocket/server, typically: ``` ./websocketproxy localhost 5551 127.0.0.1 5553``` (by default module is expecting the websocket interface on the localhost on port 5553)
6. copy fliclib.js from https://github.com/50ButtonsEach/fliclib-linux-hci/tree/master/clientlib/websocket/client to the MMM-flic module directory (quick & dirty)
7. add the MMM-flic module to the MMM config:
```
    {
      module: "MMM-flic",
      config: {
        flics : [
          {
            bdAddr: '80:e4:da:76:a5:09',  
            events: {
              ButtonSingleClick: {
                notification: 'CURRENT_PROFILE',
                payload: 'damien',
              },
              ButtonDoubleClick: {
                notification: 'CURRENT_PROFILE',
                payload: 'asako',
              },
              ButtonHold: {
                notification: 'CURRENT_PROFILE',
                payload: 'default',
              },
            },
          }
        ],
      },
      classes: 'everyone default'
    },
```
8. if you want to use MMM-flic to change profile, if not already done, install [MMM-ProfileSwitcher](https://github.com/tosti007/MMM-ProfileSwitcher) to leverage the profile change notification.

# Roadmap
. Investigating leveraging a hub running on the network instead of having to start a server and register the flic button on it
. Share a script to start what is needed (server, websocket server in particular)
. setup a rotating profile (one click browing through a list the different), instead of acting a specific type of click to a specific profile

# v0.1.2
