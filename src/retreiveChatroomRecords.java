import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "retreiveChatroomRecords", urlPatterns = { "/retreiveChatroomRecords" })
public class retreiveChatroomRecords extends HttpServlet {
	private static final long serialVersionUID = 102831973239L;
	
	public retreiveChatroomRecords() {
		super();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request,response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Connection conn = null;
		PrintWriter out = response.getWriter();
		
		response.setContentType("text/html");
		out.print("<h1 align='center'>End point retreiveChatroomRecords responding  </h1>");
		
		conn = connection.getRemoteConnection();
		try { 

			//https://alvinalexander.com/java/java-mysql-insert-example-preparedstatement			  
			String sqlTest = "SELECT * FROM chatroom_db.chatroom;";
			PreparedStatement preparedStmt = conn.prepareStatement(sqlTest);
		    
		    // execute the preparedstatement
			ResultSet rs = preparedStmt.executeQuery();
			while(rs.next()) {
				out.print("tables: Text:" + rs.getString("Text") + ", User: " + rs.getString("User") + ", Date: "+rs.getString("Date"));
			}
		    conn.close();
		  } 
		catch (SQLException e) { // TODO Auto-generated catch block
			e.printStackTrace(); 
		}	
	}
}

