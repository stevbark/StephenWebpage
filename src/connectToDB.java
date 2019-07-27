
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

@WebServlet(name = "connectToDB", urlPatterns = { "/connectToDB" })
public class connectToDB extends HttpServlet {
	private static final long serialVersionUID = 102831973239L;
	
	public connectToDB() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request,response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		System.out.println("Start");
		
		Connection conn = null;
		PrintWriter out = response.getWriter();

		
		HashMap<String,Object> result = null;
		//https://stackoverflow.com/questions/1548782/retrieving-json-object-literal-from-httpservletrequest
		String line = null;
		try {
			BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null) {
		    	 result =	 new ObjectMapper().readValue(line, HashMap.class);
		    }
		} catch (Exception e) { e.printStackTrace();}
		
		
		response.setContentType("text/html");
		out.print("<h1 align='center'>End point responding  </h1>");
		System.out.println("RDS_HOSTNAME = " + System.getProperty("RDS_HOSTNAME"));
		conn = connection.getRemoteConnection();
		
		out.print("<h1 align='center'>More code </h1>");
		  try { 

			  //https://alvinalexander.com/java/java-mysql-insert-example-preparedstatement			  
			  String sqlTest = "Insert into chatroom_db.chatroom (Text,User,Date) Values ( ?, ?, ?);";
			  PreparedStatement preparedStmt = conn.prepareStatement(sqlTest);
		      preparedStmt.setString (1, (String) result.get("Text"));
		      preparedStmt.setString (2, (String) result.get("User"));
		      preparedStmt.setString (3, (String) result.get("Date"));

		      // execute the preparedstatement
		      preparedStmt.execute();

		      conn.close();

		  } catch (SQLException e) { // TODO Auto-generated catch block
		  e.printStackTrace(); }	}
	
	
}
