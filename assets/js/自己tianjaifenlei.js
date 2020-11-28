$(function(){
    layer =layui.layer;
    form =layui.form;
    getdata();
    function getdata(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status==0){
                    console.log(res);
                var htmlStr =template('tpl-table',res);
                $('tbody').html(htmlStr);
                }
            }
        });
    }
    // 根据Id的值获取文章分类数据,并填充到表单中
    // 未添加类别添加点击事件
    var indexEdit=null;
    $('#btnAddCate').on('click',function(){
        indexEdit =layer.open({
            type:1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
          });
         
    })
    $('body').on('submit','#form-add',function(e){
      e.preventDefault()
       $.ajax({
           method:'post',
           url:'/my/article/addcates',
           data:$(this).serialize(),
           success:function(res){
               if(res.status!==0){
                  return layer.msg('添加失败')
               }
               getdata();
               layer.msg('添加成功')
               layer.close(indexEdit)
              
           }
       })
    })
    var index= null;
    $('tbody').on('click','#btn-edit',function(){
        
        index =layer.open({
                type:1,
                title: '编辑文章分类',
                area: ['500px', '250px'],
                content: $('#dialog-edit').html()
              });
            //   获取编辑数据
        var id =$(this).attr('data-id')
        console.log(id);
       $.ajax({
           type:'get',
           url:'/my/article/cates/'+id,
           success:function(res){
                   console.log(res);
                   form.val('form-edit', res.data)
               }
       })
    })
    // 修改 编辑数据
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/article/updatecate',
            data:$('#form-edit').serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg('编辑失败,稍后重试')
                }
                layer.msg('编辑成功');
                layer.close(index);
                getdata()
            }
        })
    });
    $('tbody').on('click','.btn-delete',function(){
        var id =$(this).attr('data-id')
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type:'get',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    getdata()
                }
    
            })
           
          });
        
    })
})