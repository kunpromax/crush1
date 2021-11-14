    $(document).ready(function() {
    // process bar
    setTimeout(function() {
        firstQuestion();
        $('.loading').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init() {
    document.getElementById('tenweb').innerHTML = configLoi.tenweb
    $('#title').text(configLoi.title)
    $('#desc').text(configLoi.desc)
    $('#ok').text(configLoi.btnOk)
    $('#eo').text(configLoi.btnEo)

    var xYes = (0.9 * $(window).width() - $('#ok').width() - $('#eo').width()) / 2;
    var xNo = xYes + $('#ok').width() + 0.1 * $(window).width();
    var y = 0.75 * $(window).height();
    $('#ok').css("left", xYes);
    $('#ok').css("top", y);

    $('#eo').css("left", xNo);
    $('#eo').css("top", y);
}

function firstQuestion() {
    $('.crush-content').hide();
    Swal.fire({
        title: configLoi.introTitle,
        text: configLoi.introDesc,
        imageUrl: 'https://dinhkaito.github.io/Crush/img/logi.gif',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("https://dinhkaito.github.io/Crush/img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: configLoi.btnIntro
    }).then(function() {
        $('.crush-content').show(200);
    })
}

// switch button position
function switchButton() {
    var leftNo = $('#eo').css("left");
    var topNO = $('#eo').css("top");
    var leftY = $('#ok').css("left");
    var topY = $('#ok').css("top");
    $('#eo').css("left", leftY);
    $('#eo').css("top", topY);
    $('#ok').css("left", leftNo);
    $('#ok').css("top", topNO);
}
// move random button position
function moveButton() {
    var x = Math.random() * ($(window).width() - $('#eo').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#eo').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#eo').css("left", left);
    $('#eo').css("top", top);
}

init()

var n = 0;
$('#eo').mousemove(function() {
    if (Math.random() < 0.5 || n == 1)
        switchButton();
    else
        moveButton();
    n++;
});
$('#eo').click(() => {
    if (screen.width >= 900)
        switchButton();
})

// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + configLoi.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// show popup
$('#ok').click(function() {
    Swal.fire({
        title: configLoi.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='why'>",
        background: '#fff url("https://dinhkaito.github.io/Crush/img/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("https://dinhkaito.github.io/Crush/img/giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: configLoi.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: configLoi.btnAccept,
                background: '#fff url("https://dinhkaito.github.io/Crush/img/iput-bg.jpg")',
                title: configLoi.mess,
                text: configLoi.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = configLoi.messLink;
                }
            })
        }
    })
})
