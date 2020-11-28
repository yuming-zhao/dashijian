$(function(){
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd:function(value){
        if(value===$('[name=oldPwd]').val()){
            return '新旧密码不能为空'
        }
        },
        rePwd:function(value){
            if(value!==$('[name==rePew]').val()){
                return '两次密码不一致'
            }      
        }
    } 
    )
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:$('.layui-form').serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layui.layer.smg('修改密码失败')
                }
                layui.layer.smg('修改密码成功')
                $('.layui-form')[0].reset();
            }
            
        })
    })
    
})