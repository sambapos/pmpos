import $ from 'jquery';
import jQuery from 'jquery';

const serverUrl = 'http://localhost:9000'

$.postJSON = function (url, data, callback) {
    return jQuery.ajax({
        'type': 'POST',
        'url': serverUrl + url,
        'contentType': 'application/json',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback
    });
};

function postRefresh() {
    var updateQuery = 'mutation m{postTicketRefreshMessage(id:0){id}}';
    $.postJSON('/api/graphql', { query: updateQuery });
}

export function getCategories(callback) {
    var query = getCategoriesScript();
    $.postJSON('/api/graphql', { query: query }, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.categories);
        }
    });
}

export function getMenuItems(category, callback) {
    var query = getMenuItemsScript(category);
    $.postJSON('/api/graphql', { query: query }, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.menuItems);
        }
    });
}

export function registerTerminal(callback) {
    var query = getRegisterTerminalScript();
    $.postJSON('/api/graphql', { query: query }, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.terminalId);
        }
    });
}

export function createTerminalTicket(terminalId, callback) {
    var query = getCreateTerminalTicketScript(terminalId);
    $.postJSON('/api/graphql', { query: query }, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function clearTerminalTicketOrders(terminalId, callback) {
    var query = getClearTerminalTicketScript(terminalId);
    $.postJSON('/api/graphql', { query: query }, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function closeTerminalTicket(terminalId, callback) {
    var query = getCloseTerminalTicketScript(terminalId);
    $.postJSON('/api/graphql', { query: query }, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.errorMessage);
        }
    });
}

export function getTerminalExists(terminalId, callback) {
    var query = getGetTerminalExistsScript(terminalId);
    $.postJSON('/api/graphql', { query: query }, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.result);
        }
    });
}

export function getTerminalTicket(terminalId, callback) {
    var query = getGetTerminalTicketScript(terminalId);
    $.postJSON('/api/graphql', { query: query }, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function addOrderToTicket(ticket, menuItem, quantity = 1, callback) {
    var query = getAddOrderToTicketQuery(ticket, menuItem, quantity);
    console.log(query);
    $.postJSON('/api/graphql/', { query: query }, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function addOrderToTerminalTicket(terminalId, menuItem, quantity = 1, callback) {
    var query = getAddOrderToTerminalTicketScript(terminalId, menuItem);
    console.log(query);
    $.postJSON('/api/graphql/', { query: query }, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

function getCategoriesScript() {
    return '{categories:getMenuCategories(menu:"Menu"){id,name,color}}';
}

function getMenuItemsScript(category) {
    return `{menuItems:getMenuItems(menu:"Menu",category:"${category}"){id,name,color}}`
}

function getRegisterTerminalScript() {
    return 'mutation m{terminalId:registerTerminal(terminal:"Server",department:"Restaurant",user:"Administrator",ticketType:"Ticket")}';
}

function getCreateTerminalTicketScript(terminalId) {
    return `mutation m{
            ticket:createTerminalTicket(terminalId:"${terminalId}")
        ${getTicketResult()}}`;
}

function getGetTerminalTicketScript(terminalId) {
    return `mutation m{
            ticket:getTerminalTicket(terminalId:"${terminalId}")
        ${getTicketResult()}}`;
}

function getClearTerminalTicketScript(terminalId) {
    return `mutation m{
            ticket:clearTerminalTicketOrders(terminalId:"${terminalId}")
        ${getTicketResult()}}`;
}

function getCloseTerminalTicketScript(terminalId) {
    return `mutation m{
            errorMessage:closeTerminalTicket(terminalId:"${terminalId}")}`;
}

function getGetTerminalExistsScript(terminalId) {
    return `mutation m{
            result:getTerminalExists(terminalId:"${terminalId}")}`;
}

function getAddOrderToTerminalTicketScript(terminalId, menuItem) {
    return `mutation m{
            ticket:addOrderToTerminalTicket(terminalId:"${terminalId}",
            menuItem:"${menuItem}")
        ${getTicketResult()}}`;
}

function getTicketResult() {
    return `{id,uid,type,number,date,totalAmount,remainingAmount,
  states{stateName,state},
  tags{tagName,tag},
	orders{
    id,
    uid,
    name,
    quantity,
    portion,
    price,
    priceTag,
    calculatePrice,
    increaseInventory,
    decreaseInventory,
    tags{
      tag,tagName,price,quantity,rate,userId
    },
    states{
      stateName,state,stateValue
    }}
}`;
}

function getAddOrderToTicketQuery(ticket, menuItem, quantity = 1) {
    var {totalAmount, remainingAmount,...ticket2} = ticket;
    var ticketStr = JSON.stringify(ticket2);
    ticketStr = ticketStr.replace(/\"([^(\")"]+)\":/g, '$1:');

    return `
mutation m{ticket:addOrderToTicket(
  ticket:${ticketStr},menuItem:"${menuItem}",quantity:${quantity}
){id,uid,type,number,date,totalAmount,remainingAmount,
  states{stateName,state},
	orders{
    id,
    uid,
    name,
    quantity,
    portion,
    price,
    calculatePrice,
    increaseInventory,
    decreaseInventory,
    tags{
      tag,tagName,price,quantity,rate,userId
    },
    states{
      stateName,state,stateValue
    }}
}}`;
}