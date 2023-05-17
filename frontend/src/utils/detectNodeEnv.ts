import process from 'process';

function isDevEnv():boolean {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev environment
        return true
    } else {
        // production environment
        return false
    }
}

export default isDevEnv;