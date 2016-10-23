/***********
 * CONFIG
 **********/

export function appconfig() {
    // create Object to hold config info
    var config = {};

    // derive Server information from Address Bar
    var webHost  = location.hostname;  // myServer.com
    var webPort  = location.port;      // blank assumes port 80
    var webPath  = location.pathname;  // might be like /app/mysite/blah
    var webParm  = location.search;    // things after '?', like ?module=customer_display
    var webProto = location.protocol;  // usually http: or https:

    var webUrl   = webProto + '//' + webHost + (location.port ? ':'+location.port : '') + webPath;

    // Message Server
    var msgsrv = webHost;

    // GraphQL server
    var GQLhost = msgsrv;
    var GQLport = '9000';
    var GQLpath = '/api/graphql/';
    var GQLserv = webProto + '//' + GQLhost + ':' + GQLport;
    var GQLurl  = GQLserv + GQLpath;

    // SIGNALR server
    var SIGNALRhost = msgsrv;
    var SIGNALRport = GQLport;
    var SIGNALRpath = '/signalr';
    var SIGNALRhubs = '/signalr/hubs/';
    var SIGNALRserv = webProto + '//' + SIGNALRhost + ':' + SIGNALRport;
    var SIGNALRurl  = SIGNALRserv + SIGNALRpath;
    var SIGNALRhub  = SIGNALRserv + SIGNALRhubs;

    // Terminal settings
    var terminalName = 'Server'
    var userName = 'Admin';
    var departmentName = 'Restaurant';
    var ticketTypeName = 'Ticket';
    var menuName = 'Menu';
    var entityScreenName = 'All Tables';

    // assign some stuff to the Object
    // you can override the "auto config" here if you wish
    config.GQLserv = GQLserv;
    config.GQLurl = GQLurl;
    config.SIGNALRserv = SIGNALRserv;
    config.SIGNALRurl = SIGNALRurl;

    // the rest comes from Terminal settings (above)
    config.terminalName = terminalName;
    config.userName = userName;
    config.departmentName = departmentName;
    config.ticketTypeName = ticketTypeName;
    config.menuName = menuName;
    config.entityScreenName = entityScreenName;

    return config; // return the Object to the caller
}

