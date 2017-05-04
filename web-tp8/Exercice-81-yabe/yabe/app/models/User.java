package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
import play.data.validation.*;
 
@Entity
public class User extends Model {
 
    @Email
    @Required
    public String email;
    
    @Required
    public String password;
    
    public String fullname;
    
    public boolean isAdmin;
    
    public User(String email, String password, String fullname) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
    }
    
    public static User connect(String email, String password) {
        return find("byEmailAndPassword", email, password).first();
    }
    
	public static boolean checkCredentials(String email, String password) {
		Object o = User
				.em()
				.createNativeQuery(
						"select count(*) from User where password='" + password + "' and email='" + email
								+ "'").getSingleResult();
		return !"0".equals(o.toString());
	}
    
    public String toString() {
        return email;
    }
 
}