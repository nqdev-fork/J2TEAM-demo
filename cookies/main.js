function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Tạo cookie "username" với giá trị "JUNO_OKYO", hết hạn sau 7 ngày
setCookie('username', 'JUNO_OKYO', 7);

let username = getCookie('username');
console.log(username);

// ========================================================
// Demo sử dụng cookieStore API mới
// https://developer.mozilla.org/en-US/docs/Web/API/CookieStore
// ========================================================

// Cách mới: cookieStore API (đơn giản, dễ đọc)
async function demoSimpleCookieStore() {
    // 1. Đặt cookie - đơn giản chỉ với tên và giá trị
    await cookieStore.set('user', 'JUNO_OKYO');

    // 2. Đặt cookie với các tùy chọn
    const oneDay = 24 * 60 * 60 * 1000;
    await cookieStore.set({
        name: 'preferences',
        value: 'dark-mode',
        expires: Date.now() + oneDay,
        path: '/'
    });

    // 3. Lấy một cookie cụ thể
    const userCookie = await cookieStore.get('user');
    console.log('User cookie:', userCookie);

    // 4. Lấy tất cả cookie
    const allCookies = await cookieStore.getAll();
    console.log('Tất cả cookie:', allCookies);

    // 5. Xóa cookie
    await cookieStore.delete('user');

    // 6. Lắng nghe sự kiện thay đổi cookie
    cookieStore.addEventListener('change', event => {
        console.log('Cookie đã thay đổi:', event);
    });
}

demoSimpleCookieStore();
