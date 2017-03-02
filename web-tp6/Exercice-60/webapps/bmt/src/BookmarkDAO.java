import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BookmarkDAO {

	/**
	 * SQL query for user login
	 */
	private static final String SQL_READ_BOOKMARKS = "select id,description,link,title from Bookmark where user_id=?";
	//private static final String SQL_READ_BOOKMARK = "select id,description,link,title from Bookmark where user_id=? and link=?";
	private static final String SQL_READ_BOOKMARK_TAG = "select tags_id from bookmark_tag where bookmarks_id=?";
	
	public static List<Bookmark> getBookmarks(User user) throws SQLException {
		List<Bookmark> list = new ArrayList<>();
		Connection conn = DBConnection.getConnection();
		try{
			PreparedStatement stmt = conn.prepareStatement(SQL_READ_BOOKMARKS);
			stmt.setLong(1, user.getId());
			ResultSet result = stmt.executeQuery();
			while (result.next()) {
				long id = result.getLong(1);
				String description = result.getString(2);
				String link = result.getString(3);
				String title = result.getString(4);
				Bookmark bookmark = new Bookmark(id, description, link, title);
				
				bookmark.setTags(getBookmarkTags(user, id));
				
				list.add(bookmark);
			}			
			return list;
		} finally{conn.close();}
	}
	
	public static List<Tag> getBookmarkTags(User user, long idBookmark) throws SQLException {
		List<Tag> list = new ArrayList<Tag>();
		Connection conn = DBConnection.getConnection();
		try{
			
			PreparedStatement stmt = conn.prepareStatement(SQL_READ_BOOKMARK_TAG);
			stmt.setLong(1, idBookmark);
			ResultSet result = stmt.executeQuery();
			while (result.next()) {
				long idTag = result.getLong(1);
				Tag tag = TagDAO.getTagById(idTag, user);
				list.add(tag);
			}
			
			return list;
		} finally{conn.close();}
	}
}
