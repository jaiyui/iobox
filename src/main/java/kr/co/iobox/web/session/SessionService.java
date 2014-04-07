package kr.co.iobox.web.session;

import java.util.List;

public interface SessionService {

	void create(Session fellows);
	
	void update(Session fellows);
	
	Session read(String id);

	void active(String id);

	void inactive(String id);

	List<Session> list(String target, String keyword, int page, int perPage);

	int getListCount(String target, String keyword);
	
	Boolean verify(String id, String password);
}
