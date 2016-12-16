angular.module("directives",[]).directive("datetimepicker",function(){
    return {
        restrict: "EA",   //指令作用范围是element或attribute
        require : "ngModel",  //控制器是指令标签对应的ngModel
        link: function (scope, element, attrs, ctrl) {

            var unregister = scope.$watch(function(){               //关键点，下面详述

                $(element).append("<input id='date-"+attrs.dateid+"' style='border:none;width:100%' value='"+ctrl.$modelValue+"'>"); //template用不好，于是用这个笨办法加上input标签

                element.on('change', function() {  //注册onChange事件，设置viewValue
                    scope.$apply(function() {
                        ctrl.$setViewValue($("#date-"+attrs.dateid).val());
                    });
                });

                element.on('click',function(){    //click触发日期框
                    $("#date-"+attrs.dateid).datetimepicker({ 
                        format : attrs.format || 'Y/m/d h:i',   //格式
                        onClose : function(){                   //关闭日期框时手动触发change事件
                            element.change();
                        }
                    });
                });

                element.click();        //第一次绑定事件，模拟一次click，否则肯能要点两下才会出日期框

                return ctrl.$modelValue;
            }, initialize);

            function initialize(value){  //下面再说
                ctrl.$setViewValue(value);
                unregister();
            }
        }
    }
});