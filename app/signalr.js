import { appconfig } from './config';
import $ from 'jquery';
window.jQuery = $;
require('ms-signalr-client');

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
            .done(function () { console.log('Signalr now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Signalr could not connect'); });

        connection.disconnected(function () {
            setTimeout(function () {
                this.connect(callback);
            }, 5000); // Restart connection after 5 seconds.
        });
    }
}