//RATING
$('.rating.edit .star').hover(function() {
		var block=$(this).parents('.rating');
	block.find('.rating__activeline').css({width:'0%'});
		var ind=$(this).index()+1;
		var linew=ind/block.find('.star').length*100;
	setrating(block,linew);
},function() {
		var block=$(this).parents('.rating');
	block.find('.star').removeClass('active');
		var ind=block.find('input').val();
		var linew=ind/block.find('.star').length*100;
	setrating(block,linew);
});
$('.rating.edit .star').click(function(event) {
		var block=$(this).parents('.rating');
		var re=$(this).index()+1;
		block.find('input').val(re);
		var linew=re/block.find('.star').length*100;
	setrating(block,linew);
});
$.each($('.rating'), function(index, val) {
		var ind=$(this).find('input').val();
		var linew=ind/$(this).parent().find('.star').length*100;
	setrating($(this),linew);
});
function setrating(th,val) {
	th.find('.rating__activeline').css({width:val+'%'});
}