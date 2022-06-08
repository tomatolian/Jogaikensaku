$(function(){
    $(".reg-button").click(function(){
        chrome.storage.sync.get(['items'],function(items){
            d=$('.block').val()
            e=[]
            if (items['items']==undefined){
                items={'items':[]}
            }
            if (d.length!=0 && items.length!=0 && items['items'].indexOf(d)==-1){
                dic=[d]
                dic=dic.concat(items['items'])
                for (const item of dic){
                    $('.list').append('<div class=\'item\'><p class=\"close\">×</p><p>'+item+"</p><hr></div>")
                }
                chrome.storage.sync.set({'items':dic},function() {
                    console.log('saved')
                })
            }else if (d.length!=0 && items.length==0 && items['items'].indexOf(d)==-1){
                dic=[d]
                $('.list').append('<div class=\'item\'><p class=\"close\">×</p><p>'+item+"</p><hr></div>")
                chrome.storage.sync.set({'items':dic},function() {
                    console.log('saved')
                })
            }else if (items.length!=0){
                for (const item of items['items']){
                    $('.list').append('<div class=\'item\'><p class=\"close\">×</p><p>'+item+"</p><hr></div>")
                }
            }
        })
        $('.item').remove()
    })
    $('body').on('click','.close',function(){
        var ind=$(this).index('.close')
        console.log(ind)
        $(this).parents('.item').remove()
        chrome.storage.sync.get(['items'],function(items){
            dic=items['items']
            dic.splice(ind,1)
            chrome.storage.sync.set({'items':dic},function() {
            })
        })
    })
    $('body').on('click','.ser-button',function(){
        s=$('.search').val()
        var url='https://www.google.com/search?q='+s
        chrome.storage.sync.get(['items'],function(items){
            for (i of items['items']){
                q='+-site%3A'+i
                url+=q
                console.log(url)
            }
            chrome.tabs.create({url:url})
        })
    })
    window.onload =function(){
        chrome.storage.sync.get(['items'],function(items){
            for (const item of items['items']){
                $('.list').append('<div class=\'item\'><p class=\"close\">×</p><p>'+item+"</p><hr></div>")
            }
        })
    }
})