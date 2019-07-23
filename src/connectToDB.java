
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.DriverManager;
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
		Statement stmt = null;
		
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
		
			conn = getRemoteConnection();
		
		
		  try { 
			  conn.beginRequest();
			  stmt = conn.createStatement();
			  String sqlTest = "Insert into chatroom_db.chatroom (Text,User,Date) Values ( \""+result.get("Text")+"\", \""+result.get("User")+"\","+result.get("Date")+");";
			  System.out.println(sqlTest);
			  stmt.executeUpdate(sqlTest);
			  
			  conn.endRequest(); 
			  conn.close();
		  
		  } catch (SQLException e) { // TODO Auto-generated catch block
		  e.printStackTrace(); }	}
	
	// Adding from
	// https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-rds.html
	private static Connection getRemoteConnection()  {

		if (System.getenv("RDS_HOSTNAME") != null) {
			try {
				Class.forName("com.mysql.jdbc.Driver");
				String dbName = System.getenv("RDS_DB_NAME");
				String userName = System.getenv("RDS_USERNAME");
				String password = System.getenv("RDS_PASSWORD");
				String hostname = System.getenv("RDS_HOSTNAME");
				String port = System.getenv("RDS_PORT");
				String jdbcUrl = "jdbc:mysql://" + hostname + ":" + port + "/" + dbName + "?user=" + userName
						+ "&password=" + password;
				
				System.out.println("Connection url = " + jdbcUrl );
				System.out.println("Getting remote connection with connection string from environment variables.");
				Connection con = DriverManager.getConnection(jdbcUrl);
				System.out.println("Remote connection successful.");
				return con;
			} catch (ClassNotFoundException e) {
				System.out.println("ERROR: " + e.toString());
			} catch (SQLException e) {
				System.out.println("ERROR: " +e.toString());
			}
		}
		return null;
	}
}
