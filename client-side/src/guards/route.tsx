import { Navigate } from 'react-router-dom'


const localStorageCheck = (prop: string, value: string) => {
    return localStorage.getItem(prop) === value ? true : false;
}



export const ProtectProgress = ({ children }: { children: JSX.Element }) => {
    const finish = localStorageCheck("statusProgress", "finish");
    return finish  ? <Navigate to='/' /> : children;
}

export const ProtectResult = ({ children }: { children: JSX.Element }) => {
    const progress = localStorageCheck("statusProgress", "Progress");
    return  progress ? <Navigate to='/' /> : children;
}