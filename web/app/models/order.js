import DS from 'ember-data';

export default DS.Model.extend({
	itemName: DS.attr('string'),
	
	createdAt: DS.attr('date'),
	
	customerName: DS.attr('string'),
	
	customerEmail: DS.attr('string'),
	
	customerPhoneNumber: DS.attr('string'),
	
	open: DS.attr('boolean'),
	
	price: DS.attr('number'),
	
	token: DS.attr('string')
});
