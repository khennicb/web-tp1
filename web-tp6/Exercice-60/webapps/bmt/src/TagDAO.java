import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Provides the data-base access object for tags.
 * 
 * @author Jan Mikac, Sebastien Viardot
 */
public class TagDAO {
	/**
	 * SQL query for user login
	 */
	private static final String SQL_READ_TAGS = "select id,name from Tag where user_id=?";
	private static final String SQL_READ_TAG = "select id,name from Tag where user_id=? and user_name=?";

	/**
	 * Provides the tags of a user.
	 * 
	 * @param user
	 *           a user
	 * @return user tags
	 * @throws SQLException
	 *            if the DB connection fails
	 */
	public static List<Tag> getTags(User user) throws SQLException {
		List<Tag> list = new ArrayList<Tag>();
		Connection conn = DBConnection.getConnection();
		try{
			PreparedStatement stmt = conn.prepareStatement(SQL_READ_TAGS);
			stmt.setLong(1, user.getId());
			ResultSet result = stmt.executeQuery();
			while (result.next()) {
				long id = result.getLong(1);
				String name = result.getString(2);
				Tag tag = new Tag(id, name);
				list.add(tag);
			}
			return list;
		} finally{conn.close();}
	}
	
	//TODO
	public static Tag getTagByName(String name, User user) throws SQLException{
		Tag myTag = null;
		Connection conn = DBConnection.getConnection();
		
		try{
			PreparedStatement stmt = conn.prepareStatement(SQL_READ_TAG);
			stmt.setLong(1, user.getId());
			stmt.setString(2, name);
			ResultSet result = stmt.executeQuery();
			
			if(result.next()){
				myTag = new Tag(result.getString(2));
			}
			
			return myTag;
		} finally{conn.close();}
	}
	
}
