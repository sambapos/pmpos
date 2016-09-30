import $ from 'jquery';
window.jQuery = $;
require('ms-signalr-client');
import {appconfig} from './config';

var config = appconfig();

export default class {
    static connect(callback) {
        var connection = $.hubConnection(config.SIGNALRserv);
        var proxy = connection.createHubProxy('default');

        // receives broadcast messages from a hub function, called "broadcastMessage"
        proxy.on('update', function (message) {
            console.log(message);
            if (callback) callback(message);
        });

        // atempt connection, and handle errors
        connection.start({ jsonp: true })
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
    }
}