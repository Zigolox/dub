/* global include */

const version = ( include( 'package.json' ) ).version;

module.exports = {
  name: 'version',
  description: 'Anger versionen av botten',
  aliases: [],
  group: 'misc',
  usage: 'version',
  serverOnly: false,
  execute( message, args ) {
    message.reply( `den nuvarande versionen av botten är: **${version}**` );
  },
};