$(function() {
    // sec2 메뉴 클릭
    $('.secmenu').click(function() {
        let no = $('.secmenu').index(this); // 버튼 순서만 카운트

        $('.mainlist').hide();
        $('.mainlist').eq(no).show();

        $('.secmenu').removeClass('active');
        $(this).addClass('active');
    });

    // 데스크탑용 메뉴 hover
    $('#navi2').mouseenter(function() {
        if ($(window).width() > 700) {
            $('#subback').stop(true, true).slideDown(300);
            $('.subul').stop(true, true).slideDown(300);
            $('#naviline').stop(true, true).slideDown(200);
        }
    });

    $('#navi2, #subback').mouseleave(function() {
        if ($(window).width() > 700) {
            $('#subback').stop(true, true).slideUp(300);
            $('.subul').stop(true, true).slideUp(300);
            $('#naviline').stop(true, true).slideUp(200);
        }
    });

    // 모바일 햄버거 메뉴
    $('#hamburger').click(function() {
        $('#navi2').toggleClass('active');
    });

    // 모바일용 서브메뉴 토글
    $('.menu2').click(function() {
        if ($(window).width() <= 700) {
            $(this).next('.subul').slideToggle(200);
        }
    });

    // 슬라이드 next
    function next($target) {
        let w = $target.find('.seclist2').outerWidth(true);
        $target.stop().animate({'marginLeft': -w}, 500, function() {
            $target.append($target.find('.seclist2:first'));
            $target.css({'marginLeft': '0'});
        });
    }

    // 슬라이드 prev
    function prev($target) {
        let w = $target.find('.seclist2').outerWidth(true);
        $target.prepend($target.find('.seclist2:last'));
        $target.css('marginLeft', -w);
        $target.stop().animate({'marginLeft': '0'}, 500);
    }

    // 화살표 클릭 이벤트
    $('.righticon').click(function() {
        let $mainlist = $(this).closest('.mainlist');
        let $secul = $mainlist.find('ul.secul');
        if (!$secul.is(':animated')) next($secul);
    });

    $('.lefticon').click(function() {
        let $mainlist = $(this).closest('.mainlist');
        let $secul = $mainlist.find('ul.secul');
        if (!$secul.is(':animated')) prev($secul);
    });
});

//타이틀,페이지네이션 전환용
let slideNo = 0;

function slide(no) {
    slideNo += no;

    if(slideNo > 2) slideNo = 0;
    if(slideNo < 0) slideNo = 2;

    //모든 타이틀 숨긴 후, 현재 번째 타이틀 보이기
    $('.title').hide();
    $('.title').eq(slideNo).show();

    //하단 진행율 표시 막대 크기 변경
    $('.page').css({ 'opacity':'0.3' });
    $('.page').eq(slideNo).css({ 'opacity':'1'});
}



//다음 버튼용 슬라이드
function next() { 
    $('#slideBox').stop().animate({'marginLeft':'-100%'},1500,function(){
        $('.slide:first').appendTo('#slideBox');
        $('#slideBox').css('marginLeft','0');
    });
}

//이전 버튼용 슬라이드
function prev() {
    $('.slide:last').prependTo('#slideBox');
    $('#slideBox').css('marginLeft','-100%');
    $('#slideBox').stop().animate({'marginLeft':'0'},1500);
}

//자동 슬라이드
let play;

function playSlide() {
    play = setInterval('next(); slide(1)', 4000);
}

//자동 슬라이드 중지
function stopSlide() {  clearInterval(play);  }

$(function(){     //페이지가 열린 후,

    playSlide();    //슬라이드 동작

    $('.slideLeft').click(function(){     //이전 버튼 클릭
        if( !$('#slideBox').is(':animated') ) {
            prev();     //이전 슬라이드로 이동
            slide(-1);
        }
    });

    $('.slideRight').click(function(){    //다음 버튼 클릭
        if( !$('#slideBox').is(':animated') ) {
            next();     //다음 슬라이드로 이동
            slide(1);
        }
    });

    //좌우 버튼에 닿으면, 슬라이드 멈추기
    $('.slideButton').mouseenter(function(){
        stopSlide();
    });

    $('.slideButton').mouseleave(function(){
        playSlide();
    });


    //슬라이드 중지, 재생 버튼 클릭할 때
    $('.pause').click(function(){
        stopSlide();

        $('.control').removeClass('active');
        $(this).addClass('active');
    });

    $('.play').click(function(){
        playSlide();

        $('.control').removeClass('active');
        $(this).addClass('active');
    });
});      //$(function() 끝

