/* global config */

const prefix = config.prefix[ 0 ];

module.exports = {
  name: 'help',
  description: 'Listar alla tillgängliga kommandon.',
  aliases: [ 'commands', 'command', 'hjälp', 'kommando', 'kommandon' ],
  group: 'misc',
  usage: 'help <command>',
  example: 'help play',
  serverOnly: false,
  adminOnly: false,
  execute( message, args ) {
    const data = [];
    const listFormatting = {};
    let groups = [];
    const { commands } = message.client;

    if ( !args.length ) {
      data.push( 'Här är en lista av alla kommandon jag kan göra:' );
      commands.map( function ( command ) {
        if ( !listFormatting[ command.group ] ) listFormatting[ command.group ] = [];
        listFormatting[ command.group ].push( `**${command.name}**: *${command.description}*` );
      } );

      groups = Object.keys( listFormatting ).sort();
      for ( let group of groups ) {
        data.push( `\n__**${group}:**__` );
        listFormatting[ group ].forEach( command => data.push( command ) );
      }

      data.push( `\ndu kan använda \`${prefix}help <kommando namn>\` för att få mer info om ett specifikt kommando!` );

      return message.reply( data, { split: true } );
    } else {
      const name = args[ 0 ].toLowerCase();
      const command = commands.get( name ) || commands.find( c => c.aliases && c.aliases.includes( name ) );

      if ( !command ) {
        return message.reply( 'that\'s not a valid command!' );
      }

      data.push( `\n**namn:** ${command.name}` );

      if ( command.aliases ) data.push( `**alias:** ${command.aliases.join(', ')}` );
      if ( command.description ) data.push( `**beskrivning:** ${command.description}` );
      if ( command.usage ) data.push( `**användning:** \`${prefix}${command.usage}\`` );
      if ( command.example ) data.push( `**exempel:** \`${prefix}${command.example}\`` );

      message.reply( data, { split: true } );
    }
  },
};