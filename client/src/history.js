import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export const listen = callback => {
    return history.listen((location, action) => {
        callback(location.pathname.substr(1));
    });
}

export const getPath = () => {
    return history.location.pathname.substr(1);
}

export const push = path => {
    history.push("/" + path);
}
