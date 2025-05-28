export const cookies = () => {
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options) {
        options = options || {};
        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function deleteCookie(name) {
        setCookie(name, "", {
            expires: -1
        });
    }

    var noticed = getCookie('cookie_notice');
    if (typeof noticed === 'undefined' || noticed != 1) {
        var noticeDiv = document.createElement('div');
        noticeDiv.classList.add('cookie', 'hidden');
        noticeDiv.innerHTML =
            '<div class="cookie__container">' +
            '<div class="row">' +
            '<div class="col-md-4 offset-md-2">' +
            '<button class="cookie__btn btn btn-white icon-clear">НАШ САЙТ ИСПОЛЬЗУЕТ COOKIE</button>' +
            '</div>' +
            '</div>' +
            '</div>';

        document.body.appendChild(noticeDiv);
        noticeDiv.classList.remove('hidden');

        document.querySelector('.cookie__btn').addEventListener('click', function () {
            setCookie('cookie_notice', 1, { expires: 180 * 24 * 60 * 60, path: '/' });
            noticeDiv.classList.add('hidden');
        });
    }
}