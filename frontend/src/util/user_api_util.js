export const requestUser = () => {
    return fetch('/api/users');
};

export const postUser = user => {
    return fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}