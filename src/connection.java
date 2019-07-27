import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class connection {
	
	// Adding from
	// https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-rds.html
	static Connection getRemoteConnection()  {

		
		if (System.getProperty("RDS_HOSTNAME") != null) {
			try {
				System.out.println("Started Connection");
				Class.forName("com.mysql.cj.jdbc.Driver");
				System.out.println("Loaded Driver");
				String dbName = System.getProperty("RDS_DB_NAME");
				String userName = System.getProperty("RDS_USERNAME");
				String password = System.getProperty("RDS_PASSWORD");
				String hostname = System.getProperty("RDS_HOSTNAME");
				String port = System.getProperty("RDS_PORT");
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
