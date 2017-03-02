import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

public class Bookmarks {
	
	public static void handleBookmarksList(HttpServletRequest req, HttpServletResponse resp,
			Dispatcher.RequestMethod method, String[] requestPath,
			Map<String, List<String>> queryParams, User user) throws IOException {

		// Rule-out PUT and DELETE requests
		System.out.println("Action: handleBookmarksList - " + method + "-" + queryParams);
		if (method == Dispatcher.RequestMethod.PUT || method == Dispatcher.RequestMethod.DELETE) {
			resp.setStatus(405);
			return;
		}
		
		// Handle GET
		if (method == Dispatcher.RequestMethod.GET){
			List<Bookmark> bookmarks = null;
			try{
				bookmarks = BookmarkDAO.getBookmarks(user);
			} catch (SQLException ex) {
				resp.setStatus(500);
				return;
			}
			
			// Encode the tag list to JSON
			String json = "[";
			for (int i = 0, n = bookmarks.size(); i < n; i++) {
				Bookmark book = bookmarks.get(i);
				json += book.toJson();
				if (i < n - 1)
					json += ", ";
			}
			json += "]";

			// Send the response
			resp.setStatus(200);
			resp.setContentType("application/json");
			resp.getWriter().print(json);
			return;
		}
		
		// Handle POST
		if (method == Dispatcher.RequestMethod.POST){
			String title = new JSONObject(queryParams.get("json").get(0)).getString("title");
			String description = new JSONObject(queryParams.get("json").get(0)).getString("description");
			String link = new JSONObject(queryParams.get("json").get(0)).getString("link");
			
			
			JSONArray tags= new JSONObject(queryParams.get("json").get(0)).getJSONArray("tags");
			
			System.out.println(title + " " + description + " " + link);
			System.out.println(tags.toString());
		}
	}

}
