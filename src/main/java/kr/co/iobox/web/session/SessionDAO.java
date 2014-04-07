package kr.co.iobox.web.session;

import java.util.HashMap;
import java.util.List;

public interface SessionDAO {
	Boolean checkIdDuplicate(String id);

	Boolean checkNickNameDuplicate(String nickname);

	void create(Session user);
	
	void update(Session user);
	
	Session read(String id);

	void active(String id);

	void inactive(String id);
	
	List<Session> list(HashMap<String, String> param);
	
	int getListCount(HashMap<String, String> param);

	Boolean verify(String id, String password);
}
