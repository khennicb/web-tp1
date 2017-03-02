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
	private static final String SQL_READ_TAG = "select id,name from Tag where user_id=? and name=?";
	private static final String SQL_READ_TAG_BY_ID = "select id,name from Tag where user_id=? and id=?";
	private static final String SQL_INSERT_TAG = "insert into tag (name, user_id) values (?,?)";
	private static final String SQL_UPDATE_TAG = "update tag set name=? where id=? and user_id=?";
	private static final String SQL_DELETE_TAG = "delete from tag where id=? and user_id=?";
	
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
	public static Tag getTagById(long id, User user) throws SQLException{
		Tag myTag = null;
		Connection conn = DBConnection.getConnection();
		
		try{
			PreparedStatement stmt = conn.prepareStatement(SQL_READ_TAG_BY_ID);
			stmt.setLong(1, user.getId());
			stmt.setLong(2, id);
			
			ResultSet result = stmt.executeQuery();
			
			if(result.next()){
				String name = result.getString(2);
				System.out.println(name);
				myTag = new Tag(id, name);
			}
			
			return myTag;
		} finally{conn.close();}
	}

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
	
	public static void saveTag(Tag tag, User user) throws SQLException{
		Connection conn = DBConnection.getConnection();
		
		try {
			PreparedStatement stmt = conn.prepareStatement(SQL_INSERT_TAG);
			stmt.setString(1, tag.getName());
			stmt.setLong(2, user.getId());
			
			boolean result = stmt.execute();
			
			// TODO : renvoyer une erreur si l'insertion s'est mal passe ?
			
		} finally {conn.close();}
	}

	public static void modifyTag(Tag tag, User user) throws SQLException{
		Connection conn = DBConnection.getConnection();
		
		try {
			PreparedStatement stmt = conn.prepareStatement(SQL_UPDATE_TAG);
			stmt.setString(1, tag.getName());
			stmt.setLong(2, tag.getId());
			stmt.setLong(3, user.getId());
			
			int result = stmt.executeUpdate();

			// TODO : renvoyer une erreur si l'insertion s'est mal passee ?
			//System.out.println("Update result : " + result);
			
		} finally {conn.close();}
	}
	
	public static void removeTag(Tag tag, User user) throws SQLException{
		Connection conn = DBConnection.getConnection();
		
		try {
			PreparedStatement stmt = conn.prepareStatement(SQL_DELETE_TAG);
			stmt.setLong(1, tag.getId());
			stmt.setLong(2, user.getId());
			
			boolean result = stmt.execute();
			
			// TODO : renvoyer une erreur si l'insertion s'est mal passe ?
			
		} finally {conn.close();}
	}
}
