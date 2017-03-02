
public class Bookmark {
	
	private Long id = null;
	private String description;
	private String link = null;
	private String title = null;
	
	
	public Bookmark(Long id, String description, String link, String title) {
		super();
		this.id = id;
		this.description = description;
		this.link = link;
		this.title = title;
	}
	
	public Bookmark(String description, String link, String title) {
		super();
		this.description = description;
		this.link = link;
		this.title = title;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	
	/**
	 * Encodes the tag in JSON.
	 * 
	 * @return JSON representation of the tag
	 */
	public String toJson() {
		String json = "{";
		if (id != null)
			json += "\"id\":" + id;
		if (description != null) {
			if (json.length() > 1)
				json += ", ";
			json += "\"description\":\"" + description + "\"";
		}
		if (link != null) {
			if (json.length() > 1)
				json += ", ";
			json += "\"link\":\"" + link + "\"";
		}
		if (title != null) {
			if (json.length() > 1)
				json += ", ";
			json += "\"title\":\"" + title + "\"";
		}
		json += "}";
		return json;
	}
	@Override
	public boolean equals(Object obj) {
		if (!(obj instanceof Bookmark)) return false;
		Bookmark b=(Bookmark)obj;
		if (id==null) 
			if (link!=null) return id==b.id && link.equals(b.link);
			else return id==b.id && link==b.link;
		if (link!=null) return link.equals(b.link) && id.equals(b.id);
		return id.equals(b.id) && b.link==link; 
		
	}
	/*@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		if (id==null) return super.hashCode();
		if (link==null) return id.hashCode();
		return id.hashCode()+link.hashCode();
	}*/
}
