var web3;

$(function() {
	var Web3 = require('web3');
    web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.51:8545"));
    web3.eth.defaultAccount = web3.eth.coinbase;
    console.log('Web3 initialization succeeded.');
	console.log('Current Balance: '+watchBalance(web3));
})

function watchBalance() {
    var coinbase = web3.eth.coinbase;

    var originalBalance = web3.eth.getBalance(coinbase).toNumber();
    return originalBalance;
}

function getShareTrading() {
	var ShareTrading = web3.eth.contract([{"constant":false,"inputs":[{"name":"buyer","type":"address"},{"name":"seller","type":"address"},{"name":"share","type":"uint256"}],"name":"Trade","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"owner2","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"share","type":"uint256"}],"name":"Subscribe","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner1","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalshare","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"publisher","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"share1","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"share2","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"pub","type":"address"},{"name":"ts","type":"uint256"},{"name":"pri","type":"uint256"},{"name":"desc","type":"bytes32"}],"name":"Publish","outputs":[],"type":"function"}]);
	var sharetrading = ShareTrading.at("0x2efd615d16e85cdd72eb38df7a2f22f1a2913953");
	return sharetrading;
}

function getBalance() {
	var address = $('#address').val();
	var res = web3.eth.getBalance(address);
	$('#person_res1').val(res);
	return false;
}

function publicShare() {
	var sharetrading = getShareTrading();
	var propertyname = $('#propertyname').val();
	var publisher = $('#publisher').val();
	var totalshare = $('#totalshare').val();
	var price = $('#price').val();
	sharetrading.Publish(publisher,parseInt(totalshare),parseInt(price),propertyname);
	console.log('Publish succeeded.');
	return false;
}

function getPropertyInfo() {
	var sharetrading = getShareTrading();
	console.log('Property info got.');
	$('#propertyname').val((sharetrading.description()));
	$('#publisher').val(sharetrading.publisher());
	$('#totalshare').val(sharetrading.totalshare());
	$('#price').val(sharetrading.price());
	var owner1 = sharetrading.owner1();
	var owner2 = sharetrading.owner2();
	var share1 = sharetrading.share1();
	var share2 = sharetrading.share2();
	var info_res1 = 'OwnerList\n';
	if(share1 > 0) {
		info_res1 += 'Owner: '+owner1+', Share: '+share1+'\n';
	}
	if(share2 > 0) {
		info_res1 += 'Owner: '+owner2+', Share: '+share2+'\n';
	}
	$('#info_res1').val(info_res1);
	return false;
}

function buyShare() {
	var sharetrading = getShareTrading();
	var buyer = $('#buyer').val();
	var share = $('#share').val();
	console.log('['+buyer+'] bought '+share+' shares.');
	sharetrading.Subscribe(buyer,parseInt(share));
	return false;
}

function tradeShare() {
	var sharetrading = getShareTrading();
	var seller = $('#seller').val();
	var buyer = $('#buyer').val();
	var share = $('#share').val();
	console.log(share+' shares traded from ['+seller+'] to ['+buyer+'].');
	sharetrading.Trade(buyer,seller,parseInt(share));
	return false;
}