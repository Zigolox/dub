/* global musicQueue */

module.exports = {
  name: 'stop',
  description: 'Stannar botten',
  aliases: [ 'stanna', 'st' ],
  group: 'music',
  usage: 'stop',
  serverOnly: true,
  adminOnly: false,
  execute( message, args ) {
    if ( message.guild.voiceConnection ) {
      global.musicQueue = [];
      message.guild.voiceConnection.disconnect();
      message.reply( 'stoppar botten' );
    } else message.reply( 'kan inte stanna botten då botten inte spelar något' );
  },
};