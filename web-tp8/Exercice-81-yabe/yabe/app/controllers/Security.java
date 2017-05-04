package controllers;

import models.*;

public class Security extends Secure.Security {

    static boolean authentify(String username, String password) {
       return User.checkCredentials(username, password);
    }
    
    static boolean check(String profile) {
        if("admin".equals(profile)) {
            return User.find("byEmail", connected()).<User>first().isAdmin;
        }
        return false;
    }
    
    static void onDisconnected() {
        Application.index();
    }
    
    static void onAuthenticated() {
        Admin.index();
    }
    
}

