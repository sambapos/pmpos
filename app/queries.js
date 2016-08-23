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

function getCategoriesScript() {
    return '{categories:getMenuCategories(menu:"Menu"){id,name,color}}';
}

function getMenuItemsScript(category) {
    return `{menuItems:getMenuItems(menu:"Menu",category:"${category}"){id,name,color}}`
}

function getAddOrderToTicketQuery(ticket, menuItem, quantity = 1) {
    var {totalAmount,remainingAmount,...ticket2} = ticket;
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