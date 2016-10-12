import $ from 'jquery';
import jQuery from 'jquery';
import { appconfig } from './config';

var config = appconfig();

$.postJSON = function (query, callback) {
    var data = JSON.stringify({ query: query });
    return jQuery.ajax({
        'type': 'POST',
        'url': config.GQLurl,
        'contentType': 'application/json',
        'data': data,
        'dataType': 'json',
        'success': callback
    });
};

export function postRefresh() {
    var query = 'mutation m{postTicketRefreshMessage(id:0){id}}';
    $.postJSON(query);
}

export function getMenu(callback) {
    var query = getMenuScript();
    $.postJSON(query, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.menu);
        }
    });
}

export function getProductPortions(productId, callback) {
    var query = getProductPortionsScript(productId);
    $.postJSON(query, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.portions);
        }
    });
}

export function getProductOrderTags(productId, portion, callback) {
    var query = getProductOrderTagsScript(productId, portion);
    $.postJSON(query, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.orderTags);
        }
    });
}

export function registerTerminal(callback) {
    var query = getRegisterTerminalScript();
    $.postJSON(query, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.terminalId);
        }
    });
}

export function createTerminalTicket(terminalId, callback) {
    var query = getCreateTerminalTicketScript(terminalId);
    $.postJSON(query, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function clearTerminalTicketOrders(terminalId, callback) {
    var query = getClearTerminalTicketScript(terminalId);
    $.postJSON(query, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function closeTerminalTicket(terminalId, callback) {
    var query = getCloseTerminalTicketScript(terminalId);
    $.postJSON(query, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.errorMessage);
        }
    });
}

export function getTerminalExists(terminalId, callback) {
    var query = getGetTerminalExistsScript(terminalId);
    $.postJSON(query, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.result);
        }
    });
}

export function getTerminalTicket(terminalId, callback) {
    var query = getGetTerminalTicketScript(terminalId);
    $.postJSON(query, function (response) {
        if (response.errors) {
            //handle
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function addOrderToTicket(ticket, productId, quantity = 1, callback) {
    var query = getAddOrderToTicketQuery(ticket, productId, quantity);
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function addOrderToTerminalTicket(terminalId, productId, quantity = 1, orderTags = '', callback) {
    var query = getAddOrderToTerminalTicketScript(terminalId, productId, orderTags);
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function changeEntityOfTerminalTicket(terminalId, type, name, callback) {
    var query = getChangeEntityOfTerminalTicketScript(terminalId, type, name);
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function getEntityScreenItems(name, callback) {
    var query = getGetEntiyScreenItemsScript(name);
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.items);
        }
    });
}

export function updateOrderPortionOfTerminalTicket(terminalId, orderUid, portion, callback) {
    var query = getUpdateOrderPortionOfTerminalTicketScript(terminalId, orderUid, portion);
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function updateOrderTagOfTerminalTicket(terminalId, orderUid, name, tag, callback) {
    var query = getUpdateOrderTagOfTerminalTicketScript(terminalId, orderUid, name, tag);
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function getOrderTagsForTerminal(terminalId, orderUid, callback) {
    var query = getGetOrderTagsForTerminalScript(terminalId, orderUid);
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.orderTags);
        }
    });
}

export function getOrderTagColors(callback) {
    var query = getGetOrderTagColorsScript();
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.colors);
        }
    });
}

export function cancelOrderOnTerminalTicket(terminalId, orderUid, callback) {
    var query = getCancelOrderOnTerminalTicketScript(terminalId, orderUid);
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.ticket);
        }
    });
}

export function broadcastMessage(msg, callback) {
    var query = getPostBroadcastMessageScript(msg);
    $.postJSON(query, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.postBroadcastMessage);
        }
    });
}

function getMenuScript() {
    return `{menu:getMenu(name:"${config.menuName}"){categories{id,name,color,foreground,menuItems{id,name,color,foreground,productId,defaultOrderTags}}}}`;
}

function getProductPortionsScript(productId) {
    return `{portions:getProductPortions(productId:${productId}){id,name,price}}`;
}

function getProductOrderTagsScript(productId, portion) {
    return `{orderTags:getOrderTagGroups(productId:${productId},portion:"${portion}",hidden:false){name,tags{name}}}`;
}

function getGetOrderTagsForTerminalScript(terminalId, orderUid) {
    return `
    mutation tags{orderTags:getOrderTagsForTerminalTicketOrder(
        terminalId:"${terminalId}"
	    orderUid:"${orderUid}")
    {name,tags{caption,color,labelColor,name}}}`;
}

function getRegisterTerminalScript() {
    return `mutation m{terminalId:registerTerminal(
        terminal:"${config.terminalName}",
        department:"${config.departmentName}",
        user:"${config.userName}",
        ticketType:"${config.ticketTypeName}")}`;
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

function getUpdateOrderPortionOfTerminalTicketScript(terminalId, orderUid, portion) {
    return `mutation m {ticket:updateOrderPortionOfTerminalTicket(
        terminalId:"${terminalId}",orderUid:"${orderUid}",portion:"${portion}")
    ${getTicketResult()}}`;
}

function getUpdateOrderTagOfTerminalTicketScript(terminalId, orderUid, name, tag) {
    return `mutation m{ticket:updateOrderTagOfTerminalTicket(
        terminalId:"${terminalId}",
        orderUid:"${orderUid}",
	    orderTags:[{tagName:"${name}",tag:"${tag}"}])
    ${getTicketResult()}}`;
}

function getCancelOrderOnTerminalTicketScript(terminalId, orderUid) {
    return `mutation m{ticket:cancelOrderOnTerminalTicket(terminalId:"${terminalId}",orderUid:"${orderUid}")
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

function getAddOrderToTerminalTicketScript(terminalId, productId, orderTags) {
    return `mutation m{
            ticket:addOrderToTerminalTicket(terminalId:"${terminalId}",
            productId:${productId}
            orderTags:"${orderTags}")
        ${getTicketResult()}}`;
}

function getChangeEntityOfTerminalTicketScript(terminalId, type, name) {
    return `mutation m{
            ticket:changeEntityOfTerminalTicket(terminalId:"${terminalId}",
            type:"${type}"
            name:"${name}")
        ${getTicketResult()}}`;
}

function getGetEntiyScreenItemsScript(name) {
    return `query q{items:getEntiyScreenItems(name:"${name}"){name,caption,color,labelColor}}`;
}

function getGetOrderTagColorsScript() {
    return '{colors:getOrderTagColors{name,value}}';
}

function getTicketResult() {
    return `{id,uid,type,number,date,totalAmount,remainingAmount,
  entities{name,type},      
  states{stateName,state},
  tags{tagName,tag},
	orders{
    id,
    uid,
    productId,
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

function getPostBroadcastMessageScript(msg) {
    msg = msg.replace(/"/g, '\\"');
    return 'mutation m {postBroadcastMessage(message:"' + msg + '"){message}}';
}
