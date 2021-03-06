import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;


/**
 * Provides handling of tag-related requests.
 *
 * @author Jan Mikac
 */
public class Tags {
	/**
	 * Handles the request for the tag list.
	 *
	 * @param req
	 *           the request
	 * @param resp
	 *           the response
	 * @param method
	 *           request method to appply
	 * @param requestPath
	 *           request path
	 * @param queryParams
	 *           query parameters
	 * @param user
	 *           the user
	 * @throws IOException
	 *            if the response cannot be written
	 */
	public static void handleTagList(HttpServletRequest req, HttpServletResponse resp,
			Dispatcher.RequestMethod method, String[] requestPath,
			Map<String, List<String>> queryParams, User user) throws IOException {
		// Rule-out PUT and DELETE requests
		System.out.println("Action: handleTagList - " + method + "-" + queryParams);
		if (method == Dispatcher.RequestMethod.PUT || method == Dispatcher.RequestMethod.DELETE) {
			resp.setStatus(405);
			return;
		}

		// Handle GET
		if (method == Dispatcher.RequestMethod.GET) {
			// Get the tag list
			List<Tag> tags = null;
			try {
				tags = TagDAO.getTags(user);
			} catch (SQLException ex) {
				resp.setStatus(500);
				return;
			}

			// Encode the tag list to JSON
			String json = "[";
			for (int i = 0, n = tags.size(); i < n; i++) {
				Tag tag = tags.get(i);
				json += tag.toJson();
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
		if (method == Dispatcher.RequestMethod.POST) {
			// TODO 1

			String name = new JSONObject(queryParams.get("json").get(0)).getString("name");

			try {
				if(TagDAO.getTagByName(name, user) == null){
					TagDAO.saveTag(new Tag(name), user);

					resp.setStatus(201);
					return;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

			resp.setStatus(304);
			return;
		}

		// Other
		resp.setStatus(405);
	}

	/**
	 * TODO comment
	 *
	 * @param req
	 * @param resp
	 * @param method
	 * @param requestPath
	 * @param queryParams
	 * @param user
	 */
	public static void handleTag(HttpServletRequest req, HttpServletResponse resp,
			Dispatcher.RequestMethod method, String[] requestPath,
			Map<String, List<String>> queryParams, User user) throws IOException{

		System.out.println("Action: handleTag - " + method + "-" + queryParams);

		
		if (method == Dispatcher.RequestMethod.PUT ) {

			String name = new JSONObject(queryParams.get("json").get(0)).getString("name");
			String id   = new JSONObject(queryParams.get("json").get(0)).getString("id");

			try {
				if(TagDAO.getTagByName(name, user) == null){
					TagDAO.modifyTag(new Tag(new Long(id), name), user);

					resp.setStatus(204);
					return;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

			
			resp.setStatus(405);
			return;
		}

		
		if (method == Dispatcher.RequestMethod.DELETE) {
			
			String tagId = requestPath[requestPath.length-1];
			try {
				Tag tag = TagDAO.getTagById(new Long(tagId), user) ;
				if(tag != null){
					TagDAO.removeTag(new Tag(new Long(tagId), tag.getName()), user);
					resp.setStatus(204);
					return;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			resp.setStatus(405);
			return;
		}

		// Handle GET
		if (method == Dispatcher.RequestMethod.GET) {

			// Get the tag 
			Tag tag = null;
			String tagName = requestPath[requestPath.length-1];
			try {
				tag = TagDAO.getTagById(Long.parseLong(tagName, 10), user);
			} catch (SQLException ex) {
				System.out.println("ERREUR : handleTag" );
				resp.setStatus(500);
				return;
			}
			System.out.println("Resultat : Tag trouv� - " + tag );

			// Encode the tag list to JSON
			String json = tag.toJson();

			// Send the response
			resp.setStatus(200);
			resp.setContentType("application/json");
			resp.getWriter().print(json);
			return;
		}

		// Other
		resp.setStatus(405);

	}

	/**
	 * TODO comment
	 *
	 * @param req
	 * @param resp
	 * @param method
	 * @param requestPath
	 * @param queryParams
	 * @param user
	 */
	public static void handleTagBookmarks(HttpServletRequest req, HttpServletResponse resp,
			Dispatcher.RequestMethod method, String[] requestPath,
			Map<String, List<String>> queryParams, User user) throws IOException {

		System.out.println("Action: handleTagBookmarks - " + method + "-" + queryParams);


		// Handle GET
		if (method == Dispatcher.RequestMethod.GET) {

			String tagId = requestPath[requestPath.length-1];
			List<Bookmark> bookmarks = null;
			try{
				bookmarks = BookmarkDAO.getBookmarksFromTag(user, TagDAO.getTagById(new Long(tagId), user));
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
			System.out.println(json);
			// Send the response
			resp.setStatus(200);
			resp.setContentType("application/json");
			resp.getWriter().print(json);
			return;
		}
	
	
	}

	/**
	 * TODO comment
	 *
	 * @param req
	 * @param resp
	 * @param method
	 * @param requestPath
	 * @param queryParams
	 * @param user
	 */
	public static void handleTagBookmark(HttpServletRequest req, HttpServletResponse resp,
			Dispatcher.RequestMethod method, String[] requestPath,
			Map<String, List<String>> queryParams, User user) throws IOException {
		System.out.println("Action: handleTagBookmark - " + method + "-" + queryParams);
		// TODO 2
	}
}
