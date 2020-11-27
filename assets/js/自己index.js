
    $(function(){
    getUserInfo()
    function getUserInfo() {
        $.ajax({
          method: 'GET',
          url: '/my/userinfo',
          success: function(res) {
            if (res.status !== 0) {
              return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            console.log(res);
            renderAvatar(res.data)
          }
        })
      }
    $('#here').on('click',function(){
      layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token');
        location.href='login.html';
        layer.close(index);
      });
    })
    function renderAvatar(uerInfo){
        var name =uerInfo.nickname ||uerInfo.username;
        $("#welcome").html("欢迎"+name);
        if(getUserInfo.user_pic==null){
          $(".layui-nav-img").hide();
          $(".text-avatar").show().html(name[0].toUpperCase());
        }else{
          $(".layui-nav-img").show();
          $(".text-avatar").hide();
        }
    }

    })
    