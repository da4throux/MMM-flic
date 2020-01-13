/* Flic Button Module */

/* Magic Mirror
 * Module: MMM-flic
 *
 * By da4throux
 * MIT Licensed.
 */
 
 Module.register('MMM-flic',{	
	requiresVersion: "2.1.0",
	defaults: {
    flicClientAddress: "ws://localhost:5553", //default server address from Flic HCI server
    flics: [], //possible clickType: onButtonUpOrDown, onButtonClickOrHold, onButtonSingleOrDoubleClick, onButtonSingleOrDoubleClickOrHold
    currentProfile: 0,
    profiles: ['damien', 'asako', 'default'],
	},
  
  getScripts: function() {
    return[
      this.file('fliclib.js'), //file copied from the Flic example: https://github.com/50ButtonsEach/fliclib-linux-hci as of 2020/01/13
    ]
  },

	start: function() {
    var self = this, fcc;
		Log.info('MMM-flic - Starting da4throux module: ' + this.name);
    this.client = new FlicClient(self.config.flicClientAddress);
    this.client.onReady = function() {
      Log.info('MMM-flic client started');
    
    self.config.flics.forEach( function (flic) {
      Log.info('MMM-flic - registering flic: ' + flic.bdAddr);
      Log.info(flic.events.ButtonSingleClick);
      fcc = new FlicConnectionChannel( flic.bdAddr, {
        onButtonSingleOrDoubleClickOrHold: function(clickType, wasQueued, timeDiff) {
          Log.info('MMM-flic0 - ' + flic.bdAddr + ": " + clickType + ', wasQueued: ' + wasQueued + ', timeDiff: ' + timeDiff);
          if (flic.events[clickType]) {
            Log.info('MMM-flic switching profile to: ' + flic.events[clickType].payload);
            self.sendNotification(flic.events[clickType].notification, flic.events[clickType].payload);           
          }
        }
      });
      self.client.addConnectionChannel(fcc);
    });
    };
  },
});