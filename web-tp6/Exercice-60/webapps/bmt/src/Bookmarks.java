import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Bookmarks {
	
	public static void handleBookmarksList(HttpServletRequest req, HttpServletResponse resp,
			Dispatcher.RequestMethod method, String[] requestPath,
			Map<String, List<String>> queryParams, User user) {

		// Rule-out PUT and DELETE requests
		System.out.println("Action: handleBookmarksList - " + method + "-" + queryParams);
		if (method == Dispatcher.RequestMethod.PUT || method == Dispatcher.RequestMethod.DELETE) {
			resp.setStatus(405);
			return;
		}
		
		// Handle GET
		if (method == Dispatcher.RequestMethod.GET){
			List<Bookmark> bookmarks = null;
		}
	}

}
