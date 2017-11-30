$(function () {

    function modalShow(ele) {
        $(ele).fadeIn();
        $('.mask').fadeIn();
    }

    function modalClose(ele) {
        $(ele).fadeOut();
        $('.mask').fadeOut();
    }

    // 关闭弹窗
    $('.modal-close').on('touchend', function () {
        var $modal = $(this).parents('.modal');
        modalClose($modal);
    });

    // 关闭分享弹窗
    $('.modal-share').on('touchend', function () {
        $('.mask').hide();
        $(this).hide();
    });

    // 分享弹窗show
    $('.share-btn').on('touchend', function () {
        $('.mask').show();
        $('.modal-share').show();
    });
    // // 切换动物图标
    // $('.ferris-wheel-circle div').on('touchend', function () {
    //     $('.ferris-wheel-circle div').removeClass('act');
    //     $(this).toggleClass('act');
    // });

    //活动规则
    $('.game-handle-rule').on('touchend', function () {
         modalShow('.modal-rule');
    });

    // wode 奖品
    $('.game-handle-prize').on('touchend', function () {
         modalShow('.modal-kong');
    });


    // 开始游戏
    (function () {
        // 是否在旋转标志
        var isBegin = false;

        // 可操作这个变量的值控制转盘旋转最终中奖结果
        // 详细说明请看numRand注释
        // 此变量值就代表传入numRand的值
        // 比如更改这个变量为 0 就代表 要转到大熊 更改这个变量
        var animalIndex = 1;

        // 控制要中奖动物元素
        var $thisAnimal = $('.animal').eq(0);

        /* 
         * 控制转盘旋转度数
         * 
         * numRand 返回 一个数字
         * 返回 30 代表转到大象
         * 返回 -30 代表转到小熊
         * 返回 90 代表转到鳄鱼
         * 返回 -90 代表转到小兔
         * 返回 150 代表转到熊猫
         * 返回 -150 代表转到长颈鹿
         *
         * 参数arg代表：
         * 0：代表转到大象
         * 1：代表转到小熊
         * 2：代表转到鳄鱼
         * 3：代表转到小兔
         * 4：代表转到熊猫
         * 5：代表转到长颈鹿
         *
         */
        function numRand(arg) {

            $thisAnimal = $('.animal').eq(arg);

            if (arg == 0) {
                // 匹配大象
                return 30;
            } else if (arg == 1) {
                // 匹配小熊
                return -30;
            } else if (arg == 2) {
                // 匹配鳄鱼
                return 90;
            } else if (arg == 3) {
                // 匹配小兔
                return -90;
            } else if (arg == 4) {
                // 匹配熊猫
                return 150;
            } else if (arg == 5) {
                // 匹配长颈鹿
                return -150;
            }
        }
        
        // 点击开始时执行
        function rotateRun() {
            if (isBegin) return false;
            isBegin = true;
            $('.animal').removeClass('act');

            var result = 360 * 3 + numRand(animalIndex);
            
            $('.ferris-wheel-circle').css({
                'transform': 'rotate(' + result + 'deg)',
                'transition': 'transform 6s ease'
            });
        }



        // 动画结束时执行函数 
        function rotateEnd() {
            $thisAnimal.addClass('act');
            isBegin = false;
            $('.ferris-wheel-circle').css({
                'transition': 'none'
            });
            $('.ferris-wheel-circle').css({
                'transform': 'rotate(' + numRand(animalIndex) + 'deg)'
            });

            if(animalIndex == 0) {
                $('.modal-getPrize-data').text('1G');
                 modalShow('.modal-getPrize');
            } else if (animalIndex == 1) {
                $('.modal-getPrize-data').text('150M');
                modalShow('.modal-getPrize');
            } else if (animalIndex == 2) {
                modalShow('.modal-noPrize');
            } else if (animalIndex == 3) {
                $('.modal-getPrize-data').text('30M');
                modalShow('.modal-getPrize');
            } else if (animalIndex == 4) {
                $('.modal-getPrize-data').text('2G');
                modalShow('.modal-getPrize');
            } else if (animalIndex == 5) {
                $('.modal-getPrize-data').text('500M');
                modalShow('.modal-getPrize');
            }

        };

        

        $('.game-begin-btn').on('touchend', rotateRun);

        $('.ferris-wheel-circle').on("transitionend", rotateEnd);
        $('.ferris-wheel-circle').on("webkitTransitionend", rotateEnd);

    })();
    
});