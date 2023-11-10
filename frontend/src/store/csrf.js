export const restoreSession = async () => {
    // debugger;
    let res = await fetch('/api/session');
    let token = res.headers.get('X-CSRF-Token');
    sessionStorage.setItem('X-CSRF-Token', token);
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user))
}

export const csrfFetch = async (url, options = {}) => {
    options.method ||= 'GET';
    options.headers ||= {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
        options.headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, options);

    return res;
}