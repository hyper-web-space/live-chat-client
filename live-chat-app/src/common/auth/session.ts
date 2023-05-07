const session = {

    setToken(tokenName:string,token:string){
        sessionStorage.setItem(tokenName, token);
    },

    getToken(tokenName:string){
        const token: string | null = sessionStorage.getItem(tokenName); 
        return token;
    },

    getRefesh(){
        /*
        access token 만료시 refresh
        */
    },

    checkToken(tokenName:string){
        if (sessionStorage.getItem(tokenName) === null) {
            return false;
        } else {
            return true;
        }
    }

}

export default session;