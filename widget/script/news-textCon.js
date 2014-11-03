apiready = function(){
	var newsId = api.pageParam.newsId;
	
	var model = api.require('model');
    var query = api.require('query');
    
    api.showProgress({
        title: '加载中...',
        modal: false
    });
    
    query.createQuery(function(ret, err) {
    	if (ret && ret.qid) {
            var queryId = ret.qid;
            query.whereEqual({qid: queryId, column: 'id', value: newsId});
            model.findAll({class:"news", qid:queryId}, function(ret, err){
                if(ret){
//                  alert(JSON.stringify(ret));

                    var content = $api.byId('content');
                    var tpl = $api.byId('news-template').text;
                    var tempFn = doT.template(tpl);
                    content.innerHTML = tempFn(ret);

                    api.hideProgress();
                    api.parseTapmode();
                }else{
                    // alert(JSON.stringify(err));
                }
            });
        }
    });
    
};


