import jwtDecode from 'jwt-decode';

const Auth = {
  isAuthenticated() {
    
    try{
      jwtDecode(localStorage.getItem('token'));
      return true;
    }catch(e){
      return false;
    }

  }
};

export default Auth;