var userId = "";
var secret = "";

var itemInfo = [{},
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    },
    {
        quote: "Congratulations to President Putin and Russia for putting on a truly great World Cup Tournament -- one of the best ever!"
    }
];

$(document).ready(function() {
    $(".sidenav").sidenav();

    chrome['storage'].sync.get(["settings"], function(result) {

        if (typeof result.settings === "undefined") {
            var settings = {
                item: true,
                weather: true,
                dateTime: true
            };
            $(".footer-itemInfo").css("visibility", "visible");
            $(".switch-check-item").attr("checked", "true");
            $(".footer-itemWeather").css("visibility", "visible");
            $(".switch-check-weather").attr("checked", "true");
            $(".footer-itemDateTime").css("visibility", "visible");
            $(".switch-check-dateTime").attr("checked", "true");

            chrome['storage'].sync.set({
                settings: settings
            }, function() {});
        } else {
            if (result.settings) {
                if (result.settings.item) {
                    $(".footer-itemInfo").css("visibility", "visible");
                    $(".switch-check-item").attr("checked", "true");
                }
                if (result.settings.weather) {
                    $(".footer-itemWeather").css("visibility", "visible");
                    $(".switch-check-weather").attr("checked", "true");
                }
                if (result.settings.dateTime) {
                    $(".footer-itemDateTime").css("visibility", "visible");
                    $(".switch-check-dateTime").attr("checked", "true");
                }
            }
        }
    });

});

chrome['storage'].local.get(["userId", "secret"], function(items) {
    if (items.userId !== undefined) {
        userId = items.userId;
    }
    if (items.secret !== undefined) {
        secret = items.secret;
    }
});

function getQueryParams() {
    var queryStringObject = {
        uid: userId,
        b: "chrome",
        bv: /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1],
        source: 2,
        themeIndex: 400,
        secret: secret
    };
    return $.param(queryStringObject);
}

$(".switch-check").click(function(event) {
    var settings = {};
    var key = $(this).attr("name");
    var value = $(this).prop("checked");

    if (value == true) {
        var selector = ".footer-" + key;
        $(selector).css("visibility", "visible");
    } else {
        var selector = ".footer-" + key;
        $(selector).css("visibility", "hidden");
    }

    chrome.storage.sync.get(["settings"], function(result) {
        result.settings[key] = value;
        chrome.storage.sync.set({
            settings: result.settings
        }, function() {});
    });
});

$(document).ready(function() {
    $(".sidenav").sidenav();

    var index = Math.floor(Math.random() * 23) + 1;

    var bg_img = "/img/bg" + index + ".jpg";

    $(".itemInfo-name").html(itemInfo[index].quote);
    $("body").css({
        background: "url(" + bg_img + ") no-repeat center center fixed",
        "background-size": "cover"
    });

    function updateDateTime() {
        var date = new Date(),
            locale = "ru";
        var localizedDate = date.toLocaleString(locale, {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        var hour = date.getHours();
        var min = date.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }

        $(".infoTime").html(hour + ":" + min);
        $(".infoDate").html(localizedDate);

        setTimeout(updateDateTime, 1000);
    }

    setTimeout(updateDateTime, 100);
});

$(".shuffle").click(function() {
    var index = Math.floor(Math.random() * 23) + 1;

    var bg_img = "/img/bg" + index + ".jpg";

    $("body").css({
        background: "url(" + bg_img + ") no-repeat center center fixed",
        "background-size": "cover"
    });
    $(".itemInfo-name").html(itemInfo[index].quote);
});

$("#search").keyup(function(event) {
    var query = $(this).val();

    if (event.which == 13) {
        var url =
            "https://www.google.com/search?q=" +
            query +
            "&" +
            getQueryParams();
        window.location.href = url;
    }
});