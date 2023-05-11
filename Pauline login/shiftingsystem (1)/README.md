# Requirements

- XAMPP, Start Apache and MySQL.
- Create a database in localhost/phpmyadmin named **backend** and import the **backend.sql** from the db folder.
- Node.js, Maven, and Java (JDK20).
- Set the JAVA_HOME in Environment Variables.
- Set the MAVEN_HOME in Environment Variables.

## Setting the MAVEN_HOME

Download the Binary zip archive here: https://maven.apache.org/download.cgi. Extract the archive contents and move it to a folder named `apache-maven` in your `Program Files`. Set the MAVEN_HOME Environment Variable to the folder where you extracted the Maven Binary Archive. For example, if you extracted the contents of the archive to "C:\Program Files\apache-maven", then the value of the MAVEN_HOME environment variable should be "C:\Program Files\apache-maven". 

Add the bin directory of the Maven installation to your PATH environment variable, it is found under System Variables and click Edit. Click New to add the %MAVEN_HOME%\bin. Type in terminal `mvn --version` to verify that Maven is successfully installed.

## Setting the JAVA_HOME

After installing Java (JDK 20), locate the installation directory and copy it. For example, C:\Program Files\Java\jdk-20. Search in start window, environment variables and click that.

Under the System Variables, click `New`. In the `New System Variable` dialog box, enter "JAVA_HOME" as the variable name and the installation directory of your JDK as the variable value. Then click ok.

## Running the App (Running Spring Boot & React App)

Go to the backend folder, and type `mvn spring-boot:run`. Make sure that MySQL is running in XAMPP.

Go to the frontend folder, and type `npm start`. 

## Running the App using concurrently

Go to the frontend directory and run `npm i` if you still don't have `node_modules` folder otherwise skip it. After that, `npm run dev` to start the application.
