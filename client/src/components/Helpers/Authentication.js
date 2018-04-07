import jwtDecode from 'jwt-decode';

const Auth = {
  isAuthenticated() {
    
    try{
      const user = jwtDecode(localStorage.getItem('token'));

      // Check expiration date of jwt token
      var current_time = new Date().getTime() / 1000;
      if (current_time > user.exp) {
        return false  
      }

      return true;
    }catch(e){
      return false;
    }

  }
};

export default Auth;